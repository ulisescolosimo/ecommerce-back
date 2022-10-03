var express = require('express');
var router = express.Router();

const usersRouter = require('./usersLogin')
const productsRouter = require('./products')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Salty Shop' });
});

router.use('/auth', usersRouter)
router.use('/products', productsRouter)

module.exports = router;
