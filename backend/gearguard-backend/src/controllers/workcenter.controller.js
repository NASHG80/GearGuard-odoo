const { pool } = require("../db/db");

/**
 * CREATE WORK CENTER
 */
exports.createWorkCenter = async (req, res) => {
    try {
        const {
            name,
            code,
            tag,
            status,
            costPerHour,
            capacity,
            efficiencyTarget,
            location,
            description,
            notes
        } = req.body;

        // Validation
        if (!name || !code) {
            return res.status(400).json({
                success: false,
                message: "Name and Code are required"
            });
        }

        const [result] = await pool.query(
            `INSERT INTO work_centers 
       (name, code, tag, status, cost_per_hour, capacity, efficiency_target, location, description, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                name,
                code,
                tag,
                status || 'Active',
                costPerHour,
                capacity,
                efficiencyTarget,
                location,
                description,
                notes
            ]
        );

        res.status(201).json({
            success: true,
            message: "Work Center created successfully",
            workCenterId: result.insertId
        });
    } catch (err) {
        console.error('Create work center error:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                success: false,
                message: "Work center code already exists"
            });
        }
        res.status(500).json({
            success: false,
            message: "Error creating work center",
            error: err.message
        });
    }
};

/**
 * GET ALL WORK CENTERS
 */
exports.getAllWorkCenters = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM work_centers ORDER BY created_at DESC");
        res.json({
            success: true,
            workCenters: rows
        });
    } catch (err) {
        console.error('Get all work centers error:', err);
        res.status(500).json({
            success: false,
            message: "Error fetching work centers",
            error: err.message
        });
    }
};

/**
 * GET WORK CENTER BY ID
 */
exports.getWorkCenterById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM work_centers WHERE id = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Work Center not found"
            });
        }

        res.json({
            success: true,
            workCenter: rows[0]
        });
    } catch (err) {
        console.error('Get work center by id error:', err);
        res.status(500).json({
            success: false,
            message: "Error fetching work center details",
            error: err.message
        });
    }
};
