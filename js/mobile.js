var Grids = document.getElementsByClassName('grid-item');
var SiteLayout = "pc";

$(window).ready(event => { CheckWidth()});
window.onresize = CheckWidth;

function CheckWidth() {
    if (window.innerWidth >= 900) {
        if (SiteLayout != "pc") {
            SwitchToPC()
        }
    } else if (window.innerWidth <= 900) { 
        if( SiteLayout != "mobile") {
            SwitchToMobile()
        }
    }
}

function SwitchToMobile() {
    SiteLayout = "mobile"
/*     $(".fa-2x").removeClass("fa-2x");
 *//*     console.log("switching to mobile mode");    
    for (let i = 0; i < Grids.length; i++) {
        console.log(Grids[i]);
        Grids[i].classList.remove("grid-item"); //, "grid-item-" + i
        Grids[i].classList.add("mobile-grid");//, "mobile-grid-" + i);
   } */


}

function SwitchToPC() {
    SiteLayout = "pc"
/*     $(".fa-arrow-up").addClass("fa-2x");
 *//*     for (let i = 0; i < Grids.length; i++) {
        console.log(Grids[i]);
        Grids[i].classList.remove("mobile-grid");//, "mobile-grid-" + i); 
        Grids[i].classList.add("grid-item");//, "grid-item-" + i);
    }
    console.log("switching to pc mode"); */
}