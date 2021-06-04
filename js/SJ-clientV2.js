import { newDiv } from './exports.js';

// Global Variables
var Posts = [];
var Pages;
var itemNo = 0;
var PostData = [];

function Post( type="sj-article", author = "Anonymous", authorPic = "", title="", contents = {}, postPics = [] ) {
    let possibleTypes = ["sj-article","sj-short","sj-image","sj-poem","sj-video"];

    // Blank Post variables
    this.id = Posts[itemNo];
    this.head = "head-" + this.id;
    this.body =  "body-" + this.id;
    this.footer =  "foot-" + this.id;
    this.jQ = "." + this.body;

    // Formatted Post Variables
    this.type = type;
    this.title = title;
    this.author = author;
    this.authorPic = "img/authors/" + authorPic;
    this.contents = contents;
    this.postPics = postPics;

    // Check if the type given is in the allowed types
    if (type in possibleTypes) {
        $(this.id).addClass(type);
    } else $(this.id).addClass("sj-article");

    //function for creating a blank post
    this.BlankPost = function () {
        newDiv(".posts", "post " + this.id);
        let jQ = this.id.split(" ");
        jQ.forEach((c , i) => { jQ[i] = "." + c; });
        jQ = jQ.join();
        newDiv(jQ,  "post-head head-"+ this.id);
        newDiv(jQ, "post-body body-"+ this.id);
        newDiv(jQ, "post-footer foot-"+ this.id);
        itemNo++;
    }

    // spawns elements based on object keys
    this.spawnPost = function(){
        this.BlankPost();
        switch (type) {
            case "sj-article":
                this.article();
                break;
            case "sj-short":
                this.short();
                break;
            case "sj-image":
                this.image();
                break;
            case "sj-poem":
                this.poem();
                break;
            case "sj-video":
                this.video();
                break;
            case "sj-tab":
                this.tab()
         }
    }

    // Formats the post as an article
    this.article = function() {
        newDiv(this.jQ, "article-head").append(`<h3>Stellan's Journal Entry: ${this.title}</h3>`);
        let contents = newDiv(this.jQ, "article-contents");
        newDiv(this.jQ, "article-foot").append(`<h4>written by ${this.author}</h4><img src="${this.authorPic}">`);
        this.AddContent(this.contents, contents);
    }   

    this.tab = function() {
        let tabDat = this.contents["table"];
        let newTable = ""; // (1) html elements will be added to this var before appending to a jQ obj 
        tabDat.forEach((row, i) => {
            let rowContents = ""; // Similar to (1)
            row.forEach(col => {
                //rowContents += ()=>{ if (i == 0) return `<td>${col}</td>`; else { return `<th>${col}</th>`; } }
                if (i==0) rowContents += `<td>${col}</td>`; else { rowContents += `<th>${col}</th>`; }
            })
            newTable += `<tr>${rowContents}</tr>`;
            })           

        $(this.jQ).append(`<table>${newTable}</table`);
    }

    this.AddContent = function(collection, jQ) {
        Object.keys(collection).forEach(content => {
            let type = collection[content];
            $(jQ).append(`<${type}>${content}</${type}`);
        });
        return $(jQ);
    }

    this.spawnPost(); // Automates the spawning of html elements for the post
}

function post(e) { PostData.push(e); new Post(...e); }

function loadIDs(){ // Loading Post Data from json
    $.getJSON("js/pageIDs.json", function(LoadedIDs) {
        LoadedIDs.forEach(ID => { Posts.push(ID); });
        loadPosts();
    });
}

function loadPosts(){
    for (let PageNo = 1; PageNo < Pages + 1; PageNo++) {
        $.getJSON(`js/data-post-page-${PageNo}.json`, function(_posts) { 
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


$(document).ready( e => { UpdatePageCount() } ) //Loads post 