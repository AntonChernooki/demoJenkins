const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const validationMiddleware = require('../middleware/validationMiddleware');
const { orderSchema } = require('../validation/validationSchemas');
const httpLogger = require('../middleware/httpLogger'); 
router.use(httpLogger);






router.get('/user/:userId', orderController.getOrdersByUserId);


/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Управление заказами
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     tags: [Orders]
 *     summary: Получить список заказов
 *     responses:
 *       200:
 *         description: Список заказов
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get('/', orderController.getOrders);

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     tags: [Orders]
 *     summary: Получить заказ по ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID заказа
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Информация о заказе
 *       404:
 *         description: Заказ не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get('/:id', orderController.getOrderById);

/**
 * @swagger
 * /orders:
 *   post:
 *     tags: [Orders]
 *     summary: Создать новый заказ
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               filmSessionId:
 *                 type: integer
 *               seatIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Заказ создан
 *       400:
 *         description: Неверные данные
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.post('/', validationMiddleware(orderSchema), orderController.createOrder);

/**
 * @swagger
 * /orders/{id}:
 *   put:
 *     tags: [Orders]
 *     summary: Обновить информацию о заказе
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID заказа
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               filmSessionId:
 *                 type: integer
 *               seatIds:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       200:
 *         description: Информация о заказе обновлена
 *       400:
 *         description: Неверные данные
 *       404:
 *         description: Заказ не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.put('/:id', validationMiddleware(orderSchema), orderController.updateOrder);

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     tags: [Orders]
 *     summary: Удалить заказ
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID заказа
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Заказ успешно удален
 *       404:
 *         description: Заказ не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.delete('/:id', orderController.deleteOrder);

module.exports = router;