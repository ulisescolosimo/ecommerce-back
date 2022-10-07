const mongoose = require('mongoose')

const CouponSchema = new mongoose.Schema({
    couponCode: { type: String, required: true },
    currentTime: { type: Number, required: true },
    discount: {type: Number, required: true},
    endTime: { type: Number, required: true },
})

const Coupon = mongoose.model(
    "coupons",
    CouponSchema
)

module.exports = Coupon