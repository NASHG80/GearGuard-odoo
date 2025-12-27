-- GearGuard Database Setup Script
-- Run this script to create all necessary tables for the GearGuard application
-- Execute: mysql -u your_username -p gearguard < setup_database.sql

-- Equipment table schema
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

-- Work Centers table schema
CREATE TABLE IF NOT EXISTS work_centers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(50) NOT NULL UNIQUE,
    tag VARCHAR(50),
    status VARCHAR(50) DEFAULT 'Active',
    cost_per_hour DECIMAL(10, 2),
    capacity DECIMAL(10, 2),
    efficiency_target DECIMAL(5, 2),
    location VARCHAR(255),
    description TEXT,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_code (code),
    INDEX idx_tag (tag),
    INDEX idx_status (status)
);

-- Maintenance Requests table schema
CREATE TABLE IF NOT EXISTS maintenance_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    maintenance_for VARCHAR(50) DEFAULT 'equipment',
    equipment VARCHAR(255),
    category VARCHAR(100),
    request_date DATE,
    maintenance_type VARCHAR(50),
    team VARCHAR(100),
    technician VARCHAR(100),
    scheduled_date DATE,
    duration INT,
    priority VARCHAR(20) DEFAULT 'Medium',
    description TEXT,
    instructions TEXT,
    status VARCHAR(50) DEFAULT 'NEW',
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_maintenance_type (maintenance_type),
    INDEX idx_created_by (created_by)
);

-- Users table schema (for authentication and user management)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    department VARCHAR(100),
    phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_role (role)
);

-- Display success message
SELECT 'Database tables created successfully!' AS Status;

-- Show all tables
SHOW TABLES;
