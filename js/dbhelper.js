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

        peticio.onupgradeneeded = ev => {
            const db = ev.target.result;
            const magatzemObjsSudokus = db.createObjectStore(this.DB_OBJECT, { keyPath: 'id' });
            magatzemObjsSudokus.createIndex('id', 'id');

            // comprova si existeixen les dades
            magatzemObjsSudokus.transaction.oncomplete = evCursor => {
                let magatzem = db.transaction(this.DB_OBJECT, 'readwrite').objectStore(this.DB_OBJECT);

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

                    const segonSudoku = [
                        [
                            { num: 6 },
                            { num: 1 },
                            { num: 7 },
                            { num: 9 },
                            { num: 2 },
                            { num: 5 },
                            { num: 4 },
                            { num: 8 },
                            { num: 3 },
                        ],
                        [
                            { num: 8 },
                            { num: 3 },
                            { num: 5 },
                            { num: 1 },
                            { num: 7 },
                            { num: 4 },
                            { num: 2 },
                            { num: 9 },
                            { num: 6 },
                        ],
                        [
                            { num: 4 },
                            { num: 2 },
                            { num: 9 },
                            { num: 6 },
                            { num: 3 },
                            { num: 8 },
                            { num: 7 },
                            { num: 5 },
                            { num: 1 },
                        ],
                        [
                            { num: 2 },
                            { num: 4 },
                            { num: 3 },
                            { num: 5 },
                            { num: 6 },
                            { num: 9 },
                            { num: 1 },
                            { num: 7 },
                            { num: 8 },
                        ],
                        [
                            { num: 7 },
                            { num: 9 },
                            { num: 1 },
                            { num: 4 },
                            { num: 8 },
                            { num: 2 },
                            { num: 6 },
                            { num: 3 },
                            { num: 5 },
                        ],
                        [
                            { num: 5 },
                            { num: 6 },
                            { num: 8 },
                            { num: 3 },
                            { num: 1 },
                            { num: 7 },
                            { num: 9 },
                            { num: 2 },
                            { num: 4 },
                        ],
                        [
                            { num: 3 },
                            { num: 8 },
                            { num: 2 },
                            { num: 7 },
                            { num: 4 },
                            { num: 1 },
                            { num: 5 },
                            { num: 6 },
                            { num: 9 },
                        ],
                        [
                            { num: 1 },
                            { num: 5 },
                            { num: 6 },
                            { num: 2 },
                            { num: 9 },
                            { num: 3 },
                            { num: 8 },
                            { num: 4 },
                            { num: 7 },
                        ],
                        [
                            { num: 9 },
                            { num: 7 },
                            { num: 4 },
                            { num: 8 },
                            { num: 5 },
                            { num: 6 },
                            { num: 3 },
                            { num: 1 },
                            { num: 2 },
                        ],
                    ];

                    const tercerSudoku = [
                        [
                            { num: 8 },
                            { num: 4 },
                            { num: 1 },
                            { num: 9 },
                            { num: 2 },
                            { num: 5 },
                            { num: 3 },
                            { num: 7 },
                            { num: 6 },
                        ],
                        [
                            { num: 7 },
                            { num: 9 },
                            { num: 3 },
                            { num: 6 },
                            { num: 1 },
                            { num: 8 },
                            { num: 2 },
                            { num: 4 },
                            { num: 5 },
                        ],
                        [
                            { num: 5 },
                            { num: 6 },
                            { num: 2 },
                            { num: 3 },
                            { num: 7 },
                            { num: 4 },
                            { num: 9 },
                            { num: 1 },
                            { num: 8 },
                        ],
                        [
                            { num: 4 },
                            { num: 2 },
                            { num: 7 },
                            { num: 8 },
                            { num: 3 },
                            { num: 6 },
                            { num: 5 },
                            { num: 9 },
                            { num: 1 },
                        ],
                        [
                            { num: 1 },
                            { num: 8 },
                            { num: 6 },
                            { num: 5 },
                            { num: 9 },
                            { num: 7 },
                            { num: 4 },
                            { num: 2 },
                            { num: 3 },
                        ],
                        [
                            { num: 3 },
                            { num: 5 },
                            { num: 9 },
                            { num: 1 },
                            { num: 4 },
                            { num: 2 },
                            { num: 6 },
                            { num: 8 },
                            { num: 7 },
                        ],
                        [
                            { num: 6 },
                            { num: 7 },
                            { num: 5 },
                            { num: 2 },
                            { num: 8 },
                            { num: 9 },
                            { num: 1 },
                            { num: 3 },
                            { num: 4 },
                        ],
                        [
                            { num: 9 },
                            { num: 3 },
                            { num: 8 },
                            { num: 4 },
                            { num: 6 },
                            { num: 1 },
                            { num: 7 },
                            { num: 5 },
                            { num: 2 },
                        ],
                        [
                            { num: 2 },
                            { num: 1 },
                            { num: 4 },
                            { num: 7 },
                            { num: 5 },
                            { num: 3 },
                            { num: 8 },
                            { num: 6 },
                            { num: 9 },
                        ],
                    ];

                    let sudoku = { id: 0, sudoku: primerSudoku };
                    magatzem.add(sudoku);
                    sudoku = { id: 1, sudoku: segonSudoku };
                    magatzem.add(sudoku);
                    sudoku = { id: 2, sudoku: tercerSudoku };
                    magatzem.add(sudoku);
                } catch {
                    console.log(`Excepció durant l'inserció dels sudokus`)
                }

            };
        };
    }

    async recullRandomSudoku() {
        return new Promise((resolve, reject) => {

            const peticio = window.indexedDB.open(this.DB_NAME, this.DB_VERSION);

            peticio.onerror = ev => {
                console.log(`Error a l'hora d'obrir la BD.`);
                return undefined;
            };

            peticio.onsuccess = ev => {
                const db = ev.target.result;
                let trans = db.transaction([this.DB_OBJECT],'readonly');
                trans.oncomplete = e => {
                    resolve(sudoku);
                };
                
                let store = trans.objectStore(this.DB_OBJECT);
                let sudoku = [];
                const randomId = Math.floor(Math.random() * 3);
                
                store.openCursor(randomId).onsuccess = e => {
                    let cursor = e.target.result;
                    if (cursor) {
                        sudoku = cursor.value.sudoku;
                        cursor.continue();
                    }
                };
            }
    
    
        });
    }
}
