const { pool } = require("../db/db");


exports.getTeams = async (req, res) => {
  try {
    const [teams] = await pool.query(
      "SELECT id, name FROM maintenance_teams"
    );
    res.json(teams);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
