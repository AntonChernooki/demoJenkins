
const { Film, FilmCreator } = require('../models/models');


const getCreatorsByFilmId = async (req, res) => {
    const filmId = req.params.filmId; 
console.log("id фильма "+filmId)
    try {
        
        const film = await Film.findByPk(filmId, {
            include: [{ model: FilmCreator }]
        });

        
        if (!film) {
            console.log('Фильм не найден');
            console.log('ID фильма из запроса:', filmId);
            return res.status(404).json({ message: 'Фильм не найден' });
        }
       
        console.log('Возвращаемый фильм:', JSON.stringify(film, null, 2));

        const creators = film.FilmCreators || film.film_creators; 
        console.log('Создатели фильма:', creators);

        res.json(creators);
    } catch (error) {
        console.error('Ошибка при получении создателей:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

// Получить всех создателей для всех фильмов
const getAllCreatorsForAllFilms = async (req, res) => {
    try {
        const films = await Film.findAll({ include: FilmCreator });
        res.json(films); // Возвращаем все фильмы с создателями
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

// Добавить создателя к фильму
const addCreatorToFilm = async (req, res) => {
    const filmId = req.params.filmId;
    const { creatorId } = req.body;
    try {
        const film = await Film.findByPk(filmId);
        const creator = await FilmCreator.findByPk(creatorId);
        if (!film || !creator) return res.status(404).json({ message: 'Фильм или создатель не найден' });

        await film.addFilmCreator(creator); // Добавляем связь
        res.status(201).json({ message: 'Создатель добавлен к фильму' });
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

// Удалить создателя из фильма
const removeCreatorFromFilm = async (req, res) => {
    const filmId = req.params.filmId;
    const creatorId = req.params.creatorId;
    try {
        const film = await Film.findByPk(filmId);
        const creator = await FilmCreator.findByPk(creatorId);
        if (!film || !creator) return res.status(404).json({ message: 'Фильм или создатель не найден' });

        await film.removeFilmCreator(creator); // Удаляем связь
        res.status(204).json(); // Успешное удаление
    } catch (error) {
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

module.exports = {
    getCreatorsByFilmId,
    getAllCreatorsForAllFilms, // Экспорт нового метода
    addCreatorToFilm,
    removeCreatorFromFilm,
};