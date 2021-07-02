var timer;
var current = 0;
const slides = $(".slider-inner img")
const max = slides.length - 1
const dotElem = '<span class="dot"></span>';
slides.each(() => $("#dothandler").append(dotElem))
const dots = $(".dot")
dots.eq(0).addClass("active-dot");

function changeActive(i = current){
  $(".active").removeClass("active").css("z-index", -5);
  slides.eq(i).addClass("active").css("z-index", 5);
  highlightDot()
}

function highlightDot(){
  $(".active-dot").removeClass("active-dot");
  dots.eq(current).addClass("active-dot")
}

function NextSlide(auto = true){
  auto ? startTime(): resetTime()
  current++;
  if (current > max) current = 0;
  changeActive()
}

function resetTime() { clearTimeout(timer); startTime()}
function startTime() { timer = setTimeout(NextSlide,5000)}

// Set Event handlers when the page is finish loading
$(document).ready( () => {

  // Modal Events
  $(".close").click(() => $("#myModal").hide());
  $(".container").click( () => {
    //Maximize pic
    $("#myModal").show();
    document.getElementById("ModalIMG").src = $('.active').attr("src");
  });

  // Slideshow Events
  dots.each((i, dot) => {
    $(dot).click(e => {
      e.stopPropagation();
      current = i;
      changeActive();
      resetTime()
    });   
  })

  $(".next").click(e => { e.stopPropagation(); NextSlide(false) });
  $(".prev").click(e => {
      e.stopPropagation();
      current--;
      if (current < 0) current = max;
      changeActive();
      resetTime()
  });

  startTime();
})