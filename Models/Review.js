const mongoose = require('mongoose')

const ReviewSchema = new mongoose.Schema ({
    user: {type:mongoose.Types.ObjectId, ref:'users'},
    product: {type:mongoose.Types.ObjectId, ref:'products'},
    commentary: {type: String, required: true},
    star: {type: Number, required: true},
})

const Review = mongoose.model(
    "reviews",
    ReviewSchema
)

module.exports = Review