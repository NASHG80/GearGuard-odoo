const pool = require("../db/db");

/**
 * CREATE MAINTENANCE REQUEST
 * Auto-fills maintenance team from equipment
 */
exports.createRequest = async (req, res) => {
  try {
    const { subject, type, equipment_id, scheduled_date, created_by } = req.body;

    const [[equipment]] = await pool.query(
      "SELECT maintenance_team_id, is_scrapped FROM equipment WHERE id = ?",
      [equipment_id]
    );

    if (!equipment) {
      return res.status(404).json({ message: "Equipment not found" });
    }

    if (equipment.is_scrapped) {
      return res.status(400).json({ message: "Equipment is scrapped" });
    }

    const [result] = await pool.query(
      `INSERT INTO maintenance_requests
       (subject, type, equipment_id, maintenance_team_id, scheduled_date, status, created_by)
       VALUES (?, ?, ?, ?, ?, 'NEW', ?)`,
      [
        subject,
        type,
        equipment_id,
        equipment.maintenance_team_id,
        scheduled_date,
        created_by
      ]
    );

    res.status(201).json({
      message: "Request created",
      request_id: result.insertId
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
