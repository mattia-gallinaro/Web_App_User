let content_parent = null;
let value_session = -1;
$(document).ready(function(){
    content_parent = document.getElementById('list');
    var url =  window.location.href;
    console.log(url);
    getProducts(url).then((data)=> {
        console.log(data);
        showProducts(data);
    });
})


async function getProducts(url){
    const id  = url.split('?id=')[1];
    console.log(id);
    const response = await fetch("http://localhost/food-api/API/tag/product-tag/getActiveProductsByTag.php?tag_id=" + id)
    .then((response)=> response.json())
    .then((data) => {
        console.log(data);
        console.log(data.length);return data});
    console.log(response);
    return response;
}

function showProducts(products){
    if(products.length  == 1){
        const element = document.createElement('div');
        element.innerHTML = 'Non ci sono prodotti';
    }
    else{
        for(var i = 0; i < products.length; i++){
            const element = document.createElement('div');
            element.setAttribute('class', 'product');
            element.setAttribute('value', products[i].id);
            content_parent.appendChild(element);
            const text = document.createElement('p');
            text.innerHTML = products[i].name + ' ' + products[i].price + ' ' + products[i].description;
            element.appendChild(text);
            if(value_session == -1){
                const btn_plus = document.createElement('button');
                btn_plus.innerHTML = '+';
                btn_plus.addEventListener('click', function(){
                    var value = parseInt(qnt.innerHTML);
                    if(value == 68){
                        window.location.replace('http://localhost/Web_App_User/pages/login.php');
                    }
                    value++;
                    console.log(value);
                    qnt.innerHTML = value.toString();
                    
                });
                element.appendChild(btn_plus);
                const qnt = document.createElement('div');
                qnt.innerHTML += 0;
                element.appendChild(qnt);
                const btn_less = document.createElement('button');
                btn_less.addEventListener('click', function(){
                    var value = parseInt(qnt.innerHTML);
                    if(value == 68){
                        window.location.replace('http://localhost/Web_App_User/pages/login.php');
                    }
                    if(value > 0 ){
                        value--;
                    }
                    console.log(value);
                    qnt.innerHTML = value.toString();
                })
                btn_less.innerHTML = '-';
                element.appendChild(btn_less);
                const order =  document.createElement('button');
                order.addEventListener('click', function(){
                    //console.log(qnt.innerHTML);
                    //console.log(element.getAttribute('value'));
                    //addProductCart(parseInt(qnt.textContent), element.getAttribute('value'));
                });
                order.innerHTML = 'ORDINA ORDINAA';
                element.appendChild(order);
            }
            //var this_el = document.getElementsByClassName('product');
            //var image = products[i].
            //this_el[length(this_el) - 1].appendChild();
        }
    }
}

function addProductCart(id, name){
    var response = fetch('https://localhost/food-api/API/cart/addCartItem.php', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify((id, name)),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      
}