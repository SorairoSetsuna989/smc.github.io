
var d = document
$("body").append('<button onclick="topFunction()" id="toTop" title="Back to Top"><i class="fa fa-2x fa-arrow-up"></i></button>');

function showBackToTop() { //Reveals back to top function when the user scrolls down a certain amount
  d.getElementById("toTop").style.display = ((d.documentElement.scrollTop) > 250) ? "block":"none"
}

function topFunction() {
  d.body.scrollTop = d.documentElement.scrollTop = 0; // For Safari | For Chrome, Firefox, IE and Opera
}

var nav = d.getElementById("navbar");
const sticky = nav.offsetTop; // Get the offset position of the navbar
function stickNav() { // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
  $(".dropdown-content").css("position", (window.pageYOffset >= sticky) ? "fixed":"absolute");
  (window.pageYOffset >= sticky) ? nav.classList.add("sticky"): nav.classList.remove("sticky");
}

function createNavBar() {
  // Desktop version
  let SetLinks = [
    '<div class="nav-item" id="smc"><span>Stella </span><span style="font-family:magneto">Maris </span><span>College</span></div>',
    '<a class="nav-item main-link" href="../index.html">Home</a>',
    '<div class="nav-item nav-dropdwn nav-drop1" title="See about overview"><a class="main-link" href="about.html">About Us <i class="fa fa-caret-down"></a></div>',
    '<div class="nav-item nav-dropdwn nav-drop2" title="See academic overview"><a class="main-link" href="academic.html">Academic <i class="fa fa-caret-down"></a></div>',
    createLink("nav-item main-link","admissions.html", "Admissions"),
    createLink("nav-item main-link","community.html", "Community"),
    createLink("nav-item main-link","contact.html", "Contact Us")    
  ];

  $("#navbar").append(SetLinks)
}

function createMobileNav(){
  // Adds items for the mobile version using data based on the original nav bar
  $("#mobilenav").prepend('<div style="text-align:center; color: white; padding: 10px;"><span>Stella </span><span style="font-family: magneto ">Maris </span><span>College</span></div>');
  $(".main-link").each((i, elem) => $("#myLinks").append(`<a href="${elem.href}">${elem.text}</a>`))
  $("#mobilenav").append('<a href="javascript:void(0);" class="icon" onclick="revealLinks()"><i class="fa fa-bars"></i></a>');
}

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
  const menu = d.getElementById("myLinks").style;
  menu.display = menu.display == "block" ? "none":"block"
}

const aboutList = [
  ["about_history.html","History of Stella Maris College"],
  ["about_philo.html","Philosophy of the School"],
  ["about_objectives.html","Objectives of the School"],
  ["about_mvstatement.html","Mission & Vision"],
  ["about_officials.html","Faculty & Staff"],
  ["about_mottoseal.html","Motto & Seal"]
]

const academicList = [
  ["academic.html#gd1","Programs Offered"],
  ["academic.html#gd2","Instructional Program"]
]

$(".nav-dropdwn").append('<div class="dropdown-content"></div>');
aboutList.forEach( i =>  $(".nav-dropdwn:first .dropdown-content").append(createLink("list-item", ...i)))
academicList.forEach( i =>  $(".nav-dropdwn:last .dropdown-content").append(createLink("list-item", ...i)))
function createLink(c, h, t) {return `<a class="${c}" href="${h}">${t}</a>`}

window.onscroll = function() { stickNav(); showBackToTop(); }
createNavBar()
createMobileNav()
setActive()