
$(document).ready(function(){
    var url =  window.location.href;
    console.log(url);
    getProducts(url).then((data)=> {
        console.log(data)});
})


async function getProducts(url){
    const id  = url.split('?id=')[1];
    console.log(id);
    const response = await fetch("http://localhost/food-api/API/tag/product-tag/getActiveProductsByTag.php?tag_id=" + id)
    .then((response)=> response.json())
    .then((data) => console.log(data));
    
    return data;
}