const { AuditLog } = require('../models');

const logAudit = async ({ userId, action, entityType = null, entityId = null, description = null, oldValues = null, newValues = null, ipAddress = null }) => {
    try {
        await AuditLog.create({
            user_id: userId,
            action,
            entity_type: entityType,
            entity_id: entityId,
            description,
            ip_address: ipAddress,
        });
    } catch (err) {
        console.error('[AUDIT LOG ERROR]:', err.message);
    }
};

module.exports = { logAudit };