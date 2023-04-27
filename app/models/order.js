const mongoose = require("mongoose")
const Schema = mongoose.Schema  

const orderSchema = new Schema({
    customerId:{type: mongoose.Schema.Types.ObjectId,
                ref:'User',
                required:true
            },
    items:{type:Object},
    address:{type:String},
    phone:{type:String},
    price:{type:String},
    paymentType: {type:String, default:"COD"},
    status:{type:String, default:'Order_placed'}
},{timestamps:true})

const Order = new mongoose.model("order",orderSchema)

module.exports = Order