const Router = require('express');
const router = new Router();

const filmSessionRouter = require('./filmSessionRoutes');
const filmRouter = require('./filmRoutes');
const ordersRouter = require('./orderRoutes');
const reviewsRouter = require('./reviewRoutes');
const seatsRouter = require('./seatRoutes');
const userRouter = require('./userRoutes');
const roleRouter = require('./roleRoutes');
const genericRouter = require('./genericRoutes');
const filmCreatorRouter = require('./filmCreatorRoutes');
const hallRouter = require('./hallRoutes');
const orderSeatRouter = require('./orderSeatRouter');
const filmFilmsCreatorRouter = require('./filmFilmsCreatorRoutes');
const genreRouter = require('./genreRouter'); 

router.use('/user', userRouter);
router.use('/order_seat', orderSeatRouter);
router.use('/film', filmRouter);
router.use('/film_session', filmSessionRouter);
router.use('/orders', ordersRouter);
router.use('/reviews', reviewsRouter);
router.use('/seats', seatsRouter);
router.use('/roles', roleRouter);
router.use('/generics', genericRouter);
router.use('/film_creators', filmCreatorRouter);
router.use('/halls', hallRouter);
router.use('/film_films_creators', filmFilmsCreatorRouter);
router.use('/genres', genreRouter); 

module.exports = router;