const User = require("../../models/user")
const Menu = require("../../models/menu")
// var passport = require("passport")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'this_is_the_Private_key';

// // use static authenticate method of model in LocalStrategy
// passport.use(User.createStrategy());

// // use static serialize and deserialize of model for passport session support
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

function authController(){
    return {
        signin: function(req,res) {
            res.render("signin", { title: "Sign In",serverError: req.flash('server-error')});
        },
        signup: function(req,res) {
            res.render("signup",{ title: "Sign Up" ,serverError: req.flash('server-error')});
        },
        signinIn: function(req,res){
            var phnumber = req.body.Phone;
            var password = req.body.pass;
            // const newUser = new User({
            //     phonenumber:phnumber,
            //     password:password
            // });

            // Finding a user with a specific email
            // const emailToFind = 'johndoe@example.com';
            // const userQuery = User.findOne({ email: emailToFind }).then((user)=>{
                
            // });

            // Executing the query using Promise syntax
            // userQuery.then((user) => {
            //   if (user) {
            //     console.log('User found:', user);
            //   } else {
            //     console.log('User not found');
            //   }
            // }).catch((err) => {
            //   console.error('Error occurred:', err);
            // });
            var check = User.find({phonenumber:phnumber}).count();
            User.count({phonenumber:phnumber}).then((count)=>{
                if(count>0)
                {
                    User.findOne({phonenumber:phnumber}).then((foundUser)=>{
                        if(foundUser){
                            // console.log(foundUser)
                            req.session.myObj = foundUser;
                            bcrypt.compare(password,foundUser.password , function(err, result) {
                                if(result==true)
                                {
                                    Menu.find().then(function(foodsFromDB){
                                        res.render("menu",{title:"HOME PAGE",foods:foodsFromDB, SearchFailure: req.flash('server-error')})
                                    })
                                }
                                else{
                                    console.log("User not present");
                                    req.flash('server-error',"User not present");
                                    //res.render("signin",{ title: "Sign In" ,serverError: req.flash('server-error')});
                                res.redirect("/signIn")
                                }
                            });
                        }
                    })
                }
                else{
                    req.flash('server-error',"something not properly inputted");
                    // res.render("signin",{ title: "Sign In" ,serverError: req.flash('server-error')});
                    res.redirect("/signIn")
                }
            })
        },
        signinup: function(req,res){
            var flag=0;
            var Fname = req.body.First_Name;
            var Lname = req.body.Last_Name;
            var PhoneNumber = req.body.Phone;
            var Address = req.body.add;
            var password = req.body.pass;

            var isNum = /^[0-9]+$/.test(PhoneNumber);
            if(isNum==true && PhoneNumber.length>=9 && PhoneNumber.length<11)
            {
                flag=1;
            }
            if(flag==0)
            {
                req.flash('server-error',"something not properly inputted");
            
                console.log("Number is not proper inputted");
                res.redirect("/");
            }
            else{

            User.find({phonenumber:PhoneNumber}).then(function(result){
                // console.log(result[0])
                if(result[0]!=undefined)
                {
                    req.flash('server-error',"User Already Exists");
                    return res.redirect("/signUp")
                }
                else{
                      
                    bcrypt.hash(password, saltRounds, function(err, hash) {
                        // Store hash in your password DB.
                        const newuser = new User({
                            firstname:Fname,
                            lastname:Lname,
                            phonenumber:PhoneNumber,
                            password:hash,
                            address:Address
                        })
                        if(newuser.save()){
                            req.session.myObj = newuser;
                            console.log("Data inserted")
                            Menu.find().then(function(foodsFromDB){
                                res.render("menu",{title:"HOME PAGE",foods:foodsFromDB, SearchFailure: req.flash('server-error')})
                            })
                            // res.redirect("/home")
                          }
                          else{
                            console.log("Data not inserted")
                        }

                    });
                    
                }
            })
        }
    }
}
}


module.exports = authController