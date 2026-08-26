const validate = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const errors = {};

            result.error.issues.forEach((issue) => {
                const field = issue.path[0];

                if (!errors[field]) {
                    errors[field] = [];
                }

                errors[field].push(issue.message);
            });

            return res.status(422).json({
                message: 'Validation failed',
                errors,
            });
        }

        req.body = result.data;

        next();
    };
};

module.exports = validate;