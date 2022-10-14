const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema ({
    brand: {type: String, required: true},
    model: {type: String, required: true},
    description: {type: String, required: true, min: 5, max: 300},
    price: {type: Number, required: true, min: 1},
    likes: {type: Array},
    type: {type: String, required: true},
    stock: {type: Number, required: true},
    photo: {type: Array, required: true},
})

const Product = mongoose.model(
    "products",
    ProductSchema
)

module.exports = Product