
const Joi = require('joi');

const roleSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional().allow(null, '')
});

const userSchema = Joi.object({
    first_name: Joi.string().min(1).max(50).required(),
    last_name: Joi.string().min(1).max(50).required(),
    birth_date: Joi.date().less('now').required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role_id: Joi.number().integer().optional().allow(null) 
});

const filmSchema = Joi.object({
    title: Joi.string().required(),
    release_year: Joi.number().integer().min(1888).max(new Date().getFullYear()).optional().allow(null),
    genre: Joi.number().integer().optional().allow(null),
    country: Joi.string().optional().allow(null),
    description: Joi.string().optional().allow(null, ''),
  
});

const filmCreatorSchema = Joi.object({
    full_name: Joi.string().required(),
    position: Joi.string().optional().allow(null, '')
});

const filmSessionSchema = Joi.object({
    film_id: Joi.number().integer().required(), 
    start_date: Joi.date().required(),
    start_time: Joi.string().pattern(/^\d{2}:\d{2}$/, 'hh:mm').required(),
    price: Joi.number().positive().required(),
    hall_id: Joi.number().integer().required() 
});

const seatSchema = Joi.object({
    status: Joi.string().optional().allow(null, ''),
    film_session_id: Joi.number().integer().required(), 
    row: Joi.number().integer().positive().required(),
    place: Joi.number().integer().positive().required()
});

const orderSchema = Joi.object({
    user_id: Joi.number().integer().required(), 
    film_session_id: Joi.number().integer().required(), 
    cost: Joi.number().positive().required(),
    purchase: Joi.boolean().required(),
   
});

const reviewSchema = Joi.object({
    content: Joi.string().required(),
    rating: Joi.number().integer().min(1).max(5).required(),
    film_id: Joi.number().integer().required(), 
    user_id: Joi.number().integer().required() 
});

const hallSchema = Joi.object({
    name: Joi.string().required(),
    capacity: Joi.number().integer().positive().required()
});

module.exports = {
    roleSchema,
    userSchema,
    filmSchema,
    filmCreatorSchema,
    filmSessionSchema,
    seatSchema,
    orderSchema,
    reviewSchema,
    hallSchema
};