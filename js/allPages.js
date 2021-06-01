window.onscroll = function() { stickNav(); showBackToTop(); };
createNavBar()
createMobileNav()
SetActive();

$("body").append('<button onclick="topFunction()" id="toTop" title="Back to Top"><i class="fa fa-2x fa-arrow-up"></i></button>');

//Get the button:
mybutton = document.getElementById("toTop");

function showBackToTop() { //Reveals back to top function when the user scrolls down a certain amount
  if (document.body.scrollTop > 250 || document.documentElement.scrollTop > 250) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop; // Get the offset position of the navbar
function stickNav() { // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
    $(".dropdown-content").css("position","fixed");
    //$(".left-grid").css("position", "fixed").css("bottom","20vh");
  } else {
    navbar.classList.remove("sticky");
    $(".dropdown-content").css("position","absolute");
    //$(".left-grid").css("position", "relative").css("bottom","auto");
  }
}

function createNavBar() {
  let SetLinks = [ //Navigation bar html code
    '<div class="nav-item" id="smc"><span>Stella </span><span style="font-family:magneto">Maris </span><span>College</span></div>',
    '<a class="nav-item main-link" href="https://sorairosetsuna989.github.io/smc/">Home</a>',
    '<div class="nav-item nav-dropdwn nav-drop1" title="See about overview"><a class="main-link" href="about.html">About Us <i class="fa fa-caret-down"></a></div>',
    '<div class="nav-item nav-dropdwn nav-drop2" title="See academic overview"><a class="main-link" href="academic.html">Academic <i class="fa fa-caret-down"></a></div>',
    '<a class="nav-item main-link" href="admissions.html">Admissions</a>',
    '<a class="nav-item main-link" href="community.html">Community</a>',
    '<a class="nav-item main-link" href="contact.html">Contact Us</a>'
  ];

  // Desktop Version
  AppendElements(SetLinks, "#navbar");
} 

function createMobileNav(){
  // Adds items for the mobile version using data based on the original nav bar
  $("#mobilenav").prepend('<div style="text-align:center; color: white; padding: 10px;"><span>Stella </span><span style="font-family: magneto ">Maris </span><span>College</span></div>');
  let MainLinks = $(".main-link");
  for (let i = 0; i < MainLinks.length; i++) { 
    $("#myLinks").append(`<a href="${MainLinks[i].href}">${MainLinks[i].text}</a>`);
  }
  $("#mobilenav").append('<a href="javascript:void(0);" class="icon" onclick="revealLinks()"><i class="fa fa-bars"></i></a>');
}

function SetActive() {
  let navItems = $(".nav-item");
  let links =  $("#myLinks a");
  let NavCodes = ['index','about','academic','admissions','community','contact'];
  NavCodes.forEach((item, i) => {
    if (window.location.pathname.includes(item)){
      AddActive(navItems[i + 1]);
      AddActive(links[i]);
    }
  })
}

function AddActive(element) { $(element).addClass("nav-active"); }

function revealLinks() {
  let menu = document.getElementById("myLinks");
  if (menu.style.display == "block") {
    menu.style.display = "none";
  } else menu.style.display = "block";
}

var AboutList = [
  "<a class='list-item' href='about_history.html'>History of Stella Maris</a>",
  "<a class='list-item' href='about_philo.html'>Philosophy of the School</a>",
  "<a class='list-item' href='about_objectives.html'>Objectives of the School</a>",
  "<a class='list-item' href='about_mvstatement.html'>Mission and Vision</a>",
  "<a class='list-item' href='about_officials.html'>Faculty & Staff</a>",
  "<a class='list-item' href='about_mottoseal.html'>Motto and Seal</a>"
];

var AcademicList = [
  "<a class='list-item' href='academic.html#gd2'>Programs Offered</a>",
  "<a class='list-item' href='academic.html#gd3'>Instructional Program</a>",
];

$(".nav-dropdwn").append('<div class="dropdown-content"></div>');
AppendElements(AcademicList, ".nav-drop2 .dropdown-content");
AppendElements(AboutList, ".nav-drop1 .dropdown-content");

function AppendElements(Collection, selector){
  Collection.forEach(item => { $(selector).append(item); });
}
