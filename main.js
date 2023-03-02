const rows = 10;
const columns = 10;
const anzahlBomben = 10;

const meinGrid = document.getElementById('grid')

meinGrid.style.gridTemplateColumns = `repeat(${columns}, 50px`;
meinGrid.style.gridTemplateRows = `repeat(${rows}, 50px`;

document.body.appendChild(meinGrid);

const grid = [];

for (let row = 0; row < rows; row++) {
    grid[row] = [];
    for (let col = 0; col < columns; col++) {
        grid[row][col] = {
            row: row,
            col: col,
            bomb: false,
            revealed: false,

            getMyNumber: function () {

                let obenRand = this.row === 0;
                let untenRand = this.row === rows -1;
                let linksRand = this.col === 0;
                let rechtsRand = this.col === columns -1;

                let rOffStart = -1, rOffStop = 1, cOffStart = -1, cOffStop = 1;

                if (obenRand) rOffStart = 0;
                if (untenRand) rOffStop = 0;
                if (linksRand) cOffStart = 0;
                if (rechtsRand) cOffStop = 0;

                if (!this.bomb) {
                    let nearBomben = 0;

                    for (let rOff = rOffStart; rOff <= rOffStop; rOff++) {
                        for (let cOff = cOffStart; cOff <= cOffStop; cOff++) {
                            if (grid[this.row+rOff][this.col+cOff].bomb) {
                                //console.log("\t BOMBE")
                                nearBomben++;
                            }
                        }
                    }

                    return nearBomben;

                }
                else return null;
            },
            reveal: function() {

                if (this.revealed) return;

                if (this.bomb) this.element.style.backgroundImage = "url('Bomb.png')";
                else if (this.getMyNumber() === 0) {
                    this.element.innerHTML = this.getMyNumber();
                    this.revealed = true;

                    let obenRand = this.row === 0;
                    let untenRand = this.row === rows -1;
                    let linksRand = this.col === 0;
                    let rechtsRand = this.col === columns -1;

                    let rOffStart = -1, rOffStop = 1, cOffStart = -1, cOffStop = 1;

                    if (obenRand) rOffStart = 0;
                    if (untenRand) rOffStop = 0;
                    if (linksRand) cOffStart = 0;
                    if (rechtsRand) cOffStop = 0;

                    for (let rOff = rOffStart; rOff <= rOffStop; rOff++) {
                        for (let cOff = cOffStart; cOff <= cOffStop; cOff++) {
                            console.log((this.row + rOff)  + "\t " + (this.col + cOff))
                            grid[this.row + rOff][this.col + cOff].reveal();
                        }
                    }

                }
                else {
                    this.element.innerHTML = this.getMyNumber();
                }
            }
        };
    }
}



const gridElement = document.getElementById('grid');

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
        const cell = document.createElement('div');
        cell.dataset.row = row;
        cell.dataset.col = col;
        cell.classList.add('cell');
        gridElement.appendChild(cell);
        grid[row][col].element = cell;
    }
}

let arr = Array.prototype.slice.call(document.getElementsByClassName("cell"))

let ersterKlick = true;
arr.forEach(element => {
    element.addEventListener("click", ()=> {

        if (ersterKlick) {
            // Generiere Bomben
            let erstBomben = 0;
            while (erstBomben < anzahlBomben) {
                let randRow = Math.floor(Math.random() * rows);
                let randCol = Math.floor(Math.random() * columns);
                if (!grid[randRow][randCol].bomb &&
                    Math.abs(randRow - element.dataset.row) > 1 &&
                    Math.abs(randCol - element.dataset.col) > 1) {
                    grid[randRow][randCol].bomb = true;
                    //grid[randRow][randCol].element.style.backgroundColor = 'red';
                    erstBomben++;
                }
                //grid[element.dataset.row][element.dataset.col].reveal();

            }
            ersterKlick = false;
        }

        grid[element.dataset.row][element.dataset.col].reveal();

    })

/*
    // Dev Tools
    let dev = prompt("Dev?") === "dev";

    if (dev) {
        arr.forEach(element => {
            if (grid[element.dataset.row][element.dataset.col].bomb){
                element.style.backgroundColor = 'red';
            }})
    }


 */


})
