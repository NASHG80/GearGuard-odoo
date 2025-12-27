const { pool } = require('./db/db');
const fs = require('fs');
const path = require('path');

async function setupWorkCenterTable() {
    try {
        console.log('🔧 Setting up work_centers table...');

        const sqlPath = path.join(__dirname, 'db', 'workcenter_schema.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        await pool.query(sql);

        console.log('✅ Work Centers table created successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error setting up work_centers table:', error.message);
        process.exit(1);
    }
}

setupWorkCenterTable();
