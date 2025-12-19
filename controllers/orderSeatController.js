// orderSeatController.js
const orderSeatService = require('../services/orderSeatService');

class OrderSeatController {
    async addOrderSeat(req, res) {
        const { orderId, seatId } = req.body;

        if (!orderId || !seatId) {
            return res.status(400).json({ error: 'orderId и seatId обязательны' });
        }

        try {
            const orderSeat = await orderSeatService.addOrderSeat(orderId, seatId);
            return res.status(201).json(orderSeat);
        } catch (error) {
            console.error("Ошибка при добавлении места в заказ:", error.message); // Добавлено для отладки
            return res.status(500).json({ error: 'Ошибка при добавлении места в заказ' });
        }
    }

    async getSeatsByOrderId(req, res) {
        const { orderId } = req.params;

        try {
            const seats = await orderSeatService.getSeatsByOrderId(orderId);
            return res.status(200).json(seats);
        } catch (error) {
            console.error("Ошибка при получении мест по orderId:", error);
            return res.status(500).json({ error: 'Ошибка при получении мест' });
        }
    }
}

module.exports = new OrderSeatController();