const { Genre } = require('../models/models');

class GenreRepository {
    async createGenre(name) {
        return await Genre.create({ name });
    }

    async getAllGenres() {
        return await Genre.findAll();
    }

    async getGenreById(id) {
        return await Genre.findByPk(id);
    }

    async updateGenre(id, name) {
        const genre = await this.getGenreById(id);
        if (genre) {
            genre.name = name;
            return await genre.save();
        }
        throw new Error('Genre not found');
    }

    async deleteGenre(id) {
        const genre = await this.getGenreById(id);
        if (genre) {
            await genre.destroy();
            return true;
        }
        throw new Error('Genre not found');
    }
}

module.exports = new GenreRepository();