let parent_cat = null;
$(document).ready(function() {
    console.log("Worka");
    parent_cat = document.getElementById('parent');
    callCategory();
});

function callCategory(){
    var req  = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(this.readyState == this.DONE){
            console.log(req.responseText);
            getCategory(req.responseText);
        }
    }
    req.open("GET", "http://localhost/food-api/API/tag/getArchiveTag.php");
    req.send();
}
function getCategory(response){
    var json_decoddate = JSON.parse(response);
    //console.log(json_decoddate[1].name);
    for(var i=0; i<json_decoddate.length; i++){
        var element = document.createElement("div");
        element.classList.add("category");
        element.setAttribute('value', json_decoddate[i].id);
        console.log(element.innerHTML);
        element.addEventListener("click", function(){
            window.location.reload();
        })
        element.textContent = json_decoddate[i].name;
        parent_cat.appendChild(element);
    }
    /*for(var i = 0; i < 4; i++){
        var element = document.createElement("div");
        element.classList.add("category");
        element.setAttribute('value', i);
        console.log(element.innerHTML);
        element.addEventListener("click", function(){

        })
        element.textContent = "Ciao ---------------------------->";
        parent_cat.appendChild(element);

    }*/
}