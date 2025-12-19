const HallRepository = require('../repositories/hallRepository');

const HallService = {
    async getHalls() {
        return await HallRepository.findAll();
    },

    async getHallById(id) {
        return await HallRepository.findById(id);
    },

    async createHall(data) {
        return await HallRepository.create(data);
    },

    async updateHall(hall, data) {
        return await HallRepository.update(hall, data);
    },

    async deleteHall(hall) {
        return await HallRepository.destroy(hall);
    }
};

module.exports = HallService;
