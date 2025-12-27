const { pool } = require("../db/db");

/**
 * CREATE EQUIPMENT
 */
exports.createEquipment = async (req, res) => {
    try {
        const {
            name,
            serialNumber,
            category,
            location,
            status,
            acquisitionDate,
            warrantyExpiry,
            manufacturer,
            model,
            description,
            specifications
        } = req.body;

        // Validation
        if (!name || !serialNumber) {
            return res.status(400).json({
                success: false,
                message: "Name and Serial Number are required"
            });
        }

        const [result] = await pool.query(
            `INSERT INTO equipment 
       (name, serial_number, category, location, status, acquisition_date, 
        warranty_expiry, manufacturer, model, description, specifications)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                name,
                serialNumber,
                category,
                location,
                status || 'Active',
                acquisitionDate,
                warrantyExpiry || null,
                manufacturer,
                model,
                description,
                specifications
            ]
        );

        res.status(201).json({
            success: true,
            message: "Equipment added successfully",
            equipmentId: result.insertId
        });
    } catch (err) {
        console.error('Create equipment error:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({
                success: false,
                message: "Serial number already exists"
            });
        }
        res.status(500).json({
            success: false,
            message: "Error creating equipment",
            error: err.message
        });
    }
};

/**
 * GET ALL EQUIPMENT
 */
exports.getAllEquipment = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM equipment ORDER BY created_at DESC");
        res.json({
            success: true,
            equipment: rows
        });
    } catch (err) {
        console.error('Get all equipment error:', err);
        res.status(500).json({
            success: false,
            message: "Error fetching equipment",
            error: err.message
        });
    }
};

/**
 * GET EQUIPMENT BY ID
 */
exports.getEquipmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query("SELECT * FROM equipment WHERE id = ?", [id]);

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Equipment not found"
            });
        }

        res.json({
            success: true,
            equipment: rows[0]
        });
    } catch (err) {
        console.error('Get equipment by id error:', err);
        res.status(500).json({
            success: false,
            message: "Error fetching equipment details",
            error: err.message
        });
    }
};
