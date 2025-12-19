const jwt = require('jsonwebtoken');
const { User, Role } = require('../models/models'); 

module.exports = function(requiredRoleTitle) {

    return async function(req, res, next) {
       
        if (req.method === "OPTIONS") {
            return next();
        }
        try {
            if (!req.headers.authorization) {
                return res.status(401).json({ message: "Не указана авторизация" });
            }

            const token = req.headers.authorization.split(' ')[1];
            if (!token) {
                return res.status(401).json({message: "Не авторизован" });
            }
            const decode = jwt.verify(token, process.env.SECRET_KEY);
            req.user = decode;

            console.log('Decoded user:', decode);

            const user = await User.findByPk(decode.id, {
                include: {
                    model: Role,
                    as: 'role', 
                    attributes: ['title']
                }
            });

            console.log('Fetched user:', user);
            console.log('User Role:', user ? user.role : 'No role found');

            if (!user || !user.role) {
                return res.status(403).json({ message: "Нет доступа" });
            }

            if (user.role.title !== requiredRoleTitle) {
                return res.status(403).json({ message: "Роль не соответствует" });
            }

            next();
        } catch (e) {
            console.error(e);
            return res.status(401).json({ message: "Не авторизован" });
        }
    }
}
