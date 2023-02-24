let parent_cat = null;
let btn_cart = null;
let value_session = 1;
$(document).ready(function () {
  console.log("Worka");
  parent_cat = document.getElementById("content");
  btn_cart = document.getElementById("cart");
  btn_cart.addEventListener("click", showCart());
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

function showProducts(products) {
  if (products.length == 1) {
    const element = document.createElement("div");
    element.innerHTML = "Non ci sono prodotti";
  } else {
    for (var i = 0; i < products.length; i++) {
      const element = document.createElement("div");
      element.setAttribute("class", "product");
      element.setAttribute("value", products[i].id);
      parent_cat.appendChild(element);
      const text = document.createElement("p");
      text.innerHTML =
        products[i].name +
        " " +
        products[i].price +
        " " +
        products[i].description;
      element.appendChild(text);
      if (value_session == 1) {
        const btn_plus = document.createElement("button");
        btn_plus.innerHTML = "+";
        btn_plus.addEventListener("click", function () {
          var value = parseInt(qnt.innerHTML);
          value++;
          console.log(value);
          qnt.innerHTML = value.toString();
        });
        element.appendChild(btn_plus);
        const qnt = document.createElement("div");
        qnt.innerHTML += 0;
        element.appendChild(qnt);
        const btn_less = document.createElement("button");
        btn_less.addEventListener("click", function () {
          var value = parseInt(qnt.innerHTML);
          if (value > 0) {
            value--;
          }
          console.log(value);
          qnt.innerHTML = value.toString();
        });
        btn_less.innerHTML = "-";
        element.appendChild(btn_less);
        const order = document.createElement("button");
        order.addEventListener("click", function () {
          if (parseInt(qnt.textContent) != 0) {
            addProductCart(
              value_session,
              element.getAttribute("value"),
              parseInt(qnt.textContent)
            );
          }
          //showCart();
        });
        order.innerHTML = "ORDINA ORDINAA";
        element.appendChild(order);
      }
    }
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

function showLoginForm() {}

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
