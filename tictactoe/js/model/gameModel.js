const gameModel = {
    current_player_index: 1,

    get currentPlayer() {
        if (this.current_player_index === 1) {
            return this.player1;
        } else {
            return this.player2;
        }
    },
    get winnerList(){
        const winners =  localStorage.getItem("winners");
        if(winners !== null){
            return JSON.parse(winners);
        }

        return [];
    },
    set winnerList(value){
        const stringifyValue = JSON.stringify(value);
        localStorage.setItem('winners',stringifyValue);
    },
    player1: {},
    player2: {},
    totalPositions : 9, //Size of game board
    wining_positions: [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7]
    ],
    winningMoves : [],
    gameStatus : 'ongoing' //ongoing,complete,draw

};

export default gameModel;