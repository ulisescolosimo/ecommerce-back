var express = require('express');
var router = express.Router();
let passport = require('../config/passport')
const { updateReview, deleteReview, createReview, getReviews  } = require('../Controllers/ReviewController')

router.get('/', getReviews)
router.post ('/', passport.authenticate('jwt', {session:false}), createReview)
router.patch('/:id', passport.authenticate('jwt', {session:false}), updateReview)
router.delete('/:id',passport.authenticate('jwt', {session:false}), deleteReview)

module.exports = router;