if (!('indexedDB' in window)) {
    console.log('Aquest navegador no suporta IndexedDB');
}

const indexed = new DbHelper();
indexed.comprovaExistsSinoInicialitza();

const indexApp = new Vue({
    el: '#app-index',
    created() {
        // comprovació de compatibilitat amb IndexedDB
        // if (!('indexedDB' in window)) {
        //     console.log('Aquest navegador no suporta IndexedDB');
        //     this.isIndexdbSupported = false;
        //     return;
        // }

        // lectura de les dades de temps (si existeixen)
        const playerTimesJSON = window.localStorage.getItem('playerTimes');

        if (playerTimesJSON != null && playerTimesJSON !== '') {
            this.playerTimes = JSON.parse(playerTimesJSON);
            console.log(`Player times: ${this.playerTimes}`);

            this.playerTimes.sort((a, b) => parseFloat(a) - parseFloat(b));
            // retorna les tres millors puntuacions
            this.playerTimes = this.playerTimes.slice(0, 4);
            console.log(`Times JSON (després d'ordre i slice):${JSON.stringify(this.playerTimes)}`);
        }
    },
    data: {
        isIndexdbSupported: true,
        playerTimes: [],
    },
    methods: {
        carregarJoc() {
            document.location = 'joc.html';
        },
    },
});
