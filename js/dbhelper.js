/* Creació de la BD amb els sudokus. S'ha d'executar abans de començar el joc */
class DbHelper {
    constructor() {
        this.DB_VERSION = 1;
        this.DB_NAME = 'DAW2';
        this.DB_OBJECT = 'sudokus';
    }

    comprovaExistsSinoInicialitza() {
        console.log('comprovaExistsSinoInicialitza');
        const peticio = window.indexedDB.open(this.DB_NAME, this.DB_VERSION);

        peticio.onerror = ev => {
            console.log(`Error a l'hora d'obrir la BD.`);
        };

        peticio.onsucces = ev => {
            const db = ev.target.result;
            const magatzemObjsSudokus = db.transaction('sudokus', 'readwrite').objectStore('sudokus');
            // comprova si existeixen les dades
            magatzemObjsSudokus.openCursor().onsucces = evCursor => {
                if (evCursor.target.result) {
                    // ja hi ha dades, no fer res
                    console.log(`Ja existeixen les dades dels Sudokus.`);
                } else {
                    // sinó, inicialitzar
                    try {
                        const primerSudoku = [
                            [
                                { num: 5 },
                                { num: 3 },
                                { num: 4 },
                                { num: 6 },
                                { num: 7 },
                                { num: 8 },
                                { num: 9 },
                                { num: 1 },
                                { num: 2 },
                            ],
                            [
                                { num: 6 },
                                { num: 7 },
                                { num: 2 },
                                { num: 1 },
                                { num: 9 },
                                { num: 5 },
                                { num: 3 },
                                { num: 4 },
                                { num: 8 },
                            ],
                            [
                                { num: 1 },
                                { num: 9 },
                                { num: 8 },
                                { num: 3 },
                                { num: 4 },
                                { num: 2 },
                                { num: 5 },
                                { num: 6 },
                                { num: 7 },
                            ],
                            [
                                { num: 8 },
                                { num: 5 },
                                { num: 9 },
                                { num: 7 },
                                { num: 6 },
                                { num: 1 },
                                { num: 4 },
                                { num: 2 },
                                { num: 3 },
                            ],
                            [
                                { num: 4 },
                                { num: 2 },
                                { num: 6 },
                                { num: 8 },
                                { num: 5 },
                                { num: 3 },
                                { num: 7 },
                                { num: 9 },
                                { num: 1 },
                            ],
                            [
                                { num: 7 },
                                { num: 1 },
                                { num: 3 },
                                { num: 9 },
                                { num: 2 },
                                { num: 4 },
                                { num: 8 },
                                { num: 5 },
                                { num: 6 },
                            ],
                            [
                                { num: 9 },
                                { num: 6 },
                                { num: 1 },
                                { num: 5 },
                                { num: 3 },
                                { num: 7 },
                                { num: 2 },
                                { num: 8 },
                                { num: 4 },
                            ],
                            [
                                { num: 2 },
                                { num: 8 },
                                { num: 7 },
                                { num: 4 },
                                { num: 1 },
                                { num: 9 },
                                { num: 6 },
                                { num: 3 },
                                { num: 5 },
                            ],
                            [
                                { num: 3 },
                                { num: 4 },
                                { num: 5 },
                                { num: 2 },
                                { num: 8 },
                                { num: 6 },
                                { num: 1 },
                                { num: 7 },
                                { num: 9 },
                            ],
                        ];                    
    
                        let sudoku = { id: 0, sudoku: primerSudoku };
                        magatzemObjsSudokus.add(sudoku);
                        sudoku = { id: 1, sudoku: segonSudoku };
                        magatzemObjsSudokus.add(sudoku);
                        sudoku = { id: 2, sudoku: tercerSudoku };
                        magatzemObjsSudokus.add(sudoku);
                    } catch {
                        
                    }
                }
            };
        };
    }

    recullRandomSudoku() {
        const peticio = window.indexedDB.open(this.DB_NAME, this.DB_VERSION);

        peticio.onerror = ev => {
            console.log(`Error a l'hora d'obrir la BD.`);
            return undefined;
        };

        peticio.onsucces = ev => {
            const db = ev.target.result;
            const magatzemObjsSudokus = db.transaction('sudokus', 'readonly').objectStore('sudokus');

            // generar id random pel sudoku
            const randomId = Math.floor(Math.random() * 3);
            console.log(`Id del sudoku random: ${randomId}`);

            // això retorna el sudoku que s'hagi seleccionat
            magatzemObjsSudokus.openCursor(randomId).onsuccess = evCursor => evCursor.target.result.value;
        };
    }
}
