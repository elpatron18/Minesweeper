const zeilenAnzahl = 10;
const spaltenAnzahl = 10;
const anzahlBomben = 10;

const meinGrid = document.getElementById('grid')

meinGrid.style.gridTemplateRows = `repeat(${zeilenAnzahl}, 50px)`;
meinGrid.style.gridTemplateColumns = `repeat(${spaltenAnzahl}, 50px)`;

document.body.appendChild(meinGrid);

document.addEventListener('DOMContentLoaded', () => {

    class Zelle {
        constructor(zeile, spalte) {
            this.zeile = zeile;
            this.spalte = spalte;
            this.bombe = false;
            this.umkreis = null;

            // Erstelle eine neue Div
            this.div = document.createElement('div');

            // Füge eine CSS-Klasse hinzu, um das Aussehen der Div zu stylen
            this.div.classList.add('zelle');

            // Setze eine ID für die Div, um sie später identifizieren zu können
            this.div.id = `zelle-${zeile}-${spalte}`;

            meinGrid.appendChild(this.div)
        }
    }

    function erstelleKarte() {
        // erstelle ein leeres 2D-Array
        let karte = new Array(zeilenAnzahl);
        for (let z = 0; i < zeilenAnzahl; i++) {
            karte[z] = new Array(spaltenAnzahl);
            for (let s = 0; s < spaltenAnzahl; s++) {
                karte[z][s] = new Zelle(z, s);
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

})