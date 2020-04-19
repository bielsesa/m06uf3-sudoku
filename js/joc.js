/* eslint-disable no-plusplus */
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
        initializeGame() {
            // lectura del sudoku random de IndexedDB
            // const DbHelper = new DbHelper();

            // const defaultSudokuMatrix = DbHelper.recullRandomSudoku();
            const defaultSudokuMatrix = [
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
