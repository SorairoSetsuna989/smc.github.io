var Sections = $(".left-item");
var Contents = $(".content");
var Selected = Sections[0];

// Highlight event handler
for (let i = 0; i < Sections.length; i++) {
    $(Sections[i]).click(event => { Highlight(i); });
};

// Default shown content
var RevealThese = content(1);
RevealThese.show();

function Highlight(Select){
    if (Selected != Sections[Select]) {
        $(Selected).removeClass("current");
        Selected = Sections[Select]
        $(Selected).addClass("current");
        let Targets = content(Select + 1);
        RevealThese.hide()
        RevealThese = $(Targets);
        RevealThese.show()
    };
};

function content(n) { return $(`.content-${n}`); }

/* const sections = $(".left-item");
const contents = $(".content");
var selected = sections[0];

// Highlight event handler
sections.each( (i, item) => $(item).click(() => Highlight(i) ))
// Default shown content
var RevealThese = content(0);
RevealThese.show();

function Highlight(sel){
    if (selected != sections[sel]) {
        $(selected).removeClass("current");
        selected = sections[sel]
        $(selected).addClass("current");
        let Targets = content(sel);
        RevealThese.hide()
        RevealThese = $(Targets);
        RevealThese.show()
    };
};

function content(n) { return contents.eq(n); } */