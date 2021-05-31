var Posts = [];
var Pages;
var Today = new Date();
var itemNo = 0;
import {export2txt, newDiv} from './exports.js';

//// Basic Usage
/// 1) To Update page count - run the PageCount() function at the last line of the document
/// 2) To save all the posts - run savePost()
/// 3) To add a post;
function PageCeil(){ return Math.ceil(Posts.length / 5); }

function PostCreationDate() {
    return `${Today.getFullYear()}-${Today.getMonth()}-${Today.getDate()}-${Today.getHours()}-${Today.getMinutes()}-${Today.getSeconds()}`;
}

function GenerateID() {
    let newID = (Math.random() * 0xfffff * 1000000).toString(16);
    newID = "." + newID.slice(0, 6);
    Posts.forEach(post => { if (post == newID) { GenerateID(); } });
    Posts.push(newID);
    Pages = PageCeil();
    return newID;
};

function Post(user="",userIcon = "") {
    // Object properties
    this.user = user;
    this.userIcon = userIcon;
    this.creationDate = PostCreationDate();
    this.id = GenerateID();
    this.footer = this.id + "-footer";
    this.body = this.id + "-body";
    this.head = this.id + "-title";

    /// Object methods

    //function for creating a blank post
    this.BlankPost = function () {
        newDiv(".posts", ["post", this.id]);
        newDiv(this.id, ["post-title", this.head]);
        newDiv(this.id, ["post-body", this.body]);
        newDiv(this.id, ["post-footer", this.footer]);
        itemNo++;
    }

    // Determines which kind of post is formatted
    this.spawnPost = function (type = "sj-article", postTitle = "", Author = "", postContents = {}, postPics = []) {
        $(this.id).addClass(type);
        switch (type) {
            case "sj-article":
                this.article(postTitle, Author, postContents);
                break;
            case "sj-short":
                this.short(contents);
                break;
            case "sj-image":
                this.image(postTitle, Author, postContents, postPics);
                break;
            case "sj-poem":
                this.poem(contents);
                break;
            case "sj-video":
                this.video(contents);
                break;
        }
    }

    this.image = function(imageCaption = "", postAuthor = "", postContents = {}, images = []) {
        let desc = newDiv(this.body, ["image-caption"]).append(`<h3> Stellan's Journal Entry: ${imageCaption}</h3>`);
        this.AddContent(postContents, desc);
        let gallery = newDiv(this.body, ["images"]);
        images.forEach((pic, n) => { gallery.append(`<img src="${pic}">`); })
        newDiv(this.body, ["image-author"]).append(`Image/s posted by: ${postAuthor}`);
    }

    // Formats the post as an article
    this.article = function(articleTitle, articleAuthor, articleContents = {}) {
        newDiv(this.body,["article-head"]).append(`<h3>Stellan's Journal Entry: ${articleTitle}</h3>`);
        let contents = newDiv(this.body, ["article-contents"]);
        newDiv(this.body, ["article-foot"]).append(`<h4>written by ${articleAuthor}</h4><img src="${this.userIcon}">`);
        this.AddContent(articleContents, contents);
    }   

    this.AddContent = function(collection, jQ) {
        Object.keys(collection).forEach(content => {
            let type = collection[content];
            jQ.append(`<${type}>${content}</${type}`);
        });
        return jQ;
    }

    // Automatically creates a blank post of article type
    this.BlankPost();
}

var A = new Post("altair", "https://mail.google.com/mail/u/0?ui=2&ik=6b0210804c&attid=0.2&permmsgid=msg-f:1700737455891833823&th=179a3bb48aa263df&view=att&disp=safe&realattid=179a3bb020039a70b3c3");
 A.spawnPost(
    "sj-article", 
    "My Nurturing Home", 
    "Nicole Therese Bedia",
    { 
    "Sometimes, the most unexpected events lead us to the best moment of our lives. In 2017, my parents both got transferred job assignments from Cavite to Quezon City. We were left with no choice but to transfer residences, so I had to transfer schools too. As someone who grew up in the province, I was sheltered and I was really unsure of how I could deal with living in the city. Could I really endure my stay here? Luckily, we discovered Stella Maris College, and I instantly felt like you were home SMC. ": "p", 
    "I can recall my first few days as a grade 9 student, I was very much overwhelmed by the number of students. But in just a few months, strangers turned into friends. Friends soon became like family too! Your people were welcoming and they are lovely. I met friends who shared both sorrows and joys, friends who were with me through the best and worst moments of my life. And beyond the friendship, I was also gifted to have the opportunity to know my faith better in this nurturing home." : "p", 
    "I learned more about Eucharistic Celebrations, rituals, and prayers. With all honesty, before I got into SMC, I really did not have many opportunities to deepen my faith. I did not grow up in a very religious family, everyone was so busy that we couldn’t even attend the Sunday mass in some weeks. It was a struggle to adjust to this new environment, but teachers and friends taught me willingly. Ms. Rivera, my grade 9 adviser, was one of my beloved teachers as she was really hands-on when it comes to our morning routine inside the classroom. My favorite part of our routine was when we got to share the line or lines which struck us the most from the daily Gospel. Thanks to her, I got to know more about the Lord’s teachings." : "p",
    "Stella Maris College also taught me much about charity. Something that I couldn’t really learn from wordy textbooks or concept notes was giving. Every year, our outreach programs reminded me of the importance of compassion. SMC taught me that taking care of others, may it be people or God’s creation, is something rewarding, not by material things but rather rewarding to the soul.": "p",
    "It’s been three years since we first met, but you still possess the same beauty I have come to know. Stella Maris College, thank you for being my nurturing home. I cannot find the perfect words to express my gratitude that in just a few years, you helped me explore my potential and grow as a student, daughter, and leader which I will forever bring. You introduced me to friends whom I’ll cherish forever. You showed me the meaning of charity and taught me more about my faith. Sadly, we’ll be parting soon, but I’ll surely remember you wherever I go. I’ll keep in mind all the lessons I have learned so that I could share them with the people I will be with along the way. I’ll show them kindness, just like what your people showed me. I’ll care for them, hoping that they too, shall find home and comfort in me like I found in you. After all, you are not just an institution, nor an establishment. To me you are my nurturing home." : "p",
    "Who would have known that one unexpected event could lead me to you, my 2nd home?": "p"
    });

function PageCount() { export2txt("page-count",Pages); }

function UpdatePageCount(){
    console.log(Pages);
    $.getJSON("js/page-count.json", function(data) {
        Pages = parseInt(data);
        console.log("Total Pages: " + Pages);
        loadIDs();
    });
}

function loadIDs(){
    console.log("loading pages");
    let Start = 1;
    $.getJSON("js/pageIDs.json", function(LoadedIDs) {
        LoadedIDs.forEach(ID => { Posts.push(ID); });
        loadPosts();
    });
}

function loadPosts(){
    for (let PageNo = 1; PageNo < Pages + 1; PageNo++) {
        $.getJSON(`js/data-post-page-${PageNo}.json`, function(_posts) { 
            _posts.forEach(_post => {
                console.log("Spawning: " + itemNo);
                newDiv(".posts", ["post", "post-" + itemNo]);
                $(".post-" + itemNo).append(_post); 
                itemNo++
            })
        })
    }
}

function AddMorePosts(n = 5){
    for (let i = 0; i < n; i++) {
        console.log("Spawning: " + itemNo);
        let test = new Post(`test-${itemNo}`,"");
        test.spawnPost("sj-article",`This is a test post: ${itemNo}`,"author",{"Some text":"p"});
    }
    SavePostsData();
}

function savePosts(start = 0) {
    while (start < Pages) {
        let PageContents = saveFive(start + 1);
        export2txt(`data-post-page-${start + 1}`, PageContents);   
        start++
    }

    PageCount();
};

function saveFive(n){
    let SetFive = []
    let relativepos = 5 * (n - 1);
    for (let i = 0; i < 5; i++) {
        let currentPos = i + relativepos;
        if (currentPos == Posts.length){
            console.log("Returning:" + currentPos);
            return SetFive;
        }
        SetFive.push($(Posts[currentPos]).html())
    }
    return SetFive;
}

function SavePostsData(){ 
    export2txt("pageIDs",Posts); 
    savePosts();
}

var imgTry = new Post("JC");
imgTry.spawnPost("sj-image","Ecobricks Project","Sr. Siony", {'<i>"Ecobricks enable us to take personal responsibility for our plastic and transition to regenerative living."</i>': "p"}, ["http://127.0.0.1:5500/img/alumni1.jpg"] )

AddMorePosts(13);