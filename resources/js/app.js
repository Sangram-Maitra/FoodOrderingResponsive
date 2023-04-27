import axios from 'axios'
import toastr from 'toastr'

let addToCart = document.querySelectorAll(".add-to-cart")
let noOfItems = document.querySelector("#noOfItems");

function updateCart(food){
    axios.post("/update-cart",food).then(function(res){
        // console.log(res);
        noOfItems.innerText = res.data.totalQty;
       
    })
}


addToCart.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        let food = JSON.parse(btn.dataset.food);
        // console.log(food)

        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": false,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "1000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "slideDown",
            "hideMethod": "slideUp"
            }
    
        toastr["success"]("Item added to cart", "Success")

        updateCart(food);

    })
})
