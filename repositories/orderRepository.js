const { Order, User, FilmSession, Film,Seat,Hall } = require('../models/models');

const OrderRepository = {
    findAll: async () => {
        return await Order.findAll();
    },

    findByUserId: async (userId) => {
        return await Order.findAll({
            where: { user_id: userId },
            include: [
                { model: User },
                {
                    model: FilmSession,
                    include: [{ model: Film },{ model: Hall }] 
                    
                },
                {
                    model: Seat,
                    through: { attributes: [] } 
                }
            ]
        });
    },

    findById: async (id) => {
        return await Order.findByPk(id);
    },

    create: async (data) => {
        return await Order.create(data);
    },

    update: async (order, data) => {
        return await order.update(data);
    },

    destroy: async (order) => {
        return await order.destroy();
    }
};

module.exports = OrderRepository;