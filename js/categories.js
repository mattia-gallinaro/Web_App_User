let parent_cat = null;
$(document).ready(function() {
    console.log("Worka");
    parent_cat = document.getElementById('parent');
    callCategory();
});

function callCategory(){
    var req  = new XMLHttpRequest();
    req.open('GET', "http://localhost/food-api/API/tag/getArchiveTag.php", false);
    req.send();
    console.log(req.responseText);
    getCategory();
}
function getCategory(){
    for(var i = 0; i < 4; i++){
        var element = document.createElement("div");
        element.classList.add("category");
        element.setAttribute('value', i);
        console.log(element.innerHTML);
        element.addEventListener("click", function(){

        })
        element.textContent = "Ciao ---------------------------->";
        parent_cat.appendChild(element);

    }
}