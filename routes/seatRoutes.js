const express = require('express');
const router = express.Router();
const seatController = require('../controllers/seatController');
const checkRole = require('../middleware/checkRoleMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');
const { seatSchema } = require('../validation/validationSchemas');
const httpLogger = require('../middleware/httpLogger'); 
router.use(httpLogger);
/**
 * @swagger
 * tags:
 *   name: Seats
 *   description: Управление местами
 */

/**
 * @swagger
 * /seats:
 *   get:
 *     tags: [Seats]
 *     summary: Получить список мест
 *     responses:
 *       200:
 *         description: Список мест
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get('/', seatController.getSeats);

/**
 * @swagger
 * /seats/{id}:
 *   get:
 *     tags: [Seats]
 *     summary: Получить место по ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID места
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Информация о месте
 *       404:
 *         description: Место не найдено
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get('/:id', seatController.getSeatById);

/**
 * @swagger
 * /seats:
 *   post:
 *     tags: [Seats]
 *     summary: Создать новое место
 *     security:
 *       - bearerAuth: []  # Убедитесь, что используется авторизация
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               row:
 *                 type: integer
 *               number:
 *                 type: integer
 *               hallId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Место создано
 *       400:
 *         description: Неверные данные
 *       403:
 *         description: Доступ запрещен
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.post('/', checkRole('ADMIN'),  seatController.createSeat);

/**
 * @swagger
 * /seat/{id}:
 *   put:
 *     tags: [Seats]
 *     summary: Обновить информацию о месте
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID места
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []  # Убедитесь, что используется авторизация
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               row:
 *                 type: integer
 *               number:
 *                 type: integer
 *               hallId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Информация о месте обновлена
 *       400:
 *         description: Неверные данные
 *       404:
 *         description: Место не найдено
 *       403:
 *         description: Доступ запрещен
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.put('/:id', validationMiddleware(seatSchema), seatController.updateSeat);

/**
 * @swagger
 * /seat/{id}:
 *   delete:
 *     tags: [Seats]
 *     summary: Удалить место
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID места
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []  # Убедитесь, что используется авторизация
 *     responses:
 *       204:
 *         description: Место успешно удалено
 *       404:
 *         description: Место не найдено
 *       403:
 *         description: Доступ запрещен
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.delete('/:id',  seatController.deleteSeat);

router.get('/session/:sessionId', seatController.getSeatsBySessionId); // Новый маршрут

module.exports = router;