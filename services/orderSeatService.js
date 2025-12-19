const orderSeatRepository = require('../repositories/orderSeatRepository');

class OrderSeatService {
    async addOrderSeat(orderId, seatId) {
        return await orderSeatRepository.addOrderSeat(orderId, seatId);
    }

    async getSeatsByOrderId(orderId) {
        return await orderSeatRepository.getSeatsByOrderId(orderId);
    }
}

module.exports = new OrderSeatService();