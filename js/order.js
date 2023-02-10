import { checkSession } from "./checkLogin.js";
let content = null;
let orders_archive = null;
let order_actives = null;
$(document).ready(function(){
    content = document.getElementById("content");
});

async function getOrders(){
    orders_archive = await fetch("http://localhost/food-api/API/orders/").then((response) => response.JSON()).then((data) => {return data;});
    order_actives = await fetch("http://localhost/food-api/API/orders").then((response) => response.JSON()).then((data) => {return data;});
}