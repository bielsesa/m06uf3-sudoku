window.onload = () => {
    const storage = window.localStorage;
    let playerTimes = storage.getItem('puntuacions');
    const table = document.getElementById('player-times'); // potser es poden guardar com a JSON al localStorage
    console.log(`Taula: ${table.id}`);

    if (playerTimes != null) {
        playerTimes = playerTimes.split(';');
        playerTimes.sort((a, b) => parseFloat(a) > parseFloat(b));

        playerTimes.forEach(item => {
            const row = table.insertRow(0);
            const cell = row.insertCell(0);
            cell.innerText = item;
            console.log(`Item: ${item}`);
        });
    }

    // const vm = new Vue({
    //     // options
    // });
};
