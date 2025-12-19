const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');
const httpLogger = require('../middleware/httpLogger'); 
router.use(httpLogger);

router.post('/', genreController.create);
router.get('/', genreController.getAll);
router.get('/:id', genreController.getById);
router.put('/:id', genreController.update);
router.delete('/:id', genreController.delete);

module.exports = router;