const express = require('express');
const router = express.Router();

const PaymentController = require('../Controllers/PaymentsController')
const PaymentsServices = require('../services/PaymentsService')
const PaymentInstance = new PaymentController(new PaymentsServices())

const usersRouter = require('./usersLogin')
const productsRouter = require('./products')
const reviewsRouter = require('./Reviews')
const couponsRouter = require('./coupons')
const mercadoRouter = require('./buy')
 

router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Salty Shop' });
});

router.post('/payments', function(req, res, next) {
  PaymentInstance.getPaymentLink(req, res)
});

router.use('/auth', usersRouter)
router.use('/products', productsRouter)
router.use('/reviews', reviewsRouter)
router.use('/coupons', couponsRouter)
router.use('/checkout', mercadoRouter)

module.exports = router;
