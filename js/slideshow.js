var timer;
var currentSlide = 0;
var slides = $(".slider-inner img")
var slideCount = slides.length - 1
// Spawning the dots
var dotElem = '<span class="dot"></span>';
slides.each( () => $("#dothandler").append(dotElem))
$(".dot").eq(0).addClass("active-dot");

// Set Event handlers when the page is finish loading
$(document).ready( () => {

    // Modal Events
    $(".close").click(() =>$("#myModal").hide());
    $(".container").click( () => {
      //Maximize pic
      $("#myModal").show();
        document.getElementById("ModalIMG").src = $('.active').attr("src");
      });

    // Slideshow Events
    $(".dot").each((i, dot) => {
      $(dot).click(e => {
        e.stopPropagation();
        currentSlide = i;
        ChangeActive();
        ResetTimer()
      });   
    })

    $(".next").click(e => { e.stopPropagation(); NextSlide(false) });
    $(".prev").click(e => {
        e.stopPropagation();
        currentSlide--;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        ChangeActive();
        ResetTimer()
    });

    StartTimer();
})

function ChangeActive(i = currentSlide){
  $(".active").removeClass("active").css("z-index", -5);
  slides.eq(i).addClass("active").css("z-index", 5);
  highlightDot()
}

function highlightDot(){
  $(".active-dot").removeClass("active-dot");
  $(".dot").eq(currentSlide).addClass("active-dot")
}

function NextSlide(auto = true){
  auto ? StartTimer(): ResetTimer()
  currentSlide++;
  if (currentSlide > slideCount) currentSlide = 0;
  ChangeActive()
}

function ResetTimer() { clearTimeout(timer); StartTimer()}
function StartTimer() { timer = setTimeout(NextSlide,5000)}