const { Role } = require('../models/models');

const RoleRepository = {
    findAll: async () => {
        return await Role.findAll();
    },

    findById: async (id) => {
        return await Role.findByPk(id);
    },

    create: async (data) => {
        return await Role.create(data);
    },

    update: async (role, data) => {
        return await role.update(data);
    },

    destroy: async (role) => {
        return await role.destroy();
    }
};

module.exports = RoleRepository;