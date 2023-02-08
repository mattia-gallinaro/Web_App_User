let form_log = null;
let email_box = null;
let paswd_box = null;
$(document).ready(function() {
    form_log = document.getElementById('name');
    email_box = document.getElementById('email');
    paswd_box = document.getElementById('password');
});


async function login(){
    const json =  "{ id : " + email_box.textContent + ", password : " + paswd_box.textContent +"}";
    const response = await fetch("http://localhost/food-api/API/user/login.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body  : JSON.stringify(json)
    }).then((response) =>{
        response.JSON();
    }).then((data)=> console.log(data));
}