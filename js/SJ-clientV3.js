import { newDiv } from './exports.js';
// Global Variables
var Posts = [];
var Pages;
var itemNo = 0;
var PostData = [];

/* function PostCreationDate() {
    return `${Today.getFullYear()}-${Today.getMonth()}-${Today.getDate()}-${Today.getHours()}-${Today.getMinutes()}-${Today.getSeconds()}`;
} */

function PageCeil(){ return Math.ceil(Posts.length / 5); }

function generateID() {
    let newID = (Math.random() * 0xfffff * 1000000).toString(16);
    newID = /* "." +  */newID.slice(0, 6);
    Posts.forEach(post => { if (post == newID) { generateID(); } });
    Posts.push(newID);
    Pages = PageCeil();
    return newID;
};

function Post(author = "", authorPic = "", title="", synopsis=[], source="", id = generateID() ) { //date = PostCreationDate()
    // Post html classes
    this.head = "head-" + this.id;
    this.body =  "body-" + this.id;
    this.footer =  "foot-" + this.id;
    this.jQ = "." + this.body;

    // Post properties
    this.id = id;
    this.source = source;
    /* this.creationDate = date; */
    this.author = author;
    this.authorPic = "img/authors/" + authorPic;
    this.title = title;
    this.synopsis = synopsis;

    this.postTemp = function(){
        newDiv(".posts", "post " + this.id);
        let jQ = this.id.split(" ");
        jQ.forEach((c , i) => { jQ[i] = "." + c; });
        jQ = jQ.join();
        newDiv(jQ,  "post-head head-"+ this.id).append(this.formatTitle());
        newDiv(jQ, "post-body body-"+ this.id).append(this.formatBody());
        itemNo++;
    } 

    this.formatTitle = function(){
        let note;
        switch (this.synopsis[0]) {
            case "img":
                note = "Image by";
                break;
            case "iframe":
                note = "Edited by";
                break;
            default:
                note = "Written by";
                break;
            }
        return Elem(this.authorPic, "img") + Elem(`${note}<br>`+ this.author, "p");

    }

    this.formatBody =  function(){
        let HTML = Elem(this.title, "h4");
        switch (this.synopsis[0]) {
            case "img":
                return HTML + Elem(this.synopsis[1], "img", "clickable");
                break;

            case "iframe":
                return HTML + Elem(this.synopsis[1], "iframe");
                break;
            default:
                return HTML + Elem(this.synopsis[1], "p") + Elem("Read Full &#187 |||" + this.source,"a", "post-link");
            
        }
    }

        this.postTemp()
}

function Elem(text="", tag = "p", classes ="", src="", title=""){
    switch (tag) {
        case "img":
            return `<img src="${text}" class="${classes}">`;
            break;
        case "a":
            text= text.split("|||")
            return `<a href="${text[1]}" target="_blank" class="${classes}">${text[0]}</a>`;
            break;
        case "iframe":
            return `<div class="container"><iframe src="${text}" classes="${classes} allowFullScreen="true"></iframe></div>`;
            break;
    }
    return `<${tag} class="${classes}">${text}</${tag}>`
}

function post(e) {
    PostData.push(e);
    new Post(...e);
}


function loadIDs(){ // Loading Post Data from json
    $.getJSON("js/pageIDs.json", function(LoadedIDs) {
        LoadedIDs.forEach(ID => { Posts.push(ID); });
        loadPosts();
    });
}

function loadPosts(){
    for (let PageNo = 1; PageNo < Pages + 1; PageNo++) {
        $.getJSON(`js/${PageNo}-post.json`, function(_posts) { 
            _posts.forEach(_post => { post(_post); })
        })
    }
}

function UpdatePageCount(){
    $.getJSON("js/page-count.json", function(data) {
        Pages = parseInt(data);
        loadIDs();
    });
}

UpdatePageCount();