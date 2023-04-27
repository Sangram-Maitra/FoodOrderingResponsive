const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/cart/cartController");
const orderController = require("../app/http/cart/orderController");


function initRoutes(app){
    // Get Requests
    app.get("/",homeController().index);
    app.get("/signIn",authController().signin);
    app.get("/signUp",authController().signup);
    
    app.get("/menu",homeController().menu);
    app.get("/cart",cartController().index);
    app.get("/customers/order",orderController().index);
    // Post Requests
    app.post("/signingup",authController().signinup);
    app.post("/signIn",authController().signinIn);
    app.post("/update-cart",cartController().update);
    app.post("/cart",cartController().index);
    app.post("/order",orderController().store);


  app.get("/signingIn", function (req, res) {
    res.render("signin", { title: "Sign In" });
  });
  
  
  
  app.get("/cart",function(req,res){
    db.query("SELECT * FROM cart", function (err, result, fields) 
      {
        if (err) throw err;
        var test = result;
        var length = Object.keys(result).length;
        // console.log(length);
        // for (var i = 0; i < length; i++) 
        // {
        //   console.log(result[i].Name);
        // };
        var data = JSON.parse(JSON.stringify(result));
        TotalCost=0;
        for(i=0;i<data.length;i++)
        {
          TotalCost+=data[i].Price;
        }
        // console.log(TotalCost);
        res.render("cart", { title: "Shopping Cart",foodDetails: result, num: length, Name:UserFirstName,Total:TotalCost });
        // res.render("home", { title: "Home Page"});
      });
    // res.render("cart",{ title: "Shopping Cart" })
  });
  
  app.get("/error",function(req,res){
    res.render("error",{ title: "Error" });
    // res.redirect("/");
  })
  
  app.get("/profile",(req,res)=>{
  
    let sql = `select * from users where PHONENUMBER = '${number}'`;
    db.query(sql, function (err, result1, fields) 
      {
        if (err) throw err;
        var data1 = JSON.parse(JSON.stringify(result1));
        console.log(data1);
        UserFirstName = data1[0].FName;
        UserLastName = data1[0].LName;
        number = data1[0].PhoneNumber;
        UserAddress = data1[0].Address;
  
        // res.render("home", { title: "Home Page"});
      });
      let sql2 = `select * from invoice where PhoneNumber = '${number}'`;
      db.query(sql2, function (err, result2, fields){
        var length = Object.keys(result2).length;
        var data2= JSON.parse(JSON.stringify(result2));
  
        res.render("profile", { title: "Profile",Name:UserFirstName, Lname: UserLastName, Addr: UserAddress,PhoneNum:number,size:length,invoices:data2 });
      });
  })
  
  app.get("/search",(req,res)=>{
      var nameSearching = req.query.search;
      if(nameSearching!=undefined){
        GlobalSearch=nameSearching;
      }
      var size2 ;
      let sqlSearch = "Select * from delhi_fooddb where Name like '%" + GlobalSearch + "%'";
      // console.log("The Name searching is: "+nameSearching);
  
      db.query(sqlSearch,function(err,result,fields){
        if(err)throw err;
        if(result[0]!=undefined)
        {
          size2 = Object.keys(result).length;
          var dataSearch = JSON.parse(JSON.stringify(result));
          // console.log(dataSearch.length);
          // console.log(dataSearch);
          res.render("search",{title:"Search",Searchfood:dataSearch, size:size2})
        }
        else{
          console.log("Food Not Present");
          req.flash('server-error',"Food Not Present Please Try Again");
          res.redirect("/home");
        }
      })
  })
  
  app.get("/addinginSearch",function(req,res){
    console.log(req.query.PText);
    console.log(req.query.PPrice);
    ProductName = req.query.PText;
    ProductPrice = req.query.PPrice;
    // TotalCost+=ProductPrice; this way if we directly went to cart it wont show any price so its not good method
  
    let data = {
      Name: ProductName,
      Price: ProductPrice    
    };
    let sql = "Insert into Cart set ?";
    let query = db.query(sql, data, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("data inserted");
        res.redirect("/search");
        // res.render("search");
      }
    });
  })
  
  
  //post Requests
  app.post("/signingUp",function(req,res){
      var flag=0;
      
      var Fname = req.body.First_Name;
      var Lname = req.body.Last_Name;
      var PhoneNumber = req.body.Phone;
      var Address = req.body.add;
      UserFirstName= Fname;
      UserLastName = Lname;
      UserAddress = Address;
      number=PhoneNumber;
  
      
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
      const newuser = new User({
        firstname:Fname,
        lastname:Lname,
        phonenumber:PhoneNumber,
        address:Address
      })
      if(newuser.save()){
        console.log("Data inserted")
        res.redirect("/home")
      }
      else{
        console.log("Data not inserted")
      }
      // User.insertOne(newuser, function(err, res){
      //   if(err){
      //     console.log("Data not inserted")
      //     console.log(err)
      //   }
      //   else{
      //     console.log("Data inserted into users db")
      //   }
      // })
  }
  })
  
  app.post("/done",(req,res)=>{
      var d = new Date();
      var data = {
        PhoneNumber: number,
        Cost:TotalCost,
        Date: d.getFullYear()+"-"+d.getMonth()+"-"+d.getDate()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()
      };
      let sql2 = "insert into invoice set ?";
        db.query(sql2, data, function (err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log("Invoice inserted");
            // res.redirect("/home");
          }
        });
    res.redirect("/home");
  });
  
  app.post("/home", function (req, res) {
      res.redirect("/home");
  });
  
  app.post("/signIn",function(req,res){
      res.redirect("/signIn");
  })
  
  app.post("/signingIn", function (req, res) {
    var phnumber = req.body.Phone;
    let sql = `select * from users where PHONENUMBER = '${phnumber}'`;
    let query = db.query(sql,function(err,result,fields){
        //as the result is taking array as name
        // console.log(result[0]);
        // console.log(result[0].RowDataPacket.FName);
        if(err)
        {
          console.log(err);
        }
        else{
          var data = JSON.parse(JSON.stringify(result));
          if(data[0]!=undefined)
          {
            console.log(data[0].PhoneNumber);
            UserFirstName= data[0].FName;
            number= data[0].PhoneNumber;
          }
          if(result[0]==undefined) 
          {
            console.log("User not present");
            res.render("error",{ title: "Error" });
          }
          else{
            console.log("Post Fetched");
            res.redirect("/home");
          }
        }
    });
  });
  
  app.post("/addingTocart",function(req,res){
    console.log(req.body.PText);
    console.log(req.body.PPrice);
    ProductName = req.body.PText;
    ProductPrice = req.body.PPrice;
    // TotalCost+=ProductPrice; this way if we directly went to cart it wont show any price so its not good method
  
    let data = {
      Name: ProductName,
      Price: ProductPrice    
    };
    let sql = "Insert into Cart set ?";
    let query = db.query(sql, data, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("data inserted");
        res.redirect("/home");
      }
    });
  })
  
  app.post("/cart",function(req,res){
    res.redirect("/cart");
  })
  
  app.post("/invoice",function(req,res){
      let sql = `delete from cart`
      let query = db.query(sql,function(err,result){
          if(err) throw err;
          console.log(result);
      });
      res.render("invoice",{title:"Payment Invoice",Total:TotalCost});
  })
  
  app.post("/", function (req, res) {
    res.redirect("/");
  });
  
  app.listen("5000", function () {
    console.log("Server started at 5000 port...");
  });
  
}

module.exports = initRoutes