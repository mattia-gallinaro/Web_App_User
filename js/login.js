let email_box = null;
let paswd_box = null;
let btn_log = null;
$(document).ready(function() {
    btn_log = document.getElementById('subm_log');
    btn_log.addEventListener('click', login());
    email_box = document.getElementById('email_ut');
    paswd_box = document.getElementById('passwd_ut');
});


async function login(){
    const json = {email: email_box.value, password: passwd_box.value};
    const response = await fetch("http://localhost/food-api/API/user/login.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body  : JSON.stringify(json)
    }).then((response) =>{
        response.JSON();
    }).then((data)=> {return (data)});
    console.log(response);
}
