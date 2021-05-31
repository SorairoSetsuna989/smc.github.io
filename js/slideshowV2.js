var slides = $(".slider-inner img");
var CurrentSlide = 0;
var Timer;

// Spawning the dots
var dotelement = '<span class="dot"></span>';
for (let i = 0; i < slides.length; i++) { $("#dothandler").append(dotelement); }
var dots = $(".dot");
$(dots[0]).addClass("active-dot");

// Set Event handlers when the page is finish loading
$(document).ready(function () {

    // Modal Events
    $(".close").click(event =>  { $("#myModal").hide(); });
    $(".container").click(MaximizeImg);

    // Slideshow Events
    for (let i = 0; i < dots.length; i++) {
        const dot = $(dots[i]);
        dot.click(event => {
            event.stopPropagation();
            CurrentSlide = i;
            ChangeActive();
            ResetTimer();
        });   
    }

    $(".next").click(event =>{ event.stopPropagation(); NextSlide("manual"); });
    $(".prev").click(event =>{
        event.stopPropagation();
        CurrentSlide--;
        if (CurrentSlide < 0) CurrentSlide = slides.length - 1;
        ChangeActive();
        ResetTimer();
    });

    StartTimer();
  })

  function MaximizeImg(){
    $("#myModal").show();
    document.getElementById("ModalIMG").src = $('.active').attr("src");
  }

  function ChangeActive(slideIndex = CurrentSlide){
    $(".active").removeClass("active").css("z-index", -10);
    $(slides[slideIndex]).addClass("active").css("z-index", 10);
    highlightDot();
  }

  function highlightDot(){
    $(".active-dot").removeClass("active-dot");
    $(dots[CurrentSlide]).addClass("active-dot");
  }

function NextSlide(mode = "auto"){
    if (mode == "manual") ResetTimer();
    if (mode == "auto") StartTimer();
    CurrentSlide++;
    if (CurrentSlide > slides.length - 1) CurrentSlide = 0;
    ChangeActive();
}

function ResetTimer() { clearTimeout(Timer); StartTimer() }
function StartTimer() { Timer = setTimeout(NextSlide,5000); }