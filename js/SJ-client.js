// Global Variables
var posts = [];
var pages;
var itemNo = 0;
var postDat = [];

function generateID() {
    const newID = (Math.random() * 0xfff * 10000).toString(16).slice(0, 4);
    if (newID in posts) generateID();
    else {
        posts.push(newID);
        pages = Math.ceil(posts.length / 5);
        return newID
    }
}

function Post(author = "", authorPic = "", title="", synopsis=[], src="", id = generateID() ) {
    // Post html classes
    this.head = "head-" + this.id;
    this.body =  "body-" + this.id;
    this.footer =  "foot-" + this.id;

    // Properties
    this.id = id;
    this.src = src;
    this.author = author;
    this.authorPic = "img/authors/" + authorPic;
    this.title = title;
    this.synopsis = synopsis;

    this.postTemp = () => {
        newDiv(".posts", "post " + this.id);
        newDiv(`.${this.id}`,  "post-head head-"+ this.id).append(this.formatTitle());
        newDiv(`.${this.id}`, "post-body body-"+ this.id).append(this.formatBody());
        itemNo++;
    } 

    this.formatTitle = () => {
        const notes = { "img": "Image by", "iframe": "Edited by"}
        const note = this.synopsis[0] in notes ? notes[this.synopsis[0]]: "Written by"
        return Elem(this.authorPic, "img") + Elem(`${note}<br>`+ this.author, "p")
    }

    this.formatBody = () => {
        let c
        const contents = { "img": ["img", "clickable"], "iframe": ["iframe"], }
        if (this.synopsis[0] in contents) c = Elem(this.synopsis[1], ...contents[this.synopsis[0]])
        else c = Elem(this.synopsis[1], "p") + Elem("Read Full &#187 |||" + this.src,"a", "post-link");
        return Elem(this.title, "h4") + c
    }
    this.postTemp() // Object last line
}

function newDiv(parent, classes = "",txt = "") {
    let jQ = classes.split(" ");
    jQ.forEach((_class,i) => { if (_class.startsWith(".") == false) jQ[i] = `.${_class}` })
    $(parent).append(`<div class="${classes}">${txt}</div>`);
    // returns the newly created div parent as jQ object
    return $(`${parent} ${jQ.join()}`);
}

function Elem(txt="", tag = "p", c ="", src="", title="") {
    switch (tag) {
        case "img":
            return `<img src="${txt}" class="${c}">`;
        case "a":
            txt= txt.split("|||")
            return `<a href="${txt[1]}" target="_blank" class="${c}">${txt[0]}</a>`;
        case "iframe":
            return `<div class="container"><iframe src="${txt}" class="${c} allowFullScreen="true"></iframe></div>`;
        default:
            return `<${tag} class="${c}">${txt}</${tag}>`
    }
}

function post(e) {postDat.push(e); new Post(...e)}
function loadposts(){
    for (let pageNo = 1; pageNo < pages + 1; pageNo++) {
        $.getJSON(`js/${pageNo}-post.json`, _posts => { 
            _posts.forEach(_post => post(_post))
        })
    }
}

function UpdatePageCount() {
    $.getJSON("js/page-count.json", dat => {
        pages = parseInt(dat); loadposts() 
    });
}

UpdatePageCount()