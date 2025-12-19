const { Hall } = require('../models/models');

const HallRepository = {
    findAll: async () => {
        return await Hall.findAll();
    },

    findById: async (id) => {
        return await Hall.findByPk(id);
    },

    create: async (data) => {
        return await Hall.create(data);
    },

    update: async (hall, data) => {
        return await hall.update(data);
    },

    destroy: async (hall) => {
        return await hall.destroy();
    }
};

module.exports = HallRepository;