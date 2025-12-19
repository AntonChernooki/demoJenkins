
const OrderRepository = require('../repositories/orderRepository');

const OrderService = {
    async getOrders() {
        return await OrderRepository.findAll();
    },

    async getOrdersByUserId(userId) {
        return await OrderRepository.findByUserId(userId);
    },

    async getOrderById(id) {
        return await OrderRepository.findById(id);
    },

    async createOrder(data) {
        console.log(data);
        return await OrderRepository.create(data);
    },

    async updateOrder(order, data) {
        return await OrderRepository.update(order, data);
    },

    async deleteOrder(order) {
        return await OrderRepository.destroy(order);
    }
};

module.exports = OrderService;