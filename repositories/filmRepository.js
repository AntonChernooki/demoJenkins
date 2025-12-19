const { Film, FilmCreator, films_film_creators } = require('../models/models');

const FilmRepository = {
    findAll: async (where, limit, offset) => {
        return await Film.findAndCountAll({ where, limit, offset });
    },
    findById: async (id) => {
        return await Film.findByPk(id);
    },
    create: async (data) => {
        return await Film.create(data);
    },
    update: async (film, data) => {
        return await film.update(data);
    },
    destroy: async (film) => {
        return await film.destroy();
    },
    addCreatorToFilm: async (filmId, creatorId) => {
        const film = await Film.findByPk(filmId);
        const creator = await FilmCreator.findByPk(creatorId);
        await film.addFilm_creator(creator); 
    },
};

module.exports = FilmRepository;