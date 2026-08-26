require('dotenv').config();
const app = require('./src/app');
const { sequelize } = require('./src/models');

const PORT = process.env.PORT || 5000;

const start = async () => {
	try {
		// Test DB connection
		await sequelize.authenticate();
		console.log('PostgreSQL connected via Sequelize');

		app.listen(PORT, () => {
			console.log(`Server running at http://localhost:${PORT}`);
		});
	} catch (err) {
		console.error('Failed to start server:', err.message);
		process.exit(1);
	}
};

start();