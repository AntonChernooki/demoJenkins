const GenericRepository = require('../repositories/genericRepository');

const GenericService = {
    async getGenerics() {
        return await GenericRepository.findAll();
    },

    async getGenericById(id) {
        return await GenericRepository.findById(id);
    },

    async createGeneric(data) {
        return await GenericRepository.create(data);
    },

    async updateGeneric(generic, data) {
        return await GenericRepository.update(generic, data);
    },

    async deleteGeneric(generic) {
        return await GenericRepository.destroy(generic);
    }
};

module.exports = GenericService;