const { Generic } = require('../models/models');

const GenericRepository = {
    findAll: async () => {
        return await Generic.findAll();
    },

    findById: async (id) => {
        return await Generic.findByPk(id);
    },

    create: async (data) => {
        return await Generic.create(data);
    },

    update: async (generic, data) => {
        return await generic.update(data);
    },

    destroy: async (generic) => {
        return await generic.destroy();
    }
};

module.exports = GenericRepository;