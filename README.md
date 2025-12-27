# GearGuard - Equipment Maintenance Management System

GearGuard is a comprehensive maintenance management system designed to track equipment, manage maintenance requests, and streamline work center operations.

##  Features

- **Equipment Management**: Track and monitor all equipment/assets
- **Maintenance Requests**: Create, track, and manage maintenance workflows
- **Kanban Board**: Visual drag-and-drop interface for request status management
- **Work Centers**: Manage manufacturing units and work centers
- **Dashboard**: Real-time insights and analytics

##  Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher)
- **npm** (v8 or higher)
- **MySQL** (v8.0 or higher)
- **Git**


## Installation & Setup

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend/gearguard-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Create environment configuration**:
   
   Create a `.env` file in the `backend/gearguard-backend` directory:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=gearguard

   # Server Configuration
   PORT=5000

   # JWT Configuration (if using authentication)
   JWT_SECRET=your_secret_key_here
   ```

4. **Start the backend server**:
   
   Development mode (with auto-reload):
   ```bash
   npm run dev
   ```

   The backend server will start on `http://localhost:5000`

### Frontend Setup

1. **Navigate to client directory**:
   ```bash
   cd client
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

   The frontend will start on `http://localhost:5173` (Vite default)

##  MySQL Database Setup
<img width="1024" height="559" alt="image" src="https://github.com/user-attachments/assets/dc3a2c6e-0ea1-4fec-9059-27cd345ea1e5" />


### 1. Create the Database

Open MySQL command line or your preferred MySQL client and run:

```sql
CREATE DATABASE gearguard;
USE gearguard;
```

### 2. Create Required Tables

#### Users Table

```sql
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('Admin','Manager','Technician','Requester') DEFAULT 'Requester',
    avatar_url VARCHAR(255),
    team_id INT DEFAULT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL,
    INDEX idx_email (email),
    INDEX idx_role (role)
);
```

#### Teams Table

```sql
CREATE TABLE IF NOT EXISTS teams (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Equipment Table

```sql
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
```

#### Work Centers Table

```sql
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
```

#### Maintenance Requests Table

```sql
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
    INDEX idx_maintenance_type (maintenance_type)
);
```
#### Users Table

```sql
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(255) NOT NULL,
    maintenance_for ENUM('equipment', 'work_center') DEFAULT 'equipment',
    equipment VARCHAR(255),
    category ENUM('Mechanical', 'Electrical', 'Hydraulic', 'Pneumatic') DEFAULT 'Mechanical',
    request_date DATE NOT NULL,
    scheduled_date DATE,
    maintenance_type ENUM('corrective', 'preventive') DEFAULT 'corrective',
    priority ENUM('low', 'medium', 'high') DEFAULT 'low',
    team VARCHAR(255),
    technician VARCHAR(255),
    duration VARCHAR(10) DEFAULT '00:00',
    description TEXT,
    instructions TEXT,
    created_by INT NOT NULL,
    status ENUM('NEW', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED') DEFAULT 'NEW',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_created_by (created_by),
    INDEX idx_status (status),
    INDEX idx_priority (priority),
    INDEX idx_request_date (request_date)
);
```


## 📝 API Endpoints

### Equipment
- `GET /api/equipment` - Get all equipment
- `POST /api/equipment` - Create new equipment
- `GET /api/equipment/:id` - Get equipment by ID
- `PUT /api/equipment/:id` - Update equipment
- `DELETE /api/equipment/:id` - Delete equipment

### Maintenance Requests
- `GET /api/requests` - Get all requests
- `POST /api/requests` - Create new request
- `GET /api/requests/:id` - Get request by ID
- `PUT /api/requests/:id` - Update request

### Work Centers
- `GET /api/workcenters` - Get all work centers
- `POST /api/workcenters` - Create new work center
- `GET /api/workcenters/:id` - Get work center by ID
- `PUT /api/workcenters/:id` - Update work center
- `DELETE /api/workcenters/:id` - Delete work center
