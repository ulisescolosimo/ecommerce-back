var express = require('express');
var router = express.Router();

const usersRouter = require('./usersLogin')
const productsRouter = require('./products')
const couponsRouter = require('./coupons')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Salty Shop' });
});

router.use('/auth', usersRouter)
router.use('/products', productsRouter)
router.use('/coupons', couponsRouter)

module.exports = router;
