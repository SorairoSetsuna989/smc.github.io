var Today = new Date();

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

export function newDiv(parent, classes = "",Text = "") {
    let jQ = classes.split(" ");
    let jSelect = parent.split(" ");
    jQ.forEach((_class,i) => {
        if (_class.startsWith(".") == false) { jQ[i] = `.${_class}`; }
    })

    jSelect.forEach((_sel, i) => {
        if (_sel.startsWith(".") == false) { jSelect[i] = "." + _sel; }     
    })
    jSelect = jSelect.join();

    $(parent).append(`<div class="${classes}">${Text}</div>`);

    // returns the newly created div parent as jQ object
    return $(`${parent} ${jQ.join()}`);
}