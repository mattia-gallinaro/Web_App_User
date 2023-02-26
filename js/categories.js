//import { checkSession } from "./checkLogin";
let parent_cat = null;
let btn_cart = null;
let cart_user = null;
let value_session = 1;
$(document).ready(function () {
  console.log("Worka");
  parent_cat = document.getElementById("content");
  btn_cart = document.getElementById("cart");
  value_session = checkSession();
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

function getImageUrl(cat) {
  //let url = null;
  //console.log(cat);
  switch (cat) {
    case "3":
      return "/Web_App_User/images/piadina.jpg";
      break;
    case "2":
      return "/Web_App_User/images/CocaLatt.jpg";
      break;
    case "1":
      return "/Web_App_User/images/panino.jpg";
      break;
    case "5":
      return "/Web_App_User/images/snack.jpg";
      break;
    case "4":
      return "/Web_App_User/images/brioches.jpg";
      break;

    default:
      return "";
  }
  //console.log(url);
  //return url;
}

function showProducts(products) {
  const element = document.createElement("div");
  element.classList.add("all-products");
  parent_cat.appendChild(element);
  console.log(products);
  var url = getImageUrl(products[0].tag);
  //console.log(url);
  for (var i = 0; i < products.length; i++) {
    var just_one = document.createElement("div");
    just_one.classList.add("product");
    just_one.innerHTML =
      "<img src=" +
      url +
      '><div class="product-info"><h4 class="product-title">' +
      products[i].name +
      '</h4><p class="product-price">€' +
      products[i].price +
      '</p><button class="btn_quantity" value="' +
      products[i].id +
      '" onclick="addQuantity(' +
      products[i].id +
      ')">+</button><a id="' +
      products[i].id +
      '">0</a><button class="btn_quantity" onclick="removeQuantity(' +
      products[i].id +
      ')">-</button><button class="product-btn" onclick="addSingleProductToCart(' +
      products[i].id +
      ')">Buy Now</button></div>';
    element.appendChild(just_one);
  }
}

function addQuantity(id) {
  var element = document.getElementById(id);
  var value = parseInt(element.textContent);
  value++;
  //console.log(value);
  element.textContent = value.toString();
}

function removeQuantity(id) {
  var element = document.getElementById(id);
  var value = parseInt(element.textContent);
  if (value > 0) {
    value--;
  }
  //console.log(value);
  element.textContent = value.toString();
}

function addSingleProductToCart(id) {
  var element = document.getElementById(id);
  if (parseInt(element.textContent) != 0) {
    addProductCart(value_session, id, parseInt(element.textContent));
  }
}

async function showCart() {
  parent_cat.innerHTML = null;
  var response = await fetch(
    "http://localhost/food-api/API/cart/getCart.php?user=" + value_session
  )
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
  return response;
}

/*<button class="product-btn" onclick="orderProduct(' +
            response[i].product +
            ')">Buy Now</button>
*/
function showCartUser() {
  var price = null;
  if (value_session == null || value_session < 0) {
    showLoginForm();
  } else {
    var cart = showCart().then((response) => {
      {
        const element = document.createElement("div");
        element.classList.add("all-products");
        parent_cat.appendChild(element);
        console.log(response);
        for (var i = 0; i < response.length; i++) {
          var url = getImageUrl(response[i].tag_id);
          var just_one = document.createElement("div");
          just_one.classList.add("product");
          just_one.innerHTML =
            "<img src=" +
            url +
            '><div class="product-info"><h4 class="product-title">' +
            response[i].name +
            '</h4><p class="product-price">€' +
            response[i].price +
            '</p><button class="btn_quantity" value="' +
            response[i].product +
            '" onclick="addQuantity(' +
            response[i].product +
            ')">+</button><a id="' +
            response[i].product +
            '">' +
            response[i].quantity +
            '</a><button class="btn_quantity" onclick="removeQuantity(' +
            response[i].product +
            ')">-</button></div>';
          element.appendChild(just_one);
          //console.log(response[i].price);
          price += parseInt(response[i].price) * parseInt(response[i].quantity);
        }
        showCartPriceFooter(price);
      }
    });
  }
}

function showCartPriceFooter(price) {
  const element = document.createElement("footer");
  element.classList.add("sticky_bot");
  const button = document.createElement("button");
  button.textContent = 'order';
  button.addEventListener("click", orderCartUser());
  var text_cart = document.createElement("div");
  text_cart.innerHTML = '<p>€' +price.toString();+'</p>';
  //element.innerHTML = '<button onclick="orderCartUser()>' + price + "</button>";
  parent_cat.appendChild(element);
  element.appendChild(text_cart);
  element.appendChild(button);
}

function orderCartUser() {
  //const element
}

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

function checkUserLogin() {
  parent_cat.innerHTML = null;
  if (value_session != null || value_session > 0) {
    showCardUser();
  } else {
    showLoginForm();
  }
}

function showTest() {
  console.log("REEEEEEEEEE");
}

function showLoginForm() {
    parent_cat.innerHTML = null;
    const form = document.createElement("div");
    form.innerHTML =
      '<div class="form"><h1>Login</h1><input id="email" type="email" class="user" placeholder="Username"/><input id="password" type="password" class="pass"placeholder="Password"/><button class="login" onclick="login()">Login</button></div>';
    parent_cat.appendChild(form);
}

async function login() {
  const email_input = document.getElementById("email");
  const password_input = document.getElementById("password");
  //console.log(email_input.value);
  //console.log(password_input.value);
  console.log(checkSession());
  const json = { email: email_input.value, password: password_input.value };
  const response = await fetch("http://localhost/food-api/API/user/login.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(json),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.response == true) {
        saveSession(data.userID);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function checkSession() {
  if (localStorage.getItem("user_id") == null) {
    return -1;
  } else {
    return localStorage.getItem("user_id");
  }
}

function saveSession(id){
    localStorage.setItem("user_id", id);
    value_session = localStorage.getItem("user_id");
}


function showRegistrationForm(){

}

function showCardUser() {
  var result = getInformation().then((user) => {
    console.log(user);
    var response = user.map(valueret());
    console.log(response);
    const element = document.createElement("div");
    element.classList.add('card');
    element.innerHTML = '<h1>'+user.name+ user.surname+'</h1><p class="title"></p><p></p><div style="margin: 24px 0;"><a href="#"><i class="fa fa-dribbble"></i></a><a href="#"><i class="fa fa-twitter"></i></a><a href="#"><i class="fa fa-linkedin"></i></a><a href="#"><i class="fa fa-facebook"></i></a></div><p><button class="button-card">Logout</button></p>';
    parent_cat.appendChild(element);
  });
}

function valueret(val){
  return val;
}

async function getInformation(){
  var response = await fetch('http://localhost/food-api/API/user/getUser.php?id=' + value_session)
  .then((response) => response.json())
  .then((data) => {return (data)});
  return response;
}
//function 
