const { pool } = require('./db/db');
const fs = require('fs');
const path = require('path');

async function setupEquipmentTable() {
    try {
        console.log('🔧 Setting up equipment table...');

        const sqlPath = path.join(__dirname, 'db', 'equipment_schema.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        await pool.query(sql);

        console.log('✅ Equipment table created successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error setting up equipment table:', error.message);
        process.exit(1);
    }
}

setupEquipmentTable();
