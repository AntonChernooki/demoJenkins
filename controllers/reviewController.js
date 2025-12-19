// controllers/reviewController.js
const ReviewService = require('../services/reviewService');

const getReviews = async (req, res) => {
    try {
        const reviews = await ReviewService.getReviews();
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getReviewsByFilmId = async (req, res) => {
    filmId = req.params.filmId;
    try {
        const reviews = await ReviewService.getReviewsByFilmId(filmId);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getReviewById = async (req, res) => {
    try {
        const review = await ReviewService.getReviewById(req.params.id);
        if (review) {
            res.json(review);
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createReview = async (req, res) => {
    try {
        const review = await ReviewService.createReview(req.body);
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateReview = async (req, res) => {
    try {
        const review = await ReviewService.getReviewById(req.params.id);
        if (review) {
            await ReviewService.updateReview(review, req.body);
            res.json(review);
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteReview = async (req, res) => {
    try {
        const review = await ReviewService.getReviewById(req.params.id);
        if (review) {
            await ReviewService.deleteReview(review);
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Review not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getReviews,
    getReviewsByFilmId,
    getReviewById,
    createReview,
    updateReview,
    deleteReview
};