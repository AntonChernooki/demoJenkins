const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');
const multer = require('multer');
const uuid = require('uuid');
const path = require('path');
const checkRole = require('../middleware/checkRoleMiddleware');
const validationMiddleware = require('../middleware/validationMiddleware');
const { filmSchema } = require('../validation/validationSchemas');
const httpLogger = require('../middleware/httpLogger'); 
router.use(httpLogger);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'C:/WEB/testProject/server/static/posters');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${uuid.v4()}${ext}`;
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });


/**
 * @swagger
 * /film:
 *   get:
 *     tags: [Films]
 *     summary: Получить список фильмов
 *     responses:
 *       200:
 *         description: Список фильмов
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get('/', filmController.getFilms);

/**
 * @swagger
 * /film/{id}:
 *   get:
 *     tags: [Films]
 *     summary: Получить фильм по ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID фильма
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Информация о фильме
 *       404:
 *         description: Фильм не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get('/:id', filmController.getFilmById);

/**
 * @swagger
 * /film:
 *   post:
 *     tags: [Films]
 *     summary: Создать новый фильм
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               release_year:
 *                 type: integer
 *               genre:
 *                 type: string
 *               country:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Фильм создан
 *       400:
 *         description: Неверные данные
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.post(
    '/',
    checkRole('ADMIN'),
    upload.single('poster'),
    filmController.createFilm
);

/**
 * @swagger
 * /film/{id}:
 *   put:
 *     tags: [Films]
 *     summary: Обновить информацию о фильме
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID фильма
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               release_year:
 *                 type: integer
 *               genre:
 *                 type: string
 *               country:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Информация о фильме обновлена
 *       400:
 *         description: Неверные данные
 *       404:
 *         description: Фильм не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.put(
    '/:id',
    checkRole('ADMIN'),
    upload.single('poster'),
    validationMiddleware(filmSchema),
    filmController.updateFilm
);

/**
 * @swagger
 * /film/{id}:
 *   delete:
 *     tags: [Films]
 *     summary: Удалить фильм
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID фильма
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Фильм успешно удален
 *       404:
 *         description: Фильм не найден
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.delete('/:id', checkRole('ADMIN'), filmController.deleteFilm);

module.exports = router;