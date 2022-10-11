var express = require('express');
var router = express.Router();

const usersRouter = require('./usersLogin')
const productsRouter = require('./products')
const reviewsRouter = require('./reviews')
const couponsRouter = require('./coupons')
const mercadoRouter = require('./buy')


router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Salty Shop' });
});

router.use('/auth', usersRouter)
router.use('/products', productsRouter)
router.use('/reviews', reviewsRouter)
router.use('/coupons', couponsRouter)
router.use('/checkout', mercadoRouter)


module.exports = router;
