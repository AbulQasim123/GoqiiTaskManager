'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.removeColumn('audit_logs', 'old_values');
		await queryInterface.removeColumn('audit_logs', 'new_values');
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.addColumn('audit_logs', 'old_values', {
			type: Sequelize.JSONB,
			allowNull: true,
		});

		await queryInterface.addColumn('audit_logs', 'new_values', {
			type: Sequelize.JSONB,
			allowNull: true,
		});
	},
};
