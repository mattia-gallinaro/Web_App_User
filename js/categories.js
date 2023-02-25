let parent_cat = null;
let btn_cart = null;
let value_session = 1;
$(document).ready(function () {
  console.log("Worka");
  parent_cat = document.getElementById("content");
  btn_cart = document.getElementById("cart");
  //btn_cart.addEventListener("click", showCart());
  callCategory();
  //showCart();
});

function callCategory() {
  var req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (this.readyState == this.DONE) {
      //console.log(req.responseText);
      getCategory(req.responseText);
    }
  };
  req.open("GET", "http://localhost/food-api/API/tag/getArchiveTag.php");
  req.send();
}

function goToProductlist(event) {
  //const id = event.target.getAttribute("value");
  //console.log("Product list" + id);
  //window.location.replace("http://localhost/Web_App_User/pages/list.php?id=" + id);
  const id = event.target.getAttribute("value");
  console.log(id);
  parent_cat.innerHTML = null;
  getProducts(id).then((products) => showProducts(products));
}

function getCategory(response) {
  var json_decoddate = JSON.parse(response);
  console.log(json_decoddate);
  //console.log(json_decoddate[1].name);
  for (var i = 0; i < json_decoddate.length; i++) {
    const element = document.createElement("div");
    element.classList.add("categorybox");
    element.setAttribute("value", json_decoddate[i].id);
    //console.log(element.innerHTML);
    element.addEventListener("click", goToProductlist);
    element.textContent = json_decoddate[i].name;
    //console.log(element);
    //console.log(parent_cat);
    parent_cat.appendChild(element);
  }
}

async function getProducts(id) {
  //const id = url.split("?id=")[1];
  //console.log(id);
  const response = await fetch(
    "http://localhost/food-api/API/tag/product-tag/getActiveProductsByTag.php?tag_id=" +
      id
  )
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      //console.log(data.length);
      return data;
    });
  //console.log(response);
  return response;
}

function getImageUrl(cat){
  //let url = null;
  console.log(cat);
  switch(cat) {
    case '3':
      return "/Web_App_User/images/piadina.jpg";
      break;
    case '2':
      return "/Web_App_User/images/CocaLatt.jpg";
      break; 
    case '1':
      return "/Web_App_User/images/panino.jpg";
      break; 
    case '5':
      return "/Web_App_User/images/snack.jpg";
      break; 
    case '4':
      return "/Web_App_User/images/brioches.jpg";
      break;
      
    default:
      return "";
    }
    //console.log(url);
    //return url;
}

function showProducts(products){
  const element = document.createElement("div");
  element.classList.add("all-products");
  parent_cat.appendChild(element);
  console.log(products);
  var url = getImageUrl(products[0].tag);
  //console.log(url);
  for(var i = 0; i < products.length; i++) {
    var just_one  = document.createElement("div");
    just_one.classList.add('product');
    just_one.innerHTML = '<img src='+url +'><div class="product-info"><h4 class="product-title">'+ products[i].name+'</h4><p class="product-price">€2.00</p><button class="btn_quantity" value="'+ products[i].id +'" onclick="addQuantity('+ products[i].id +')">+</button><a id="'+ products[i].id +'">0</a><button class="btn_quantity" onclick="removeQuantity('+ products[i].id +')">-</button><button class="product-btn" onclick="orderProduct('+products[i].id+')">Buy Now</button></div>';
    element.appendChild(just_one);
  }
}


function addQuantity(id){
  var element = document.getElementById(id);
  var value = parseInt(element.textContent);
  value++;
  //console.log(value);
  element.textContent = value.toString();
}

function removeQuantity(id){
  var element = document.getElementById(id);
  var value = parseInt(element.textContent);
  if(value > 0){
    value--;
  }
  //console.log(value);
  element.textContent = value.toString();
}

function orderProduct(id){
  var element = document.getElementById(id);
  if(parseInt(element.textContent) != 0){
    addProductCart(value_session, id, parseInt(element.textContent));
  }
}

// method: 'POST',
//          headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify((id, name)
function addProductCart(user, prod, quantity) {
  let json_body = {
    user: user,
    prod: prod,
    quantity: quantity,
  };

  var response = fetch(
    "http://localhost/food-api/API/cart/addProductCart.php",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json_body),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

async function getOrders() {
  let response = await fetch(
    "http://localhost/food-api/API/order/getActiveOrderByUser.php?id_user=" +
      value_session
  )
    .then((data) => data.json())
    .then((response) => {
      console.log(response);
      showOrders(response);
    });
}

function showOrders(orders) {
  parent_cat.innerHTML = null;
  console.log(orders);
  orders.map(function (orders) {
    console.log(orders.costo);
    const element = document.createElement("div");
    element.textContent = orders.time + orders.name + orders.costo;
    parent_cat.appendChild(element);
  });
}

function showLogin() {
  parent_cat.innerHTML = null;
  if (value_session != null || value_session > 0) {
    showCardUser();
  } else {
  }
}

function showLoginForm() {
  
}

function showRegistrationForm() {}

function showCardUser() {
  const element = document.createElement("div");
  element.innerHTML = "i wanna die";
  parent_cat.appendChild(element);
}

function showCart() {
  parent_cat.innerHTML = null;
  var response = fetch(
    "http://localhost/food-api/API/cart/getCart.php?user=" + 1
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.map(function (data) {
        console.log(data.description);
        const element = document.createElement("div");
        element.textContent = data.description;
        parent_cat.appendChild(element);
      });
      //console.log('Success:', data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
