const { FilmCreator,films_film_creators } = require('../models/models');

const FilmCreatorRepository = {
    findAll: async () => {
        return await FilmCreator.findAll();
    },

    findById: async (id) => {
        return await FilmCreator.findByPk(id);
    },
    findByFilmId: async (id) => {
        return await FilmCreator.findAll({
            where:{film_id:id},
            include:[{model:films_film_creators}]
        });
    },

    create: async (data) => {
        return await FilmCreator.create(data);
    },

    update: async (filmCreator, data) => {
        return await filmCreator.update(data);
    },

    destroy: async (filmCreator) => {
        return await filmCreator.destroy();
    }
};

module.exports = FilmCreatorRepository;