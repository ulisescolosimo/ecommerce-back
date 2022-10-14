const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema ({
    user: {type:mongoose.Types.ObjectId, ref:'users'},
    product: {type:mongoose.Types.ObjectId, ref:'products'},
    reviewTitle: {type: String, required: true},
    review: {type: String, required: true},
    location: {type: String, required: true},
    age: {type: Number, required: true},
    star: {type: Number, required: true},
})

const Review = mongoose.model(
    "reviews",
    ReviewSchema
)

module.exports = Review