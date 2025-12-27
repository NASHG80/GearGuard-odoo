const { pool } = require("../db/db");


/**
 * GET ALL MAINTENANCE REQUESTS
 * Fetches all requests with user information
 */
exports.getAllRequests = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT 
        mr.*,
        u.name as employee_name,
        u.email as employee_email,
        u.role as employee_role
      FROM maintenance_requests mr
      LEFT JOIN users u ON mr.created_by = u.id
      ORDER BY mr.created_at DESC`
    );

    // Add company name to each request
    const requestsWithCompany = rows.map(request => ({
      ...request,
      company: 'GearGuard Industries'
    }));

    res.json({
      success: true,
      requests: requestsWithCompany
    });
  } catch (err) {
    console.error('Get requests error:', err);
    res.status(500).json({
      success: false,
      message: "Error fetching maintenance requests",
      error: err.message
    });
  }
};

/**
 * CREATE MAINTENANCE REQUEST
 * Stores all form data from CreateRequestPage
 */
exports.createRequest = async (req, res) => {
  try {
    const {
      subject,
      maintenanceFor,
      equipment,
      category,
      requestDate,
      maintenanceType,
      team,
      technician,
      scheduledDate,
      duration,
      priority,
      description,
      instructions,
      createdBy
    } = req.body;

    // Validation
    if (!subject || !requestDate || !createdBy) {
      return res.status(400).json({
        success: false,
        message: "Subject, request date, and user ID are required"
      });
    }

    // Insert into database
    const [result] = await pool.query(
      `INSERT INTO maintenance_requests
       (subject, maintenance_for, equipment, category, request_date, 
        maintenance_type, team, technician, scheduled_date, duration, 
        priority, description, instructions, created_by, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'NEW')`,
      [
        subject,
        maintenanceFor || 'equipment',
        equipment,
        category,
        requestDate,
        maintenanceType,
        team,
        technician,
        scheduledDate || null,
        duration,
        priority,
        description,
        instructions,
        createdBy
      ]
    );

    res.status(201).json({
      success: true,
      message: "Maintenance request created successfully",
      requestId: result.insertId
    });
  } catch (err) {
    console.error('Create request error:', err);
    res.status(500).json({
      success: false,
      message: "Error creating maintenance request",
      error: err.message
    });
  }
};

/**
 * STEP 3.3 — ASSIGN REQUEST (TEAM CHECK)
 */
exports.assignRequest = async (req, res) => {
  try {
    const { technician_id } = req.body;
    const { id } = req.params;

    const [[valid]] = await pool.query(
      `
      SELECT 1
      FROM team_members tm
      JOIN maintenance_requests mr
        ON tm.team_id = mr.maintenance_team_id
      WHERE tm.user_id = ? AND mr.id = ?
      `,
      [technician_id, id]
    );

    if (!valid) {
      return res.status(403).json({
        message: "Technician does not belong to this maintenance team"
      });
    }

    await pool.query(
      "UPDATE maintenance_requests SET assigned_to = ? WHERE id = ?",
      [technician_id, id]
    );

    res.json({ message: "Request assigned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * UPDATE REQUEST STATUS (Workflow enforcement)
 */
exports.updateStatus = async (req, res) => {
  try {
    const { status, duration_hours } = req.body;
    const { id } = req.params;

    const [[request]] = await pool.query(
      "SELECT status, equipment_id FROM maintenance_requests WHERE id = ?",
      [id]
    );

    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }

    const validFlow = {
      NEW: ["IN_PROGRESS"],
      IN_PROGRESS: ["REPAIRED", "SCRAP"]
    };

    if (!validFlow[request.status]?.includes(status)) {
      return res.status(400).json({ message: "Invalid status transition" });
    }

    await pool.query(
      `UPDATE maintenance_requests
       SET status = ?, duration_hours = ?
       WHERE id = ?`,
      [status, duration_hours, id]
    );

    if (status === "SCRAP") {
      await pool.query(
        "UPDATE equipment SET is_scrapped = true WHERE id = ?",
        [request.equipment_id]
      );
    }

    res.json({ message: "Status updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * SMART BUTTON — GET REQUESTS BY EQUIPMENT
 */
exports.getRequestsByEquipment = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM maintenance_requests WHERE equipment_id = ?",
      [id]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * CALENDAR VIEW — PREVENTIVE MAINTENANCE
 */
exports.getPreventiveCalendar = async (req, res) => {
  try {
    const { from, to } = req.query;

    const [rows] = await pool.query(
      `SELECT * FROM maintenance_requests
       WHERE type = 'PREVENTIVE'
       AND scheduled_date BETWEEN ? AND ?`,
      [from, to]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
