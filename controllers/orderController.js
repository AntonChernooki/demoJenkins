
const OrderService = require('../services/orderService');

const getOrders = async (req, res) => {
    try {
        const orders = await OrderService.getOrders();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getOrderById = async (req, res) => {
    try {
        const order = await OrderService.getOrderById(req.params.id);
        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createOrder = async (req, res) => {
    try {
      
        console.log("Полученные данные:", req.body);

        const order = await OrderService.createOrder(req.body);
        res.status(201).json(order);
    } catch (error) {
        console.error("Ошибка при создании заказа:", error);
        res.status(500).json({ error: error.message });
    }
};

const getOrdersByUserId = async (req, res) => {
    try {
        const orders = await OrderService.getOrdersByUserId(req.params.userId);
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateOrder = async (req, res) => {
    try {
        const order = await OrderService.getOrderById(req.params.id);
        if (order) {
            await OrderService.updateOrder(order, req.body);
            res.json(order);
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteOrder = async (req, res) => {
    try {
        const order = await OrderService.getOrderById(req.params.id);
        if (order) {
            await OrderService.deleteOrder(order);
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getOrdersByUserId,
    getOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
};