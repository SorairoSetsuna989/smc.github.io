export function export2txt(Name = "data", collection) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([JSON.stringify(collection, null, 2)], {
        type: "text/plain"
    }));
    if (collection != undefined) {
        a.setAttribute("download", `${Name}.json`);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
  }

export function newDiv(element,setClasses = [],Text = "") {
    let newDivElem = '<div class="';
    let jQ = element;
    setClasses.forEach((DivClass, i) => {
        if (DivClass.includes(".")) {
            DivClass = DivClass.slice(1);
            jQ += " " + DivClass;
        } else {
            jQ += " ." + DivClass;
        }

        newDivElem += `${DivClass}`;

        if (i < setClasses.length - 1) {
            newDivElem += " ";
        }
    });
    newDivElem += `">${Text}</div>`;
    /* console.log("Jquery Object: " + jQ); */
    $(element).append(newDivElem);
    return $(jQ);
}