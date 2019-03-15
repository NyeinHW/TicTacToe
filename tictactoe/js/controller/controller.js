import Player from '/js/model/Player.js';
import gameModel from '/js/model/gameModel.js';
import gameView from '/js/view/gameView.js';
import registerView from '/js/view/registerView.js';
import scoreBoardView from '/js/view/scoreBoardView.js';

const gameController = {

    /**
     * init function for the main controller
     * object creation will happen here
     */
    init() {

        this.assignPlayer();
        gameView.init(this);
        gameView.hide();
        scoreBoardView.init(this);
        registerView.init(this);
        this.registerSW();
    },

    registerSW() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js', {
                    scope: '/'
                })
                .then(function (registration) {
                    console.log('Service Worker Registered');
                });

            navigator.serviceWorker.ready.then(function (registration) {
                console.log('Service Worker Ready');
            });
        }
    },

    assignPlayer(player1Name, player2Name) {
        //Restart the index
        gameModel.current_player_index = 1;

        //change game status
        gameModel.gameStatus = 'ongoing';

        gameModel.winningMoves = [];

        gameModel.player1 = new Player(player1Name, 'O','grey');
        gameModel.player2 = new Player(player2Name, 'X','white');
    },

    /**
     * Check if the given position list is enough to end the game
     * 
     * @param {Array} positions 
     * @param {Array} wining_positions gameModel
     */
    isGameEnd(positions, wining_positions) {

        //looping over positions 
        for (const index in wining_positions) {
            let is_game_end = true;
            const winningMoves = [];
            //looping over item
            for (const j in wining_positions[index]) {
                const current_wining_position = wining_positions[index][j];

                //if not matching item is found
                //End the search
                if (positions.indexOf(current_wining_position) === -1) {
                    is_game_end = false;
                }
                else{
                    winningMoves.push(current_wining_position);
                }
            }
            if (is_game_end) {
                gameModel.winningMoves  =  winningMoves;
                return true;
            }
        }
        return false;
    },

    /**
     * Check if the game have out of move
     * @param {Array} p1Position 
     * @param {Array} p2Position 
     * @param {Int} totalPossiblePosition 
     */
    isGameDraw(p1Position, p2Position, totalPossiblePosition) {
        if (p1Position.length + p2Position.length === totalPossiblePosition) {
            return true;
        }

        return false;
    },

    addPosition(position) {
        //current player's position store
        gameModel.currentPlayer.position.push(position);

        //check if the game is end
        const result = this.isGameEnd(
            gameModel.currentPlayer.position,
            gameModel.wining_positions
        )

        //change the current user
        //do not change the player if the game is already end
        if (!result) {

            //Mark as draw if game have no more possible move
            if (this.isGameDraw(
                    gameModel.player1.position,
                    gameModel.player2.position,
                    gameModel.totalPositions
                )) {
                gameModel.gameStatus = 'draw';
            }
            //Change Player
            else {
                this.changePlayer();
            }
        } 
        //Someone win the game
        else {
            //Save in the local storage
            
            const currentWinnerList = gameModel.winnerList;
            currentWinnerList.push(gameModel.currentPlayer.name);            
            gameModel.winnerList = currentWinnerList;
            gameModel.gameStatus = 'complete';
            scoreBoardView.render();
        }

        //re-render~

        gameView.render();
    },

    changePlayer() {
        if (gameModel.current_player_index === 1) {
            gameModel.current_player_index = 2;
        } else {
            gameModel.current_player_index = 1;
        }
    },
    getGameStatus() {
        return gameModel.gameStatus;
    },
    getAllPLayer() {
        return [gameModel.player1, gameModel.player2];
    },

    getCurrentPlayer() {
        return gameModel.currentPlayer;
    },
    restartGame() {
        this.startGame(gameModel.player1.name, gameModel.player2.name);
    },
    startGame(player1Name, player2Name) {
        this.assignPlayer(player1Name, player2Name);

        registerView.hide();

        gameView.render();
    },

    endGame() {
        registerView.clear();
        registerView.show();
        gameView.hide();
    },
    /**
     * Return winning patterns to high light
     */
    getWinningMoves : function(){
        return gameModel.winningMoves;
    },
    /**
     * Get list of the winner
     * Group by array.reduce
     */
    getWinnerList: function () {

        const group_by_count = gameModel.winnerList.reduce((obj, item, index) => {
            console.log(obj, item);
            obj[item] = obj[item] || {
                name: item,
                count: 0
            };
            obj[item] = {
                name: item,
                count: obj[item].count + 1
            };
            return obj;
        }, []);

        const keys = Object.keys(group_by_count);
        const values = keys.map(function (key) {
            console.log(key);
            console.log(group_by_count[key]);
            return group_by_count[key];
        });
        const sorted_array = values.sort((a, b) => {
            return b.count - a.count;
        })
        console.log(sorted_array);
        return sorted_array;

    },
};

export default gameController;