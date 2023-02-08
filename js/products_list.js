let content_parent = null;
$(document).ready(function(){
    content_parent = document.getElementById('list');
    var url =  window.location.href;
    console.log(url);
    getProducts(url).then((data)=> {
        showProducts(data);
        console.log(data)});
})


async function getProducts(url){
    const id  = url.split('?id=')[1];
    console.log(id);
    const response = await fetch("http://localhost/food-api/API/tag/product-tag/getActiveProductsByTag.php?tag_id=" + id)
    .then((response)=> response.json())
    .then((data) => {return data});
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
            element.innerHTML = products[i].name + ' ' + products[i].price + ' ' + products[i].description;
            content_parent.appendChild(element);
        }
    }
}