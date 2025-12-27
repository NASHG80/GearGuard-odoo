-- Work Centers table schema for GearGuard
-- This table stores all work center/manufacturing unit information

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
