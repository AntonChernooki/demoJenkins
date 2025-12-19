const SeatRepository = require('../repositories/seatRepository');

const SeatService = {
    async getSeats() {
        return await SeatRepository.findAll();
    },

    async getSeatById(id) {
        return await SeatRepository.findById(id);
    },

    async getSeatsBySessionId(sessionId) {
        return await SeatRepository.findBySessionId(sessionId);
    },

    async createSeats(film_session_id, seats) {
        const seatData = seats.map(seat => ({
            row: seat.row,
            place: seat.place,
            film_session_id: film_session_id,
            status: 'available'
        }));
        return await SeatRepository.bulkCreate(seatData);
    },

    async updateSeat(seat, data) {
        return await SeatRepository.update(seat, data);
    },

    async deleteSeat(seat) {
        return await SeatRepository.destroy(seat);
    }
};

module.exports = SeatService;