import {checkSession} from './checkLogin.js';
let content = null;
$(document).ready(function(){
    content = document.getElementById('content');

})

async function getCartItems(){
    const result = checkSession();
    if(result == -1){
        window.location.href = 'http://localhost/Web_App_User/pages/login.php';
    }
    const response = await fetch('http://localhost/food-api/API/cart/getCart.php?user=' + result)
    .then((data) => data.json())
    .then((items) => {return items});

    console.log(response);

}