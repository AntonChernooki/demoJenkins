const genreRepository = require('../repositories/genreRepository');

class GenreService {
    async createGenre(name) {
        return await genreRepository.createGenre(name);
    }

    async getAllGenres() {
        return await genreRepository.getAllGenres();
    }

    async getGenreById(id) {
        return await genreRepository.getGenreById(id);
    }

    async updateGenre(id, name) {
        return await genreRepository.updateGenre(id, name);
    }

    async deleteGenre(id) {
        return await genreRepository.deleteGenre(id);
    }
}

module.exports = new GenreService();