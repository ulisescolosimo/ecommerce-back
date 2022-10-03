var express = require('express');
var router = express.Router();
let passport = require('../config/passport')
const { updateReview, deleteReview, createReview, reviews  } = require('../Controllers/ReviewController')

router.post ('/', passport.authenticate('jwt', {session:false}), createReview)
router.get('/', reviews)
router.patch('/:id', passport.authenticate('jwt', {session:false}), updateReview)
router.delete('/:id',passport.authenticate('jwt', {session:false}), deleteReview)
