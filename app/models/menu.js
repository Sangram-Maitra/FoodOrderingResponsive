const mongoose = require("mongoose")
const Schema = mongoose.Schema  

const menuSchema = new Schema({
    name:String,
    size:String,
    price:Number,
    img:String
})

const Menu = new mongoose.model("food",menuSchema)

module.exports = Menu