const indexeddb = new DbHelper();

const sudokuApp = new Vue({
    el: '#app-sudoku',

    data: {
        sudokuMatrix: [],
        initializeGameText: 'Començar!',
        evaluateGameText: 'Verificar!',
        answerImage: '',
        isGameStarted: false,
        showAnswer: false,
        isIndexdbSupported: true,
        time: 0,
    },

    methods: {
        async initializeGame() {
            // lectura del sudoku random de IndexedDB
            console.log('Abans de recullRandomSudoku');
            // console.log('Després de recullRandomSudoku:');
            defaultSudokuMatrix = await indexeddb.recullRandomSudoku();
            
            // Empty two random cells per row
            for (let i = 0; i < defaultSudokuMatrix.length; ++i) {
                for (let k = 0; k < 2; ++k) {
                    const randomColumnIndex = Math.floor(Math.random() * defaultSudokuMatrix.length);
                    defaultSudokuMatrix[i][randomColumnIndex].num = '';
                }
            }

            this.sudokuMatrix = defaultSudokuMatrix;
            this.initializeGameText = 'Reiniciar';
            this.isGameStarted = true;

            // comença el timer
            console.log('comença el timer');
        },

        evaluateGame() {
            const copyOfSudokuMatrix = [];
            for (let i = 0; i < this.sudokuMatrix.length; ++i) {
                if (!copyOfSudokuMatrix[i]) copyOfSudokuMatrix[i] = [];

                for (let k = 0; k < this.sudokuMatrix[i].length; ++k) {
                    copyOfSudokuMatrix[i][k] = this.sudokuMatrix[i][k].num;
                }
            }

            const sudokuSolv = new Sudoku();
            const sudokuSolver = sudokuSolv.init(copyOfSudokuMatrix);
            const answImgRand = Math.floor(Math.random() * 7) + 1;

            if (sudokuSolver.isValid()) {
                this.answerImage = `img/success/${answImgRand}.gif`;
                this.showAnswer = true;
                this.isGameStarted = false;

                setTimeout(() => {
                    this.showAnswer = false;
                    this.isGameStarted = true;
                }, 2000);
            } else {
                this.answerImage = `img/fail/${answImgRand}.gif`;
                this.showAnswer = true;
                this.isGameStarted = false;

                setTimeout(() => {
                    this.showAnswer = false;
                    this.isGameStarted = true;
                }, 2000);
            }
        },
    },
});
