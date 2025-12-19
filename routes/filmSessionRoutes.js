const express = require('express');
const router = express.Router();
const filmSessionController = require('../controllers/filmSessionController');
const validationMiddleware = require('../middleware/validationMiddleware');
const { filmSessionSchema } = require('../validation/validationSchemas');
const httpLogger = require('../middleware/httpLogger'); 
const checkRole = require('../middleware/checkRoleMiddleware');
router.use(httpLogger);
/**
 * @swagger
 * tags:
 *   name: FilmSessions
 *   description: Управление сеансами фильмов
 */

/**
 * @swagger
 * /film_sessions:
 *   get:
 *     tags: [FilmSessions]
 *     summary: Получить список сеансов фильмов
 *     responses:
 *       200:
 *         description: Список сеансов фильмов
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get('/', filmSessionController.getFilmSessions);

/**
 * @swagger
 * /film_sessions/{id}:
 *   get:
 *     tags: [FilmSessions]
 *     summary: Получить сеанс фильма по ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID сеанса фильма
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Информация о сеансе фильма
 *       404:
 *         description: Сеанс фильма не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get('/:id', filmSessionController.getFilmSessionById);

/**
 * @swagger
 * /film_sessions:
 *   post:
 *     tags: [FilmSessions]
 *     summary: Создать новый сеанс фильма
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filmId:
 *                 type: integer
 *               sessionTime:
 *                 type: string
 *                 format: date-time
 *               hall:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Сеанс фильма создан
 *       400:
 *         description: Неверные данные
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.post('/',  filmSessionController.createFilmSession);

/**
 * @swagger
 * /film_sessions/{id}:
 *   put:
 *     tags: [FilmSessions]
 *     summary: Обновить информацию о сеансе фильма
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID сеанса фильма
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
 *               sessionTime:
 *                 type: string
 *                 format: date-time
 *               hall:
 *                 type: string
 *               price:
 *                 type: number
 *     responses:
 *       200:
 *         description: Информация о сеансе фильма обновлена
 *       400:
 *         description: Неверные данные
 *       404:
 *         description: Сеанс фильма не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.put('/:id',  filmSessionController.updateFilmSession);

/**
 * @swagger
 * /film_sessions/{id}:
 *   delete:
 *     tags: [FilmSessions]
 *     summary: Удалить сеанс фильма
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID сеанса фильма
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Сеанс фильма успешно удален
 *       404:
 *         description: Сеанс фильма не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.delete('/:id', filmSessionController.deleteFilmSession);

router.get('/:id/available-seats', filmSessionController.getAvailableSeatsBySessionId);
router.get('/film/:filmId', filmSessionController.getSessionsByFilmId);

module.exports = router;