const l = document.createElement("div")
const inner = document.createElement("div")
l.appendChild(inner)
document.body.appendChild(l)
let o = document.body.style
o.overflow = "hidden"
inner.id = "l"
inner.textContent = "Loading"
loading = true
n = 0
anim()
function anim(){
    if (loading) {
        if (n < 3) {
            inner.textContent += "."
            n++
        } else {
            inner.textContent = "Loading"
            n = 0
        }
        setTimeout(anim, 500)
    }
}

window.onload = () => {
    loading = false
    o.overflow = "auto"
    document.getElementById("l").remove()
};
