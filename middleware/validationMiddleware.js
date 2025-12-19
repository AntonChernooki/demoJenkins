const validationMiddleware = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);

        if (error) {
            
            return res.status(400).json({
                message: 'Ошибка валидации',
                details: error.details.map((err) => err.message),
            });
        }

        
        next();
    };
};

module.exports = validationMiddleware;