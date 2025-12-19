const express = require('express');
const router = express.Router();
const filmCreatorController = require('../controllers/filmCreatorController');
const validationMiddleware = require('../middleware/validationMiddleware');
const { filmCreatorSchema } = require('../validation/validationSchemas');
const httpLogger = require('../middleware/httpLogger'); 
const checkRole = require('../middleware/checkRoleMiddleware');
router.use(httpLogger);
/**
 * @swagger
 * tags:
 *   name: FilmCreators
 *   description: Управление создателями фильмов
 */

/**
 * @swagger
 * /film_creators:
 *   get:
 *     tags: [FilmCreators]
 *     summary: Получить список создателей фильмов
 *     responses:
 *       200:
 *         description: Список создателей фильмов
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get('/', filmCreatorController.getFilmCreators);

/**
 * @swagger
 * /film_creators/{id}:
 *   get:
 *     tags: [FilmCreators]
 *     summary: Получить создателя фильма по ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID создателя фильма
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Информация о создателе фильма
 *       404:
 *         description: Создатель не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get('/:id', filmCreatorController.getFilmCreatorById);
router.get('/film_id/:id', filmCreatorController.getFilmCreatorByFilmId);
/**
 * @swagger
 * /film_creators:
 *   post:
 *     tags: [FilmCreators]
 *     summary: Создать нового создателя фильма
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               bio:
 *                 type: string
 *               birth_year:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Создатель фильма создан
 *       400:
 *         description: Неверные данные
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.post('/', validationMiddleware(filmCreatorSchema),checkRole("ADMIN"), filmCreatorController.createFilmCreator);

/**
 * @swagger
 * /film_creators/{id}:
 *   put:
 *     tags: [FilmCreators]
 *     summary: Обновить информацию о создателе фильма
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID создателя фильма
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
 *               bio:
 *                 type: string
 *               birth_year:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Информация о создателе фильма обновлена
 *       400:
 *         description: Неверные данные
 *       404:
 *         description: Создатель не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.put('/:id', validationMiddleware(filmCreatorSchema),checkRole("ADMIN"), filmCreatorController.updateFilmCreator);

/**
 * @swagger
 * /film_creators/{id}:
 *   delete:
 *     tags: [FilmCreators]
 *     summary: Удалить создателя фильма
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID создателя фильма
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Создатель фильма успешно удален
 *       404:
 *         description: Создатель не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.delete('/:id',checkRole("ADMIN"), filmCreatorController.deleteFilmCreator);

module.exports = router;