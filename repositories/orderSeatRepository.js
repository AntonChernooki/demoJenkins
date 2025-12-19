const { Sequelize } = require('sequelize');
const sequelize = require('../db'); 

class OrderSeatRepository {
    async addOrderSeat(orderId, seatId) {
        console.log("Добавляем запись:", { orderId, seatId }); 
        const query = 'INSERT INTO public.orders_seats ("orderId", "seatId") VALUES (:orderId, :seatId) RETURNING *';
        
        try {
            const result = await sequelize.query(query, {
                replacements: { orderId, seatId },
                type: Sequelize.QueryTypes.INSERT
            });
            return result[0][0]; 
        } catch (error) {
            console.error("Ошибка при выполнении запроса:", error); 
            throw error; 
        }
    }

    async getSeatsByOrderId(orderId) {
        const query = 'SELECT * FROM public.orders_seats WHERE "orderId" = :orderId';
        
        const result = await sequelize.query(query, {
            replacements: { orderId },
            type: Sequelize.QueryTypes.SELECT
        });
        return result; 
    }
}

module.exports = new OrderSeatRepository();