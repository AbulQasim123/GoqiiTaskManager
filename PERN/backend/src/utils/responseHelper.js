const paginated = (res, data, page, perPage, total, statusCode = 200) => {
    const lastPage = Math.ceil(total / perPage) || 1;
    return res.status(statusCode).json({
        current_page: page,
        data,
        first_page_url: `?page=1`,
        from: (page - 1) * perPage + 1,
        last_page: lastPage,
        last_page_url: `?page=${lastPage}`,
        next_page_url: page < lastPage ? `?page=${page + 1}` : null,
        path: '',
        per_page: perPage,
        prev_page_url: page > 1 ? `?page=${page - 1}` : null,
        to: Math.min(page * perPage, total),
        total,
    });
};

const authResponse = (res, token, user, expiresIn = 3600) => {
    return res.json({
        access_token: token,
        token_type: 'bearer',
        expires_in: expiresIn,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            created_at: user.created_at,
            updated_at: user.updated_at,
        },
    });
};

module.exports = { paginated, authResponse };