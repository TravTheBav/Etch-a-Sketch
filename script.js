function createGrid(length) {
    for (i = 0; i < length; i++) {
        const row = document.createElement("div");
        row.id = "row";    
        for (j = 0; j < length; j++) {
            const square = document.createElement("div");
            square.className = "square";
            square.addEventListener("mouseover", () => {
                onShading(square);
            });
            square.addEventListener("mouseover", () => {
                onHover(square); 
            }, {once: true});            
            row.appendChild(square);
        }
        document.getElementById("container").appendChild(row);
    }
}

// enables a squares color-changing behavior based on coloring mode
function onHover(square) {
    if (drawingMode == "normal") {
        square.style.backgroundColor = 'black';
    }   else if (drawingMode == "rainbow") {
        square.style.backgroundColor = generateRandomRGB();
    }   
}

// enables a squares color-changing behavior for shading mode
function onShading(square) {
    if (shadingMode) {
        let squareColor = square.style['backgroundColor'].slice(4, -1).split(","); // these lines parse the rgb value and convert to hexadecimal
        for (i = 0; i < 3; i++) {
            squareColor[i] = squareColor[i].trim();
            squareColor[i] = Math.floor(Number(squareColor[i] - squareColor[i] * 0.1)); // decrease each color value by 10% and cap at 0
            if (squareColor[i] < 0) {
                squareColor[i] = 0;
            };
            squareColor[i] = squareColor[i].toString(16);
            if (squareColor[i].length == 1) {
                squareColor[i] = "0" + squareColor[i];
            }
        };
        square.style.backgroundColor = '#' + squareColor[0] + squareColor[1] + squareColor[2];
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

function initButtonBehavior() {
    const clearButton = document.getElementById("clear");
    const rainbowModeButton = document.getElementById("rainbow");
    const shadingModeButton = document.getElementById("shading");
    
    clearButton.addEventListener("click", resetGrid);
    
    rainbowModeButton.addEventListener("click", () => {
        if (drawingMode != "rainbow") {
            drawingMode = "rainbow";
            rainbowModeButton.style.backgroundColor = '#6cff77'; 
        }   else {
            drawingMode = "normal";
            rainbowModeButton.style.backgroundColor = '#EFEFEF';
        }    
    });
    
    shadingModeButton.addEventListener("click", () => {
        if (shadingMode) {
            shadingMode = false;
            shadingModeButton.style.backgroundColor = '#EFEFEF';
        } else {
            shadingMode = true;
            shadingModeButton.style.backgroundColor = '#6cff77';
        }
    });
}

let drawingMode = "normal";
let shadingMode = false;

initButtonBehavior();
createGrid(16);
