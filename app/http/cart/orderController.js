const User = require("../../models/user")
const Menu = require("../../models/menu")
const Order = require("../../models/order")


function orderController(){
    return {
        store:function(req,res){
            const myObj=req.session.myObj;
            // console.log(myObj._id);
            const order= new Order({
                customerId: req.session.myObj._id,
                items: req.session.cart.items,
                phone: req.session.myObj.phonenumber,
                address: req.session.myObj.address,
                price: req.session.cart.totalPrice
            })
            order.save().then(result=>{
                req.flash('success',"Payment    ")
                // console.log("The Order phonenumber is: ",order.phone)
                // return res.render('customers/orders',{title:"Order Page",orde})
                return res.redirect('customers/order')
            }).catch(err=>{
                console.log(err)
                req.flash('error',"Something went wrong")
                return res.redirect('/cart')
            })
        },
        index:function(req,res){
            cid=req.session.myObj._id;
            Order.find({customerId:cid}).then((foundUser)=>{
                if(foundUser){
                    console.log(foundUser)
                    return res.render("customers/orders",{title:"Order Page",orders:foundUser})   
                }
            })
        }
    }
}


module.exports = orderController
