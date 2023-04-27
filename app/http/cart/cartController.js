function cartController(){
    return {
        index : function(req,res) {
            res.render("cart",{ title: "YAMMiTO" });
        },
        update: function(req,res){

            //// for the first time creating cart 
            // if the item is not present in the session
            if(!req.session.cart){
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            let cart = req.session.cart;

            // Taking the values from the db and from the Menu page
            if(!cart.items[req.body._id]){
                cart.items[req.body._id] ={
                    item:req.body,
                    qty:1,
                },
                cart.totalQty = cart.totalQty +1,
                cart.totalPrice = cart.totalPrice + req.body.price
            }
            else{
                cart.items[req.body._id].qty = cart.items[req.body._id].qty +1,
                cart.totalQty = cart.totalQty +1,
                cart.totalPrice = cart.totalPrice + req.body.price
            }
            // console.log("The Total Price for Checking is: ",cart.totalPrice)
            return res.json({totalQty:req.session.cart.totalQty})
        }
    }
}

module.exports = cartController