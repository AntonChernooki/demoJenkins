const FilmCreatorRepository = require('../repositories/filmCreatorRepository');

const FilmCreatorService = {
    async getFilmCreators() {
        return await FilmCreatorRepository.findAll();
    },

    async getFilmCreatorById(id) {
        return await FilmCreatorRepository.findById(id);
    },
    async getFilmCreatorByFilmId(id) {
        return await FilmCreatorRepository.findByFilmId(id);
    },

    async createFilmCreator(data) {
        return await FilmCreatorRepository.create(data);
    },

    async updateFilmCreator(filmCreator, data) {
        return await FilmCreatorRepository.update(filmCreator, data);
    },

    async deleteFilmCreator(filmCreator) {
        return await FilmCreatorRepository.destroy(filmCreator);
    }
};

module.exports = FilmCreatorService;