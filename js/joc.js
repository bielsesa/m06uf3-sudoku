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
        isGameFinished: false,
        isIndexdbSupported: true,
        time: 0,
        timeInterval: undefined,
    },

    methods: {
        async initializeGame() {
            // lectura del sudoku random de IndexedDB
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
            this.isGameFinished = false;

            // comença el timer
            console.log('comença el timer');
            time = 0;
            this.timeInterval = setInterval(() => {
                this.time += 1;
                // cada segon actualitzar temps
            }, 1000);
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
                    this.isGameFinished = true;
                    clearInterval(this.timeInterval);

                    //guarda el temps en localstorage
                    const playerTimes = JSON.parse(window.localStorage.getItem('playerTimes'));
                    console.log('Player times:');
                    console.log(playerTimes);
                    playerTimes.push(this.time);
                    window.localStorage.setItem('playerTimes', JSON.stringify(playerTimes));
                    this.time = 0;
                    console.log('Player times (updated):');
                    console.log(playerTimes);
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
