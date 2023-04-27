const User = require("../../models/user")
const Menu = require("../../models/menu")


function homeController(){
    return {
        index : function(req,res) {
            res.render("homeFinal",{ title: "YAMMiTO" });
        },
        menu: function(req,res){
            // if(req.isAuthenticated()){
                // this function always giving result as false
                Menu.find().then(function(foodsFromDB){
                    res.render("menu",{title:"HOME PAGE",foods:foodsFromDB, SearchFailure: req.flash('server-error')})
                })
            // }
            // else{
            //     res.redirect("/signUp")
            // }
        }
    }
}

module.exports = homeController