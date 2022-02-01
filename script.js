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

createGrid(16);