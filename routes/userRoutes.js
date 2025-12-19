const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const { userSchema } = require('../validation/validationSchemas'); 
const validationMiddleware = require('../middleware/validationMiddleware'); 
const httpLogger = require('../middleware/httpLogger'); 
router.use(httpLogger);
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Управление пользователями
 */

/**
 * @swagger
 * /user/registration:
 *   post:
 *     tags: [Users]
 *     summary: Регистрация нового пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Пользователь зарегистрирован
 *       400:
 *         description: Неверные данные
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.post('/registration',  validationMiddleware(userSchema), userController.registration);

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags: [Users]
 *     summary: Вход пользователя
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Успешный вход
 *       401:
 *         description: Неверное имя пользователя или пароль
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.post('/login', userController.login);

/**
 * @swagger
 * /user/auth:
 *   get:
 *     tags: [Users]
 *     summary: Проверка состояния аутентификации пользователя
 *     security:
 *       - bearerAuth: []  # Убедитесь, что используется авторизация
 *     responses:
 *       200:
 *         description: Пользователь аутентифицирован
 *       401:
 *         description: Необходима аутентификация
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get('/auth', authMiddleware, userController.check);

module.exports = router;