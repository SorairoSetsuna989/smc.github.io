//// This file uses jQuery

// Person object
function Person(data = ["role", "fullname", "pic",""]) {
    //Object properties
    this.role = data[0];
    this.fullName = data[1];
    this.pic = data[2]; //href
    this.nextRow = data[3];

    // Object methods
    this.myCard = function() { // returns the html code for the card
        let newCard = Div("card", `<img src="${this.pic}" style="width:100%"> ${Div("card-container", `<h4>${this.fullName}</h4> </h3><p class="card-title">${this.role}</p>`)}`);
        let newCol = `${this.nextRow} ${Div("flex-col", newCard)}`;
        return newCol;
    }
}

$.getJSON(`js/staff-data.json`, Team => { createRows(Team); });

function CreateColumns(Group) {
    let members = "";
    Object.keys(Group).forEach((role, n) => {
        let member = Group[role];
        let memberObj = new Person(member);
        let memberDiv = memberObj.myCard();
        if (memberDiv.includes("nextRow")) {
            memberDiv = memberDiv.substring(7);
            members += memberDiv + "*";
        } else { members += memberDiv; }
    });
    return members;
}

function createRows(Team) {
    let AssignedColumns;
    Object.keys(Team).forEach((groupname, i) => {
        let group = Team[groupname];
        AssignedColumns =  CreateColumns(group).split("*");
        AssignedColumns.forEach(nextRow => {
            $(".grid-item-" + (i + 1)).append(Div("flex-row", nextRow));
        })
    })
}

function Div(classes = "", text = "") { return `<div class="${classes}">${text}</div>`; }
function ChangedCurrent(){ $(".current-team").text($(".current").text()); }

$(".left-item").click(ChangedCurrent); //Event Listener to change the Title Grid
ChangedCurrent(); // automatically changes the current grid title on page load