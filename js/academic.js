$(".grid-container-1").hide();
$(".grid-container-2").hide();

$(".grid-item-a").click(showPrograms);
$(".grid-item-b").click(showInstruct);
function showPrograms(){
    $(".grid-container-1").show()
    Highlight('.grid-item-a')
    $(".grid-container-2").hide();
    ChangeFocus("gd1")
}

function showInstruct() {
    $(".grid-container-2").show();
    Highlight('.grid-item-b')
    $(".grid-container-1").hide();
    ChangeFocus("gd2")
}

function ChangeFocus(id) {
    document.getElementById(id).scrollIntoView(
        {behavior: "smooth", block: "center"}
    );
}

$(document).ready(event => {
    if (window.matchMedia('(max-width: 700px)').matches) {
        showPrograms();
    } else {
        if (window.location.href.includes("#gd2")) {
            showPrograms();
        } else if (window.location.href.includes("#gd3")) {
            showInstruct();
        }
    }

});

let select;
function Highlight(element){
    if (select != undefined) {
        $(select).css("background-color", "#25245D").css("color", "white");
    }
    select = element;
    $(select).css("background-color", "lightblue").css("color", "#25245D");
}