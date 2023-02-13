import { checkSession } from "./checkLogin.js";
let content = null;
let orders_archive = null;
let order_actives = null;


$(document).ready(function(){
    content =  $('#content').DataTable();
    //var result = checkSession();
    //getOrders(result).then(showOrders(data));
});

async function getOrders(id){
    orders_archive = await fetch("http://localhost/food-api/API/order/getArchiveOrderByUser.php?id_user=" + id).then((response) => response.JSON()).then((data) => {return data;});
    //order_actives = await fetch("http://localhost/food-api/API/orders").then((response) => response.JSON()).then((data) => {return data;});
}

function showOrders(orders){
    for(var i = 0; i < orders.length; i++){
        content.rows.add([i + '.1', i + '.2', i + '.3', i + '.4', i + '.5']).draw(false);
    }
}