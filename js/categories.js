let parent_cat = null;
$(document).ready(function() {
    console.log("Worka");
    parent_cat = document.getElementById('content');
    callCategory();
});

function callCategory(){
    var req  = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(this.readyState == this.DONE){
            //console.log(req.responseText);
            getCategory(req.responseText);
        }
    }
    req.open("GET", "http://localhost/food-api/API/tag/getArchiveTag.php");
    req.send();
}

function goToProductlist(event){
    const id = event.target.getAttribute("value");
    console.log("Product list" + id);
    window.location.replace("http://localhost/Web_App_User/pages/list.php?id=" + id);
}

function getCategory(response){
    var json_decoddate = JSON.parse(response);
    console.log(json_decoddate);
    //console.log(json_decoddate[1].name);
    for(var i=0; i < json_decoddate.length; i++){
        const element = document.createElement("div");
        element.classList.add("categorybox");
        element.setAttribute('value', json_decoddate[i].id);
        //console.log(element.innerHTML);
        element.addEventListener("click", goToProductlist);
        element.textContent = json_decoddate[i].name;
        //console.log(element);
        //console.log(parent_cat);
        parent_cat.appendChild(element);
    }
}