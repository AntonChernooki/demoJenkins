const { Review, Film,User } = require('../models/models');


const ReviewRepository = {
    findAll: async () => {
        return await Review.findAll();
    },

    findById: async (id) => {
        return await Review.findByPk(id, {
            include: [{ model: User }] 
        });
    },

    findByFilmId: async (filmId) => {
        return await Review.findAll({
            where: { film_id: filmId },
            include: [{ model: User }] 
        });
    },


    create: async (data) => {
        return await Review.create(data);
    },

    update: async (review, data) => {
        return await review.update(data);
    },

    destroy: async (review) => {
        return await review.destroy();
    }
};

module.exports = ReviewRepository;