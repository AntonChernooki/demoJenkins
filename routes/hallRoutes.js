const express = require('express');
const router = express.Router();
const hallController = require('../controllers/hallController');
const validationMiddleware = require('../middleware/validationMiddleware');
const { hallSchema } = require('../validation/validationSchemas');
const httpLogger = require('../middleware/httpLogger'); 
router.use(httpLogger);

/**
 * @swagger
 * tags:
 *   name: Halls
 *   description: Управление залами
 */

/**
 * @swagger
 * /halls:
 *   get:
 *     tags: [Halls]
 *     summary: Получить список залов
 *     responses:
 *       200:
 *         description: Список залов
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get('/', hallController.getHalls);

/**
 * @swagger
 * /halls/{id}:
 *   get:
 *     tags: [Halls]
 *     summary: Получить зал по ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID зала
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Информация о зале
 *       404:
 *         description: Зал не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get('/:id', hallController.getHallById);

/**
 * @swagger
 * /halls:
 *   post:
 *     tags: [Halls]
 *     summary: Создать новый зал
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Зал создан
 *       400:
 *         description: Неверные данные
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.post('/', validationMiddleware(hallSchema), hallController.createHall);

/**
 * @swagger
 * /halls/{id}:
 *   put:
 *     tags: [Halls]
 *     summary: Обновить информацию о зале
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID зала
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               capacity:
 *                 type: integer
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Информация о зале обновлена
 *       400:
 *         description: Неверные данные
 *       404:
 *         description: Зал не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.put('/:id', validationMiddleware(hallSchema), hallController.updateHall);

/**
 * @swagger
 * /halls/{id}:
 *   delete:
 *     tags: [Halls]
 *     summary: Удалить зал
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID зала
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Зал успешно удален
 *       404:
 *         description: Зал не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.delete('/:id', hallController.deleteHall);

module.exports = router;