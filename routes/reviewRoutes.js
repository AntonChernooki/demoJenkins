const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const validationMiddleware = require('../middleware/validationMiddleware');
const { reviewSchema } = require('../validation/validationSchemas');
const httpLogger = require('../middleware/httpLogger'); 
router.use(httpLogger);
/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Управление отзывами
 */


router.get('/film_id/:filmId', reviewController.getReviewsByFilmId);

/**
 * @swagger
 * /reviews:
 *   get:
 *     tags: [Reviews]
 *     summary: Получить список отзывов
 *     responses:
 *       200:
 *         description: Список отзывов
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get('/', reviewController.getReviews);

/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     tags: [Reviews]
 *     summary: Получить отзыв по ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID отзыва
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Информация об отзыве
 *       404:
 *         description: Отзыв не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get('/:id', reviewController.getReviewById);

/**
 * @swagger
 * /reviews:
 *   post:
 *     tags: [Reviews]
 *     summary: Создать новый отзыв
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filmId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               content:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 format: int32
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       201:
 *         description: Отзыв создан
 *       400:
 *         description: Неверные данные
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.post('/', validationMiddleware(reviewSchema), reviewController.createReview);

/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     tags: [Reviews]
 *     summary: Обновить информацию об отзыве
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID отзыва
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filmId:
 *                 type: integer
 *               userId:
 *                 type: integer
 *               content:
 *                 type: string
 *               rating:
 *                 type: integer
 *                 format: int32
 *                 minimum: 1
 *                 maximum: 5
 *     responses:
 *       200:
 *         description: Информация об отзыве обновлена
 *       400:
 *         description: Неверные данные
 *       404:
 *         description: Отзыв не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.put('/:id', validationMiddleware(reviewSchema), reviewController.updateReview);

/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     tags: [Reviews]
 *     summary: Удалить отзыв
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID отзыва
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Отзыв успешно удален
 *       404:
 *         description: Отзыв не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.delete('/:id', reviewController.deleteReview);

module.exports = router;