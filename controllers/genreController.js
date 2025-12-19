const genreService = require('../services/genreService');

class GenreController {
    async create(req, res) {
        try {
            const { name } = req.body;
            const genre = await genreService.createGenre(name);
            return res.status(201).json(genre);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getAll(req, res) {
        try {
            const genres = await genreService.getAllGenres();
            return res.json(genres);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const genre = await genreService.getGenreById(id);
            if (genre) {
                return res.json(genre);
            }
            return res.status(404).json({ message: 'Genre not found' });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name } = req.body;
            const genre = await genreService.updateGenre(id, name);
            return res.json(genre);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            await genreService.deleteGenre(id);
            return res.status(204).send();
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = new GenreController();