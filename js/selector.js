const sections = $(".left-item");
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

function content(n) { return contents.eq(n); }