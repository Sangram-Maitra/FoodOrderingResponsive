const mongoose = require("mongoose")
var passportLocalMongoose = require("passport-local-mongoose")
// var passport = require("passport")

const Schema = mongoose.Schema  

const userSchema = new Schema({
    firstname:String,
    lastname:String,
    phonenumber:Number,
    password:String,
    address:String
},{timestamps:true})

userSchema.plugin(passportLocalMongoose)

const User = new mongoose.model("User",userSchema)

module.exports = User