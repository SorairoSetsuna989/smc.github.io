// Data
const d = document
const nav = d.getElementById("navbar");
const sticky = nav.offsetTop; // Get the offset position of the navbar
const navCls = "nav-item main-link"
const navCodes = ['home','about','academic','admissions','community','contact']

const navLinks = [
  '<div class="nav-item" id="smc"><span>Stella</span><span style="font-family:magneto">Maris </span><span>College</span></div>',
  link(navCls,"../index.html", "Home"),
  `<div class="nav-item nav-dropdwn nav-drop1" title="See about overview">${link("main-link","about.html", "About Us <i class='fa fa-caret-down'>")}</div>`,
  `<div class="nav-item nav-dropdwn nav-drop2" title="See academic overview">${link("main-link","academic.html",'Academic <i class="fa fa-caret-down">')}</div>`,
  link(navCls,"admissions.html", "Admissions"),
  link(navCls,"community.html", "Community"),
  link(navCls,"contact.html", "Contact Us")    
];

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


function showBackToTop() { 
  // Reveals back to top button when the user scrolls down a certain amount.
  $("#toTop").css("display",  ((d.documentElement.scrollTop) > 250) ? "block":"none")
}

function stickNav() { 
  // Moves the navbar to the top until it sticks the top.
  $(".dropdown-content").css("position", (window.pageYOffset >= sticky) ? "fixed":"absolute");
  (window.pageYOffset >= sticky) ? nav.classList.add("sticky"): nav.classList.remove("sticky");
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
  const menu = d.getElementById("myLinks").style
  menu.display = menu.display == "block" ? "none":"block"
}

function link(c, h, t) {return `<a class="${c}" href="${h}">${t}</a>`}

$(d).ready( () => {

  /// Scrolling
  window.onscroll = function() { stickNav(); showBackToTop(); }
  $("body").append(`<button onclick="() => d.body.scrollTop = d.documentElement.scrollTop = 0;" id="toTop" title="Back to Top"><i class="fa fa-2x fa-arrow-up"></i></button>`);

  /// Navigation bar
  $("#navbar").append(navLinks) // Desktop version

  // Adds items for the mobile version using data based on the original nav bar
  $("#mobilenav").prepend('<div style="text-align:center; color: white; padding: 10px;"><span>Stella </span><span style="font-family: magneto ">Maris </span><span>College</span></div>');
  $(".main-link").each((i, elem) => $("#myLinks").append(`<a href="${elem.href}">${elem.text}</a>`))
  $("#mobilenav").append('<a href="javascript:void(0);" class="icon" onclick="revealLinks()"><i class="fa fa-bars"></i></a>');

  // Dropdown content of nav bar
  $(".nav-dropdwn").append('<div class="dropdown-content"></div>');
  aboutList.forEach( i =>  $(".nav-dropdwn:first .dropdown-content").append(link("list-item", ...i)))
  academicList.forEach( i =>  $(".nav-dropdwn:last .dropdown-content").append(link("list-item", ...i)))
  setActive()
})