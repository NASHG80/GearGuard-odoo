-- Equipment table schema for GearGuard
-- This table stores all equipment/asset information

CREATE TABLE IF NOT EXISTS equipment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    serial_number VARCHAR(100) NOT NULL UNIQUE,
    category VARCHAR(50),
    location VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Active',
    acquisition_date DATE,
    warranty_expiry DATE,
    manufacturer VARCHAR(255),
    model VARCHAR(255),
    description TEXT,
    specifications TEXT,
    trust_score INT DEFAULT 100,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_serial_number (serial_number),
    INDEX idx_status (status),
    INDEX idx_category (category)
);
