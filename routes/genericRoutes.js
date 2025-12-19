const express = require('express');
const router = express.Router();
const genericController = require('../controllers/genericController');
const validationMiddleware = require('../middleware/validationMiddleware');
const { genericSchema } = require('../validation/validationSchemas');
const httpLogger = require('../middleware/httpLogger'); 
router.use(httpLogger);
/**
 * @swagger
 * tags:
 *   name: Generics
 *   description: Управление общими объектами
 */

/**
 * @swagger
 * /generics:
 *   get:
 *     tags: [Generics]
 *     summary: Получить список общих объектов
 *     responses:
 *       200:
 *         description: Список общих объектов
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get('/', genericController.getGenerics);

/**
 * @swagger
 * /generics/{id}:
 *   get:
 *     tags: [Generics]
 *     summary: Получить общий объект по ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID общего объекта
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Информация об общем объекте
 *       404:
 *         description: Общий объект не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get('/:id', genericController.getGenericById);

/**
 * @swagger
 * /generics:
 *   post:
 *     tags: [Generics]
 *     summary: Создать новый общий объект
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Общий объект создан
 *       400:
 *         description: Неверные данные
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.post('/', validationMiddleware(genericSchema), genericController.createGeneric);

/**
 * @swagger
 * /generics/{id}:
 *   put:
 *     tags: [Generics]
 *     summary: Обновить информацию об общем объекте
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID общего объекта
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
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Информация об общем объекте обновлена
 *       400:
 *         description: Неверные данные
 *       404:
 *         description: Общий объект не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.put('/:id', validationMiddleware(genericSchema), genericController.updateGeneric);

/**
 * @swagger
 * /generics/{id}:
 *   delete:
 *     tags: [Generics]
 *     summary: Удалить общий объект
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID общего объекта
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Общий объект успешно удален
 *       404:
 *         description: Общий объект не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.delete('/:id', genericController.deleteGeneric);

module.exports = router;