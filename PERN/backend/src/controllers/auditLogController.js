const { AuditLog, User } = require('../models');
const { Op } = require('sequelize');
const { paginated } = require('../utils/responseHelper');
const asyncHandler = require('../utils/asyncHandler');

const index = asyncHandler(async (req, res) => {
	const page = parseInt(req.query.page, 10) || 1;
	const perPage = parseInt(req.query.per_page, 10) || 15;

	const where = {};
	if (req.query.action) where.action = req.query.action;
	if (req.query.search) where.description = { [Op.iLike]: `%${req.query.search}%` };
	if (req.query.from_date || req.query.to_date) {
		where.created_at = {};
		if (req.query.from_date) where.created_at[Op.gte] = req.query.from_date;
		if (req.query.to_date) where.created_at[Op.lte] = req.query.to_date;
	}

	const { count, rows } = await AuditLog.findAndCountAll({
		where,
		include: [{
			model: User,
			as: 'user',
			attributes: ['id', 'name', 'email'],
		}],
		order: [['created_at', 'DESC']],
		limit: perPage,
		offset: (page - 1) * perPage,
	});

	const lastPage = Math.ceil(count / perPage) || 1;

	return res.json({
		data: {
			current_page: page,
			data: rows,
			per_page: perPage,
			total: count,
			last_page: lastPage,
		},
	});
});

const actions = asyncHandler(async (req, res) => {
	const actions = await AuditLog.findAll({
		attributes: [[require('sequelize').fn('DISTINCT', require('sequelize').col('action')), 'action']],
		order: [['action', 'ASC']],
		raw: true,
	});
	res.json({ data: actions.map(a => a.action) });
});

module.exports = { index, actions };