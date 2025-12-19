const FilmService = require('../services/filmService');

const getFilms = async (req, res) => {
    try {
        const films = await FilmService.getFilms(req.query);
        res.json({
            data: films.rows,
            total: films.count,
            page: parseInt(req.query.page) || 1,
            pages: Math.ceil(films.count / (req.query.limit || 10))
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getFilmById = async (req, res) => {
    try {
        const film = await FilmService.getFilmById(req.params.id);
        if (film) {
            res.json(film);
        } else {
            res.status(404).json({ error: 'Film not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createFilm = async (req, res) => {
    console.log(req.body); 
    try {
        const { title, release_year, genre_id, country, description, creatorId } = req.body;
        const poster_file_name = req.file ? req.file.filename : null;

       
        const film = await FilmService.createFilm({ title, release_year, genre_id, country, description, poster_file_name });

        
        if (creatorId && creatorId.length > 0) {
            for (const id of creatorId) {
                await FilmService.addCreatorToFilm(film.id, id);
            }
        }

        res.status(201).json(film);
    } catch (error) {
        console.error('Ошибка при создании фильма:', error);
        res.status(500).json({ message: 'Ошибка при создании фильма', error: error.message });
    }
};

const updateFilm = async (req, res) => {
    try {
        const film = await FilmService.getFilmById(req.params.id);
        if (film) {
            await FilmService.updateFilm(film, req.body);
            res.json(film);
        } else {
            res.status(404).json({ error: 'Film not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteFilm = async (req, res) => {
    try {
        const film = await FilmService.getFilmById(req.params.id);
        if (film) {
            await FilmService.deleteFilm(film);
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Film not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getFilms,
    getFilmById,
    createFilm,
    updateFilm,
    deleteFilm
};