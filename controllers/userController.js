
const UserService = require('../services/userService');
const jwt = require('jsonwebtoken');
const ApiError = require('../error/ApiError');

const generateJwt = (id, email, role_id, first_name, last_name, birth_date) => {
    return jwt.sign(
        { id, email, role_id, first_name, last_name, birth_date },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
};

const registration = async (req, res, next) => {
    try {
        console.log('Регистрация пользователя:', req.body); 
        const user = await UserService.register(req.body);
        const token = generateJwt(user.id, user.email, user.role_id, user.first_name, user.last_name, user.birth_date);
        res.status(201).json({ token });
    } catch (error) {
        console.error('Ошибка при регистрации:', error); 
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const user = await UserService.login(req.body.email, req.body.password);
        const token = generateJwt(user.id, user.email, user.role_id, user.first_name, user.last_name, user.birth_date);
        return res.json({ token });
    } catch (error) {
        next(error);
    }
};

const check = async (req, res, next) => {
    try {
        const user = req.user; 
        const token = generateJwt(user.id, user.email, user.role_id, user.first_name, user.last_name, user.birth_date);
        return res.json({ token });
    } catch (error) {
        next(ApiError.internal(error.message));
    }
};

module.exports = {
    registration,
    login,
    check
};