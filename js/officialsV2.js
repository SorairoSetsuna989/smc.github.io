// BPerson object
function Person(role, firstName, middleName ="", lastName, prefix ="", suffix = "", pic = "", nextRow = "") {
    //Object properties
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.suffix = suffix;
    this.prefix = prefix;
    this.fullName = prefix + " " + firstName + " " + middleName + " " + lastName + " " + suffix;
    this.role = role;
    this.pic = pic;
    this.nextRow = nextRow;

    // Object methods
    this.showFullName = function() { return this.fullName; }
    this.showRole = function() { return this.role}
    this.showPic = function() { return this.pic; }
    this.myCard = function() {
        let newCard = `<div class="card"><img src="${this.pic}" style="width:100%"><div class="card-container"><h4>${this.showFullName()}</h4></h3><p class="card-title">${this.role}</p></div></div>`;
        let newCol = `${this.nextRow}<div class="flex-col">${newCard}</div>`;
        return newCol;
    }
}

var Team = {
    FMM: {
        schoolhead: new Person("School Head","Teresita", "P.", "Elevera","SR.","FMM", "http://stellamariscollegeqc.edu.ph/wp-content/uploads/2021/04/srtess.jpg","nextRow"),
        financeOfficer: new Person("Finance Officer","AMELITA", "T.", "ABALOS", "SR.", "FMM", "http://stellamariscollegeqc.edu.ph/wp-content/uploads/2021/04/sramy.jpg"), 
        wellBeing: new Person("Student Well-being","MARY CONCEPCION", "T." ,"JOMEN", "SR.", "FMM", "http://stellamariscollegeqc.edu.ph/wp-content/uploads/2021/05/srsiony.jpg"), 
        canteenSupervisor: new Person("Canteen Supervisor","ERLINDA","","STA. ROMANA","SR.","FMM", "http://stellamariscollegeqc.edu.ph/wp-content/uploads/2021/05/srerlinda.jpg")
    }
    ,
    SALT: {
        AralingPanlipunan: new Person("Araling Panlipunan","Edna", "B.", "Oxales","Mrs.","","http://stellamariscollegeqc.edu.ph/wp-content/uploads/2021/03/199606001-1.jpg"),
        CLE: new Person("Christian Life Education", "Rengin", "M.", "Fabula", "Mr.","","http://stellamariscollegeqc.edu.ph/wp-content/uploads/2021/03/200106001-1.jpg"),
        Filipino: new Person("Filipino", "Chryzl Anne", "A.", "Gallardo", "Mrs.","","http://stellamariscollegeqc.edu.ph/wp-content/uploads/2021/03/201406001-1.jpg","nextRow"),
        Mathematics: new Person("Mathematics","Marife","O.","Corpuz", "Ms.","", "http://stellamariscollegeqc.edu.ph/wp-content/uploads/2021/03/201006001-1.jpg"),
        MAPEH: new Person("MAPEH","Cherry Rose", "C.", "Mendoza", "Ms.","","http://stellamariscollegeqc.edu.ph/wp-content/uploads/2021/03/201706004.jpg"),
        Science: new Person("Science","Lusita","B.","Sabalburo","Mrs.","","http://stellamariscollegeqc.edu.ph/wp-content/uploads/2021/03/199006002.jpg"),
        TLEICT: new Person("TLE / ICT","Marie Paz Claire","S.","Gallardo","Ms.","","http://stellamariscollegeqc.edu.ph/wp-content/uploads/2021/03/200106002.jpg"),
    }
    ,
    DepartmentHeads: {
        AcademicChair:  new Person("Academic Chair","Edna", "B.", "Oxales","Mrs.","","http://stellamariscollegeqc.edu.ph/wp-content/uploads/2021/03/199606001-1.jpg"),
        GuidanceChair: new Person("Guidance Chair", "Nila", "","Castro", "Ms.","","http://stellamariscollegeqc.edu.ph/wp-content/uploads/2021/03/200306001.jpg"),
        OSAChair: new Person("OSA Chair","Alejo Leobort","M.", "Coronel", "Mr.","","http://stellamariscollegeqc.edu.ph/wp-content/uploads/2021/03/201206002.jpg","nextRow"),
        HRO: new Person("Human Resource Officer","Frcille","T.","Jongco","Ms.","","http://stellamariscollegeqc.edu.ph/wp-content/uploads/2021/03/200511001.jpg"),
        Registrar: new Person("Registrar", "Jeniffer", "B.", "Martin","Ms.","","http://stellamariscollegeqc.edu.ph/wp-content/uploads/2021/03/199805001.jpg"),
        AccountingHead: new Person('Accounting Head',"Marichel","M.","Mateo","Ms.","","http://stellamariscollegeqc.edu.ph/wp-content/uploads/2021/03/201505001.jpg")
    }
 /*    ,
     HSFaculty: {
    
    }
    ,
    GSFaculty: {
    
    }
    ,
    NTS: {
    
    }
    ,
    Maintenance: {
    
    } */
}

// Elements Creation
function CreateRows() {
    let newRows = "";
    let AssignedColumns;
    Object.keys(Team).forEach((key, index) => {
        let Group = Team[key];
        console.log("Creating rows for: " + key);
        AssignedColumns =  CreateColumns(Group).split("*");
        AssignedColumns.forEach(nextRow => {
            newRows = `<div class="flex-row">${nextRow}</div>`;
            $(".grid-item-" + (index + 1)).append(newRows)
        })
    });
}

function CreateColumns(Group) {
    let members = "";
    Object.keys(Group).forEach(member => {
        console.log("creating column for: " + member);
        let currentcard = Group[member].myCard();
        if (currentcard.includes("nextRow")) {
            currentcard = currentcard.substring(7);
            members += currentcard + "*";
            console.log("next row..")
        } else { members += currentcard; }
    });
    console.log("----------------------------------------");
    return members;
}

CreateRows();

//Event Listener to change the Title Grid
$(".left-item").click(ChangedCurrent);
ChangedCurrent();

function ChangedCurrent(){ $(".current-team").text($(".current").text()); }
