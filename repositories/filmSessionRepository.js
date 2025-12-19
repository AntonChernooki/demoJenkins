const { FilmSession,Hall,Seat } = require('../models/models');

const FilmSessionRepository = {
    findAll: async () => {
        return await FilmSession.findAll();
    },

    findById: async (id) => {
        return await FilmSession.findByPk(id);
    },
    
    getAvailableSeatsBySessionId: async (sessionId) => {
        return await Seat.findAll({
            where: { film_session_id: sessionId, status: 'available' }, 
        });
    },
    
    
        findByFilmId: async (filmId) => {
            return await FilmSession.findAll({
                where: { film_id: filmId },
                include: [{
                    model: Hall, 
                    attributes: ['id', 'name'] 
                }]
            });
        },

    create: async (data) => {
        return await FilmSession.create(data);
    },

    update: async (filmSession, data) => {
        return await filmSession.update(data);
    },

    destroy: async (filmSession) => {
        return await filmSession.destroy();
    }
};

module.exports = FilmSessionRepository;