//// This file uses jQuery

// Person object
function Person(data = ["role", "fullname", "pic",""]) {
    //Object properties
    this.role = data[0];
    this.fullName = data[1];
    this.pic = "img/officials/" + data[2]; //href
    this.nextRow = data[3];

    // Object methods
    this.myCard = () => { // returns the html code for the card
        const card = Div("card", `<img src="${this.pic}" style="width:100%"> ${Div("card-container", `<h4>${this.fullName}</h4> </h3><p class="card-title">${this.role}</p>`)}`);
        const col = `${this.nextRow} ${Div("flex-col", card)}`;
        return col;
    }
}

$.getJSON(`js/staff-data.json`, team => createRows(team) );

function CreateColumns(group) {
    let members = "";
    Object.keys(group).forEach(role => {
        const mem = group[role];
        const memObj = new Person(mem);
        let memDiv = memObj.myCard();
        members += memDiv.includes("nextRow") ? memDiv.substring(7) + "*": memDiv
    });
    return members;
}

function createRows(team) {
    let assignedColumns;
    Object.keys(team).forEach((groupname, i) => {
        const group = team[groupname];
        assignedColumns = CreateColumns(group).split("*");
        assignedColumns.forEach(nextRow => $(".grid-item-" + (i + 1)).append(Div("flex-row", nextRow)))
    })
}

function Div(c, t) { return `<div class="${c}">${t}</div>`; }
function ChangedCurrent(){ $(".current-team").text($(".current").text()); }

$(".left-item").click(ChangedCurrent); //Event Listener to change the Title Grid
ChangedCurrent(); // automatically changes the current grid title on page load