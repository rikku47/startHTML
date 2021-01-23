//#region 
//#endregion

//#region Variables

let dragObject = null

let diffX = 0
let diffY = 0

let isDraggable = false
let isDrag = false

let css = 'cm'
let exceptions = ['checkbox', 'range']

let values = []

//#endregion

//#region Functions

function setDraggableAndCss(ev, css, exceptions) {

    isDraggable = true;
    dragObject = ev.currentTarget;

    for (let index = 0; index < exceptions.length; index++) {
        const exeption = exceptions[index]
        if (ev.srcElement.type == exeption) {
            isDraggable = false
        };
    };

    if (isDraggable) {
        if (!ev.currentTarget.classList.contains(css)) {
            ev.currentTarget.classList.add(css)
        }
    } else {
        ev.currentTarget.classList.remove(css)
    };
};

function unSetDraggableAndCss(ev, css) {
    ev.currentTarget.classList.remove(css)
    isDraggable = false
    dragObject = null
};

function startDrag(event) {
    if (isDraggable) {
        isDrag = true
        diffXY(event)
    };
};

function endDrag() {
    isDrag = false
};

function diffXY(event) {
    diffX = event.clientX - dragObject.offsetLeft
    diffY = event.clientY - dragObject.offsetTop
};

function watchCoords(ev, isDrag) {
    if (isDrag) {
        dragObject.style.left = ev.clientX - diffX
        dragObject.style.top = ev.clientY - diffY
    };
};

function dragAndDrop() {

    let interface = document.getElementById('interface');

    interface.addEventListener('mouseover', (ev) => {
        setDraggableAndCss(ev, css, exceptions)
    })

    interface.addEventListener('mouseleave', (ev) => {
        unSetDraggableAndCss(ev, css)
    })

    interface.addEventListener("mousedown", (ev) => {
        startDrag(ev)
    });

    interface.addEventListener("mouseup", (ev) => {
        endDrag();
    })

    document.body.addEventListener("mousemove", (ev) => {
        watchCoords(ev, isDrag)
    })
}

function updateEqualize(event) {

    let value = Number(event.srcElement.value)

    // model.updateSinEq(value);
}

function updateGap(event) {
    console.log(event.srcElement.value)
}

function updateAnimation(event: { data: any }) {
    console.log(event.data)
}

function initListeners() {
    dragAndDrop()
}

//#endregion

//#region Listeners

document.addEventListener("DOMContentLoaded", initListeners)

//#endregion