var express = require('express');
var router = express.Router();

const usersRouter = require('./usersLogin')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'The Salty Shop' });
});

router.use('/auth', usersRouter)

module.exports = router;
