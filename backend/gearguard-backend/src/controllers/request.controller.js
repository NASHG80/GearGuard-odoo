const { pool } = require("../db/db");

/* ---------------- GET ALL REQUESTS ---------------- */
exports.getAllRequests = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        mr.*,
        u.name AS employee_name
      FROM maintenance_requests mr
      LEFT JOIN users u ON mr.created_by = u.id
      ORDER BY mr.created_at DESC
    `);

    res.json({
      success: true,
      requests: rows.map(r => ({
        ...r,
        company: "GearGuard Industries"
      }))
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ---------------- GET REQUEST BY ID ---------------- */
exports.getRequestById = async (req, res) => {
  try {
    const [[row]] = await pool.query(
      "SELECT * FROM maintenance_requests WHERE id = ?",
      [req.params.id]
    );

    if (!row) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    res.json({ success: true, request: row });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ---------------- CREATE REQUEST ---------------- */
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

    const [result] = await pool.query(
      `
      INSERT INTO maintenance_requests
      (subject, maintenance_for, equipment, category, request_date,
       maintenance_type, team, technician, scheduled_date, duration,
       priority, description, instructions, created_by, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'NEW')
      `,
      [
        subject,
        maintenanceFor,
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

    res.status(201).json({ success: true, requestId: result.insertId });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ---------------- UPDATE REQUEST (EDIT PAGE) ---------------- */
exports.updateRequest = async (req, res) => {
  try {
    const {
      subject,
      priority,
      status,
      technician,
      team,
      description,
      instructions,
      scheduled_date
    } = req.body;

    await pool.query(
      `
      UPDATE maintenance_requests SET
        subject = ?,
        priority = ?,
        status = ?,
        technician = ?,
        team = ?,
        description = ?,
        instructions = ?,
        scheduled_date = ?
      WHERE id = ?
      `,
      [
        subject,
        priority,
        status,
        technician,
        team,
        description,
        instructions,
        scheduled_date || null,
        req.params.id
      ]
    );

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

/* ---------------- ✅ KANBAN STATUS UPDATE ---------------- */
exports.updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ["NEW", "IN_PROGRESS", "COMPLETED", "CANCELLED"];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const [result] = await pool.query(
      "UPDATE maintenance_requests SET status = ? WHERE id = ?",
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Request not found" });
    }

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
