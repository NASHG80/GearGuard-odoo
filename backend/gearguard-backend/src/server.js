require('dotenv').config();
const app = require('./app');
const { testConnection } = require('./db/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    // Test database connection before starting server
    const dbConnected = await testConnection();

    if (!dbConnected) {
        console.error('Failed to connect to database. Please check your configuration.');
        process.exit(1);
    }

    // Start the server
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    });
};

startServer();
