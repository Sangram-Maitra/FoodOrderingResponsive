const LocalStrategy = require("passport-local").Strategy
const User = require("../models/user")
const bcrypt = require("bcrypt")
//i didn't use this passport a lot here
// function init(passport) {
//     passport.use(new passport({usernameField:'firstname'},async (firstname,password,done)=>{
//         //login
//         //check if email exists
//         const use = await User.findOne({firstname:firstname})
//         if(!user){
//             return done(null,false,{message:"No User with this FirstName"})
//         }
//         bcrypt.compare(password,user.password).then(match=>{
//             if(match){
//                 return done(null,user,{})
//             }
//         })

//     }))
// }

// module.exports =init