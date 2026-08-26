const { Task, User } = require('../models');
const { logAudit } = require('../utils/auditLogger');
const { paginated } = require('../utils/responseHelper');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');

const index = asyncHandler(async (req, res) => {
    const user = req.user;
    const page = parseInt(req.query.page, 10) || 1;
    const perPage = parseInt(req.query.per_page, 10) || 10;
    const status = req.query.status;

    // Build where clause
    const where = {};
    if (!user.isAdmin()) where.user_id = user.id;
    if (status) where.status = status;

    // Sequelize findAndCountAll =
    const { count, rows } = await Task.findAndCountAll({
        where,
        include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'email', 'role'],
        }],
        order: [['due_date', 'ASC NULLS LAST'], ['created_at', 'DESC']],
        limit: perPage,
        offset: (page - 1) * perPage,
    });

    return paginated(res, rows, page, perPage, count);
});

const store = asyncHandler(async (req, res) => {
    const { title, description, status, priority, due_date } = req.body;
    const user = req.user;

    const task = await Task.create({
        user_id: user.id,
        title: title.trim(),
        description: description || null,
        status: status || 'todo',
        priority: priority || 'medium',
        due_date: due_date || null,
    });

    // Reload with user relation
    await task.reload({
        include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email', 'role'] }],
    });

    if (user.isAdmin()) {
        await logAudit({
            userId: user.id,
            action: 'create',
            entityType: 'Task',
            entityId: task.id,
            description: `Admin created task: ${task.title}`,
            newValues: task.toJSON(),
            ipAddress: req.ip,
        });
    }

    res.status(201).json(task);
});

const show = asyncHandler(async (req, res) => {
    const task = await Task.findByPk(req.params.id, {
        include: [{
            model: User,
            as: 'user',
            attributes: ['id', 'name', 'email', 'role'],
        }],
    });

    if (!task) {
        throw ApiError.notFound('Task not found');
    }

    if (!req.user.isAdmin() && task.user_id !== req.user.id) {
        throw ApiError.forbidden('Forbidden');
    }

    res.json({
        data: task,
    });
});

const update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = req.user;

    const task = await Task.findByPk(id);
    if (!task) throw ApiError.notFound('Task not found');
    if (!user.isAdmin() && task.user_id !== user.id) throw ApiError.forbidden('Forbidden');

    await task.update({
        ...(req.body.title !== undefined && { title: req.body.title.trim() }),
        ...(req.body.description !== undefined && { description: req.body.description || null }),
        ...(req.body.status !== undefined && { status: req.body.status }),
        ...(req.body.priority !== undefined && { priority: req.body.priority }),
        ...(req.body.due_date !== undefined && { due_date: req.body.due_date || null }),
    });

    await task.reload({
        include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email', 'role'] }],
    });

    if (user.isAdmin()) {
        await logAudit({
            userId: user.id,
            action: 'update',
            entityType: 'Task',
            entityId: task.id,
            description: `Admin updated task: ${task.title}`,
            ipAddress: req.ip,
        });
    }

    res.json(task);
});

const destroy = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = req.user;

    const task = await Task.findByPk(id);
    if (!task) throw ApiError.notFound('Task not found');
    if (!user.isAdmin() && task.user_id !== user.id) throw ApiError.forbidden('Forbidden');

    const oldValues = { ...task.toJSON() };

    await task.destroy();

    if (user.isAdmin()) {
        await logAudit({
            userId: user.id,
            action: 'delete',
            entityType: 'Task',
            entityId: id,
            description: `Admin deleted task: ${oldValues.title}`,
            ipAddress: req.ip,
        });
    }

    res.json({ message: 'Task deleted successfully' });
});

const stats = asyncHandler(async (req, res) => {
    const user = req.user;

    if (user.isAdmin()) {
        const statusCounts = await Task.findAll({
            attributes: ['status', [require('sequelize').fn('COUNT', '*'), 'count']],
            group: ['status'],
            raw: true,
        });

        const userCounts = await User.findAll({
            attributes: ['name', [require('sequelize').fn('COUNT', require('sequelize').col('tasks.id')), 'task_count']],
            include: [{ model: Task, as: 'tasks', attributes: [] }],
            group: ['User.id', 'User.name'],
            raw: true,
        });

        res.json({ data: { status_counts: statusCounts, user_counts: userCounts } });
    } else {
        const statusCounts = await Task.findAll({
            where: { user_id: user.id },
            attributes: ['status', [require('sequelize').fn('COUNT', '*'), 'count']],
            group: ['status'],
            raw: true,
        });
        res.json({ data: { status_counts: statusCounts } });
    }
});

module.exports = { index, store, show, update, destroy, stats };