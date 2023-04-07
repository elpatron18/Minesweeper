const zeilenAnzahl = 10;
const spaltenAnzahl = 10;
const anzahlBomben = 10;

const meinGrid = document.getElementById('grid')

meinGrid.style.gridTemplateColumns = `repeat(${columns}, 50px`;
meinGrid.style.gridTemplateRows = `repeat(${rows}, 50px`;

document.body.appendChild(meinGrid);

class Zelle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.bombe = false;
        this.umkreis = null;
    }
}

function erstelleKarte() {
    // erstelle ein leeres 2D-Array
    let karte = new Array(zeilenAnzahl);
    for (let i = 0; i < spaltenAnzahl; i++) {
        karte[i] = new Array(zeilenAnzahl);
        for (let j = 0; j < spaltenAnzahl; j++) {
            karte[i][j] = new Zelle(j, i);
        }
    }

    //Bomben erstellen
    let bomben = 0;
    while (bomben < anzahlBomben) {
        let b = Math.floor(Math.random() * breite);
        let h = Math.floor(Math.random() * hoehe);

        if (!karte[h][b].bombe) {
            karte[h][b].bombe = true;
            bomben++;
        }
    }
    return karte;
}

