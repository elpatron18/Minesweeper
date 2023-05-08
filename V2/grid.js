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
            this.visible = false;
            this.umkreisZahl = null;

            // Erstelle eine neue Div
            this.div = document.createElement('div');

            // Füge eine CSS-Klasse hinzu, um das Aussehen der Div zu stylen
            this.div.classList.add('zelle');

            // Setze eine ID für die Div, um sie später identifizieren zu können
            this.div.id = `zelle-${zeile}-${spalte}`;

            meinGrid.appendChild(this.div)
        }
        updateZahl() {
            if (this.bombe) return;
            let summe = 0;

            this.getMyUmfeld().forEach((element) => {
                if (element.bombe) summe++;
            })

            this.umkreisZahl = summe;
        }

        aufdecken() {
            if (!this.visible) this.visible = true;

            if (this.bombe) {
                this.div.classList.add("bombe")
            }
             else {
                // Wenn null ist deck alle Werte drum rum auf
                // Wenn != 0 dann zeige die Zahl an
                    if (this.umkreisZahl === 0) {
                        this.div.classList.add("zero")
                        this.visible = true;
                        this.getMyUmfeld().forEach(element => {
                            if (!element.visible) element.aufdecken();
                        })
                    }
                    else {
                        this.div.innerHTML = this.umkreisZahl;
                        this.visible = true;
                    }
            }
        }

        getMyUmfeld() {
            let umfeld = [];

            let obenRand = this.zeile === 0;
            let untenRand = this.zeile === zeilenAnzahl - 1;
            let linksRand = this.spalte === 0;
            let rechtsRand = this.spalte === spaltenAnzahl - 1;

            let rOffStart = -1, rOffStop = 1, cOffStart = -1, cOffStop = 1;

            if (obenRand) rOffStart = 0;
            if (untenRand) rOffStop = 0;
            if (linksRand) cOffStart = 0;
            if (rechtsRand) cOffStop = 0;

            for (let rOff = rOffStart; rOff <= rOffStop; rOff++) {
                for (let cOff = cOffStart; cOff <= cOffStop; cOff++) {
                    umfeld.push(karte[this.zeile + rOff][this.spalte + cOff]);
                }
            }

            return umfeld;
        }

    }



    function erstelleKarte() {
        // erstelle ein leeres 2D-Array
        let karte = new Array(zeilenAnzahl);
        for (let z = 0; z < zeilenAnzahl; z++) {
            karte[z] = new Array(spaltenAnzahl);
            for (let s = 0; s < spaltenAnzahl; s++) {
                karte[z][s] = new Zelle(z, s);
            }
        }

        // Bomben erstellen
        let bomben = 0;
        while (bomben < anzahlBomben) {
            let b = Math.floor(Math.random() * spaltenAnzahl);
            let h = Math.floor(Math.random() * zeilenAnzahl);

            if (!karte[h][b].bombe) {
                karte[h][b].bombe = true;
                bomben++;
            }
        }
        return karte;
    }
    let karte = erstelleKarte();

    karte.forEach((z) => z.forEach((s) => s.updateZahl()))

    karte.forEach((z) => z.forEach((s) => {
        s.div.addEventListener("click", () => {
            s.aufdecken();
        });
    }));


})