const FilmRepository = require('../repositories/filmRepository');

const FilmService = {
    async getFilms(query) {
        const { page = 1, limit = 50, title, genre, country, release_year } = query;
        const offset = (page - 1) * limit;

        let where = {};

        if (title) {
            where.title = { [Op.like]: `%${title}%` };
        }

        if (genre) {
            where.genre = genre;
        }

        if (country) {
            where.country = { [Op.like]: `%${country}%` };
        }

        if (release_year) {
            where.release_year = release_year;
        }

        return await FilmRepository.findAll(where, parseInt(limit), offset);
    },

    async getFilmById(id) {
        return await FilmRepository.findById(id);
    },

    async createFilm(data) {
        return await FilmRepository.create(data);
    },

    async updateFilm(film, data) {
        return await FilmRepository.update(film, data);
    },

    async deleteFilm(film) {
        return await FilmRepository.destroy(film);
    },

    async addCreatorToFilm(filmId, creatorId) {
        return await FilmRepository.addCreatorToFilm(filmId, creatorId);
    },
};

module.exports = FilmService;