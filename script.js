function createGrid(length) {
    for (i = 0; i < length; i++) {
        const row = document.createElement("div");
        row.id = "row";    
        for (j = 0; j < length; j++) {
            const square = document.createElement("div");
            square.className = "square";
            square.addEventListener("mouseover", () => {
                    square.classList.add("hovered");
                }, { once: true});
            row.appendChild(square);
        }
        document.getElementById("container").appendChild(row);
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

const button = document.getElementById("clear");
button.addEventListener("click", resetGrid);
createGrid(16);
