const FilmSessionRepository = require('../repositories/filmSessionRepository');

const FilmSessionService = {
    async getFilmSessions() {
        return await FilmSessionRepository.findAll();
    },

    async getFilmSessionById(id) {
        return await FilmSessionRepository.findById(id);
    },

    async createFilmSession(data) {
        return await FilmSessionRepository.create(data);
    },

    async updateFilmSession(filmSession, data) {
        return await FilmSessionRepository.update(filmSession, data);
    },

    async deleteFilmSession(filmSession) {
        return await FilmSessionRepository.destroy(filmSession);
    },


    
    async getAvailableSeatsBySessionId(sessionId) {
        return await FilmSessionRepository.getAvailableSeatsBySessionId(sessionId);
    },

    // Новая функция для получения сеансов по ID фильма
    async getSessionsByFilmId(filmId) {
        return await FilmSessionRepository.findByFilmId(filmId); // Предполагается, что эта функция реализована в репозитории
    }
};

module.exports = FilmSessionService;