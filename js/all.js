// Data
const d = document
var nav = d.getElementById("navbar");

function adap(){
  let hh = $("#header-img").height();
  if (hh == 0) hh = 296; // Set hh as the original image height.
  $("#header-div").css("height", hh)
}
var sticky = nav.offsetTop; // Get the offset position of the navbar

function setActive() {
  const navCodes = ['home','about','academic','admissions','community','contact']
  navCodes.forEach((item, i) => {
    if ($("title").text().toLowerCase().includes(item)) { 
      $(".nav-item").eq([i + 1]).addClass("nav-active")
      $("#myLinks a").eq([i]).addClass("nav-active")
    }
  })
}

function revealLinks() {
  // Shows or hides the mobile navbar links
  const menu = d.getElementById("myLinks").style
  menu.display = menu.display == "block" ? "none":"block"
}

function link(c, h, t) {return `<a class="${c}" href="${h}">${t}</a>`}

function toTop(){
  d.body.scrollTop = d.documentElement.scrollTop = 0;
}
window.onload = () => {
  /// Scrolling
  window.onscroll = function() { 
    // Reveals back to top button after scrolling down a certain distance.
    $("#toTop").css("display", ((d.documentElement.scrollTop) > 250) ? "block":"none")

    // Moves the navbar until it sticks the top.
    $(".dropdown-content").css("position", (window.pageYOffset > sticky) ? "fixed":"absolute");
    (window.pageYOffset > sticky) ? nav.classList.add("sticky"): nav.classList.remove("sticky");
  }

  // Mobile navbar based on the desktop ver
  $(".main-link").each((i, elem) => $("#myLinks").append(`<a href="${elem.href}">${elem.text}</a>`))

  adap()
  window.onresize = adap;
  setActive()

  // Removes loading screen and restores scrolling after page load.
  setTimeout( () => { 
    document.body.style.overflow = "auto"
    $("#l").remove();
}, 300)
}