var express = require('express');
var router = express.Router();

const { getAllCoupons ,getCoupon, createCoupon, deleteCoupon } = require('../Controllers/couponController')

router.get('/', getAllCoupons)
router.get('/:id', getCoupon)
router.post('/', createCoupon);
router.delete('/:id', deleteCoupon);

module.exports = router;