import {newDiv} from './exports.js';
let pages;
let Loaded =[];
let LastPageLoaded;
let TotalLoaded = 0;
loadPage(1);

$.getJSON("js/page-count.json", function(data) {
    pages = parseInt(data);
    console.log("Total Pages: " + pages);
}) 

function loadPage(n){
    // AJAX content loading
    if (n in Loaded == false) {
        $.getJSON(`js/data-post-page-${n}.json`, function(data) {
            data.forEach(post => {
                newDiv(".posts",["post", "post-" + TotalLoaded]);
                $(".post-" + TotalLoaded).append(post);
                TotalLoaded++;
            });
            Loaded.push(n);
            LastPageLoaded = n;
            console.log("Page: " + n + " was loaded!");

            if (LastPageLoaded >= pages) {
                console.log("removing listener.."); window.removeEventListener("scroll", loadMore);
            }
        });
    }
}    

// Infinite content loading
window.addEventListener("scroll", loadMore);

function loadMore(){
    if($(window).scrollTop() >= $(document).height() - 50 -  $(window).height()) {
        loadPage(LastPageLoaded + 1);
    }
}