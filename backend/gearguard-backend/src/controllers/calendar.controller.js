const pool = require("../db/db");

/**
 * MONTH VIEW
 * Uses request_date
 * Returns: { "YYYY-MM-DD": [{ id, priority }] }
 */
const getCalendarData = async (req, res) => {
  try {
    const { year, month } = req.query;
    const monthStr = String(month).padStart(2, "0");
    const likePattern = `${year}-${monthStr}-%`;

    const [rows] = await pool.query(
      `
      SELECT id, request_date, priority
      FROM maintenance_requests
      WHERE request_date LIKE ?
      `,
      [likePattern]
    );

    const result = {};

   rows.forEach(row => {
  const dateKey = row.request_date.toLocaleDateString('en-CA');
  if (!result[dateKey]) result[dateKey] = [];
  result[dateKey].push({
    id: row.id,
    priority: row.priority
  });
});


    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/**
 * DAY VIEW
 * Uses request_date
 * duration = time
 */
const getTasksForDay = async (req, res) => {
  try {
    const { date } = req.query;

    const [rows] = await pool.query(
      `
      SELECT
        id,
        subject,
        duration,
        technician,
        equipment,
        priority,
        status
      FROM maintenance_requests
      WHERE request_date = ?
      `,
      [date]
    );

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getCalendarData,
  getTasksForDay
};
