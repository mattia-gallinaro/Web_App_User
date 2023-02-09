let session = null;
let btn = null;
$(document).ready(function(){
    $.get('/php/getSessions.php', function(data){
        console.log(data);
        session = data;
    })
    if(session == null && document.URL != 'http://localhost/Web_App_User/pages/login.php') {
        //window.location.href = 'http://localhost/Web_App_User/pages/login.php';
    }

});

export function checkSession(session){
    $.get('/php/getSessions.php', function(data){
        console.log(data);
        session = data;
        return session;
    })
    if(session == null && document.URL != 'http://localhost/Web_App_User/pages/login.php') {
        return -1;
    }
}
