const express = require('express');
const router = express.Router();
const orderSeatController = require('../controllers/orderSeatController');

router.post('/', orderSeatController.addOrderSeat);

router.get('/:orderId', orderSeatController.getSeatsByOrderId);

module.exports = router;