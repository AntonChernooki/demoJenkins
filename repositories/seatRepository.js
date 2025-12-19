const { Seat } = require('../models/models');

const SeatRepository = {
    findAll: async () => {
        return await Seat.findAll();
    },

    findById: async (id) => {
        return await Seat.findByPk(id);
    },

    findBySessionId: async (sessionId) => {
        return await Seat.findAll({ where: { film_session_id: sessionId } });
    },

    create: async (data) => {
        return await Seat.create(data);
    },

    update: async (seat, data) => {
        return await seat.update(data);
    },

    destroy: async (seat) => {
        return await seat.destroy();
    },
    bulkCreate: async (data) => {
        return await Seat.bulkCreate(data);
    }
};

module.exports = SeatRepository;