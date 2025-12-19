const ReviewRepository = require('../repositories/reviewRepository');

const ReviewService = {
    async getReviews() {
        return await ReviewRepository.findAll();
    },

    async getReviewById(id) {
        return await ReviewRepository.findById(id);
    },

    async getReviewsByFilmId(filmId) {
        return await ReviewRepository.findByFilmId(filmId);
    },

    async createReview(data) {
        return await ReviewRepository.create(data);
    },

    async updateReview(review, data) {
        return await ReviewRepository.update(review, data);
    },

    async deleteReview(review) {
        return await ReviewRepository.destroy(review);
    }
};

module.exports = ReviewService;