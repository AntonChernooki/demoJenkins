const UserRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const ApiError = require('../error/ApiError');

const UserService = {
    async register({ email, password, role_id, first_name, last_name, birth_date }) {
        if (!email || !password) {
            throw ApiError.badRequest("Некорректный email или пароль");
        }

        const candidate = await UserRepository.findByEmail(email);
        if (candidate) {
            throw ApiError.badRequest("Такой пользователь уже существует");
        }

        const hashPassword = await bcrypt.hash(password.toString(), 5);
        return await UserRepository.create({
            email,
            role_id,
            password: hashPassword,
            first_name,
            last_name,
            birth_date
        });
    },

    async login(email, password) {
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            throw ApiError.internal("Пользователь с таким именем не найден");
        }

        const comparePassword = bcrypt.compareSync(password.toString(), user.password);
        if (!comparePassword) {
            throw ApiError.internal("Неверный пароль");
        }
        return user;
    }
};

module.exports = UserService;