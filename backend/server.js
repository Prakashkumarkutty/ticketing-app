require('dotenv').config({ quiet: true });
const sequelize = require('./src/config/database');
const app = require('./app');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully');

        await sequelize.sync({ force: false });
        console.log('Database synced');

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Unable to start server:', error);
    }
};

startServer();
