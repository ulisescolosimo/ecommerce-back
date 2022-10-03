const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema ({
    brand: {type: String, required: true},
    model: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    likes: {type: Array},
    stock: {type: Number, required: true},
    photo: {type: String, required: true},
})

const Product = mongoose.model(
    "products",
    ProductSchema
)

module.exports = Product