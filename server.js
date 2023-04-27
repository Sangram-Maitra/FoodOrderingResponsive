const express = require("express");
const bodyparser = require("body-parser");
const { urlencoded } = require("body-parser");
// const mysql = require("mysql");
const cookieParser = require("cookie-parser");
const session = require("express-session");
var flash = require('connect-flash');
const mongoose = require("mongoose")
const encrypt = require("mongoose-encryption")
var passport = require("passport")
const path = require("path");
// var passportLocalMongoose = require("passport-local-mongoose")
// const MongoDbStore = require('connect-mongo')(session);
const MongoStore = require('connect-mongo');
// MongoDbStore(session);


// var UserFirstName="";
// var UserLastName="";
// var TotalCost = 0;
// var number = "";
// var UserAddress = "";
// var GlobalSearch="";

const app = express();

app.set("views",path.join(__dirname,'/resources/views'));
app.set("view engine", "ejs");
// app.use(express.static("public"));
app.use('/static',express.static(path.join(process.cwd(),"public")));


app.use(cookieParser());


mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/FoodDeliveryDB",{useNewUrlParser:true});
const connection = mongoose.connection;
connection.once('open',()=>{
  console.log("Database Connected...");
})

// Passport config
// const passportInit = require("./app/config/passport")
// passportInit(passport)
// app.use(passport.initialize())
// app.use(passport.session())


// Session Store & Config
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  store: MongoStore.create({ mongoUrl: 'mongodb://localhost/FoodDeliveryDB' }),
  saveUninitialized: true,
  cookie: {maxAge: 1000*60*5}
})) 


// app.use(passport.initialize());
// app.use(passport.session());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(flash());

app.use(express.json())


//Global Middleware
app.use((req,res,next)=>{
  res.locals.session = req.session
  // res.locals.isAuthenticated = req.isAuthenticated()
  next()
})


require("./routes/web")(app);

