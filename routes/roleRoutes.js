const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const validationMiddleware = require('../middleware/validationMiddleware');
const { roleSchema } = require('../validation/validationSchemas');
const checkRole = require('../middleware/checkRoleMiddleware');
const httpLogger = require('../middleware/httpLogger'); 
router.use(httpLogger);
/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Управление ролями
 */

/**
 * @swagger
 * /roles:
 *   get:
 *     tags: [Roles]
 *     summary: Получить список ролей
 *     responses:
 *       200:
 *         description: Список ролей
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get('/', roleController.getRoles);

/**
 * @swagger
 * /roles/{id}:
 *   get:
 *     tags: [Roles]
 *     summary: Получить роль по ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID роли
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Информация о роли
 *       404:
 *         description: Роль не найдена
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.get('/:id', roleController.getRoleById);

/**
 * @swagger
 * /roles:
 *   post:
 *     tags: [Roles]
 *     summary: Создать новую роль
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
 *         description: Роль создана
 *       400:
 *         description: Неверные данные
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.post('/', validationMiddleware(roleSchema),checkRole("ADMIN"), roleController.createRole);

/**
 * @swagger
 * /roles/{id}:
 *   put:
 *     tags: [Roles]
 *     summary: Обновить информацию о роли
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID роли
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
 *         description: Информация о роли обновлена
 *       400:
 *         description: Неверные данные
 *       404:
 *         description: Роль не найдена
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.put('/:id', validationMiddleware(roleSchema),checkRole("ADMIN"), roleController.updateRole);

/**
 * @swagger
 * /roles/{id}:
 *   delete:
 *     tags: [Roles]
 *     summary: Удалить роль
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID роли
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Роль успешно удалена
 *       404:
 *         description: Роль не найдена
 *       500:
 *         description: Внутренняя ошибка сервера
 */
router.delete('/:id',checkRole("ADMIN"), roleController.deleteRole);

module.exports = router;