const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema ({
    brand: {type: String, required: true},
    model: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
    likes: {type: Array},
    type: {type:String},
    stock: {type: Number, required: true},
    photo: {type: Array, required: true},
})

const Product = mongoose.model(
    "products",
    ProductSchema
)

module.exports = Product