const RoleRepository = require('../repositories/roleRepository');

const RoleService = {
    async getRoles() {
        return await RoleRepository.findAll();
    },

    async getRoleById(id) {
        return await RoleRepository.findById(id);
    },

    async createRole(data) {
        return await RoleRepository.create(data);
    },

    async updateRole(role, data) {
        return await RoleRepository.update(role, data);
    },

    async deleteRole(role) {
        return await RoleRepository.destroy(role);
    }
};

module.exports = RoleService;