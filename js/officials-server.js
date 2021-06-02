import {export2txt, newDiv} from './exports.js';

// The server version adds console logging to help with debugging
var Team = {};

function Person(data = ["role", "fullname", "pic",""]) {
        //Object properties
    this.role = data[0];
    this.fullName = data[1];
    this.pic = data[2];
    this.nextRow = data[3];

    // Object methods
    this.getFullName = function() { return this.fullName; }
    this.getRole = function() { return this.role}
    this.getPic = function() { return this.pic; }
    this.myCard = function() {
        let newCard = Div("card", `<img src="${this.pic}" style="width:100%"> ${Div("card-container", `<h4>${this.getFullName()}</h4> </h3><p class="card-title">${this.role}</p>`)}`);
        let newCol = `${this.nextRow} ${Div("flex-col", newCard)}`;
        return newCol;
    }
}

$.getJSON(`js/staffdata-0.json`, teamData => {
    Team = teamData;
    createRows();
});

function CreateColumns(Group) {
    let members = "";
    Object.keys(Group).forEach((role, n) => {
        Logger("Role", n, role);
        let member = Group[role];
        let memberObj = new Person(member);
        let memberDiv = memberObj.myCard();
        if (memberDiv.includes("nextRow")) {
            memberDiv = memberDiv.substring(7);
            members += memberDiv + "*";
            console.log("next row..")
        } else { members += memberDiv; }
    });
    console.log("----------------------------------------");
    return members;
}

function createRows() {
    let AssignedColumns;
    console.log("Creating team...");
    Object.keys(Team).forEach((groupname, i) => {
        Logger("Group", i, groupname);
        let group = Team[groupname];
        AssignedColumns =  CreateColumns(group).split("*");
        AssignedColumns.forEach(nextRow => {
            $(".grid-item-" + (i + 1)).append(Div("flex-row", nextRow));
        })
    })
}


function Logger(name = "", i, data) {
    console.log(`${name} (${i}): ${data}`);
}

function Div(classes = "", text = "") {
    return `<div class="${classes}">${text}</div>`;
}

function ChangedCurrent(){ $(".current-team").text($(".current").text()); }

$(".left-item").click(ChangedCurrent); //Event Listener to change the Title Grid
ChangedCurrent(); // automatically changes the current grid title on page load