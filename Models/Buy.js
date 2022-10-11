const mongoose = require('mongoose')

const PurchaseSchema = new mongoose.Schema ({
    user: {type:mongoose.Types.ObjectId, ref:'users'},
    items: [{type: String, required: true}],
    shipping: {type: String, required: true},
    amount: {type: Number, required: true}
})

const Purchase = mongoose.model(
    "purchases",
    PurchaseSchema
)

module.exports = Purchase