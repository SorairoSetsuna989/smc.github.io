var grid_items = $(".grid-item");
var caller = "";

for (let i = 1; i < 5; i++) { 
  $(grid_items[i]).click(event => { ShowText(i)}) }

function ShowText(_callerIndex) {
  if (caller != "") {
    $("#" + caller).hide();
  } 

  caller = "ot" + (_callerIndex + 5);
  $("#" + caller).show(); 
  document.getElementById(caller).scrollIntoView(); 
};

$(document).ready(event => {
  console.log(window.location.href);
  if (window.location.href.includes("#gd2")) {
      showPrograms();
  } else if (window.location.href.includes("#gd3")) {
      showInstruct();
  }
});