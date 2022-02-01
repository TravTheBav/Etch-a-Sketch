function createGrid(length) {
    for (i = 0; i < length; i++) {
        const row = document.createElement("div");
        row.id = "row";    
        for (j = 0; j < length; j++) {
            const square = document.createElement("div");
            square.className = "square";
            square.addEventListener("mouseover", () => {
                initSquareEventListeners(square); 
                }, {once: true});
            row.appendChild(square);
        }
        document.getElementById("container").appendChild(row);
    }
}

function initSquareEventListeners(square) {
    if (drawingMode == "normal") {
        square.style.backgroundColor = 'black';
    }   else if (drawingMode == "rainbow") {
        square.style.backgroundColor = generateRandomRGB();
    }   
}

function resetGrid() {
    let length = parseInt(prompt("Enter a new grid length"));
    if (length > 100) {
        length = 100;
    }
    else if (Number.isNaN(length)) {
        length = 16;
    }
    let grid = document.getElementById("container");
    removeAllChildNodes(grid);
    createGrid(length);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function generateRandomRGB() {
    let red = (Math.floor(Math.random() * 255)).toString(16);
    let green = Math.floor(Math.random() * 255).toString(16);
    let blue = Math.floor(Math.random() * 255).toString(16);
    let rgb = [red, green, blue];
    for (i = 0; i < 3; i++) {  // adds the prefixed 0 for single digit hex values
        if (rgb[i].length == 1) {
            rgb[i] = "0" + rgb[i];
        }
    }
    return '#' + rgb[0] + rgb[1] + rgb[2];
}

let drawingMode = "normal";
let shadingMode = false;
const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", resetGrid);
const rainbowModeButton = document.getElementById("rainbow");
rainbowModeButton.addEventListener("click", () => {
    if (drawingMode != "rainbow") {
        drawingMode = "rainbow";
        rainbowModeButton.style.backgroundColor = '#6cff77'; 
    }   else {
        drawingMode = "normal";
        rainbowModeButton.style.backgroundColor = '#EFEFEF';
    }    
});

createGrid(16);
