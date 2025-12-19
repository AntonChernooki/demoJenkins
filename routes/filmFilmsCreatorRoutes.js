
const Router = require('express').Router();
const checkRole = require('../middleware/checkRoleMiddleware');
const filmFilmsCreatorController = require('../controllers/filmFilmsCreatorController');
const httpLogger = require('../middleware/httpLogger'); 
Router.use(httpLogger);

Router.get('/:filmId', filmFilmsCreatorController.getCreatorsByFilmId);


Router.get('/', filmFilmsCreatorController.getAllCreatorsForAllFilms); 

Router.post('/:filmId',checkRole("ADMIN"), filmFilmsCreatorController.addCreatorToFilm);

Router.delete('/:filmId/:creatorId',checkRole("ADMIN"), filmFilmsCreatorController.removeCreatorFromFilm);

module.exports = Router;