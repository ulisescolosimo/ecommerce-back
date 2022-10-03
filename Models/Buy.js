const mongoose = require('mongoose')

const PurchaseSchema = new mongoose.Schema ({
    user: {type:mongoose.Types.ObjectId, ref:'users'},
    product: {type:mongoose.Types.ObjectId, ref:'products'},
    shipping: {type: String, required: true},
    amount: {type: Number, required: true}
})

const Purchase = mongoose.model(
    "purchases",
    PurchaseSchema
)

module.exports = Purchase