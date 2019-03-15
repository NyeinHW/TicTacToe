const gameView = {
    init(controller) {
        this.controller = controller;
        //Select all checkbox
        this.checkboxes = document.querySelectorAll(".board input[type='checkbox']");
        this.restartBtn = document.querySelector('#restart-game');
        this.endGameBtn = document.getElementById("end-game");
        this.playerName = document.querySelectorAll(".current-player");
        this.currentView = document.getElementById("gameView");
        this.headerViewPort = document.getElementById("gameViewHeader");
        this.headerTemplate = document.getElementById("gameview-header-template").innerHTML;
        this.winningMessage = `
            <div class='alert alert-success hide'>
                Congratulations {{currentPlayer}}. You win the game!!!
            </div>
        `;
        this.drawMessage = `
            <div class='alert alert-warning hide'>
                The game is draw.
            </div>
        `;

        for (const box of this.checkboxes) {
            box.addEventListener('change', (event) => this.checkboxChange(event));
        }

        this.restartBtn.addEventListener('click', () =>
            this.controller.restartGame()
        );

        this.endGameBtn.addEventListener('click', () => {
            this.controller.endGame();
        });

        //this.render();

    },

    render() {

        this.show();

        this.clearBoard();

        const allPlayers = this.controller.getAllPLayer();
        const gameStatus = this.controller.getGameStatus();

        const statusMessage = gameStatus === "complete" ? this.winningMessage : gameStatus === "draw" ? this.drawMessage : "";

        console.log(gameStatus, statusMessage);
        this.headerViewPort.innerHTML = this.headerTemplate
            .replace('{{player1Name}}', allPlayers[0].name)
            .replace('{{player1Mark}}', allPlayers[0].mark)
            .replace('{{player2Name}}', allPlayers[1].name)
            .replace('{{player2Mark}}', allPlayers[1].mark)
            .replace('{{gameStatus}}', statusMessage.replace('{{currentPlayer}}', this.controller.getCurrentPlayer().name))
            .replace('{{currentPlayer}}', this.controller.getCurrentPlayer().name);



        for (const player of allPlayers) {
            for (const position of player.position) {
                const selector = `.board input[value='${position}']`;
                const current_checkbox = document.querySelector(selector);
                current_checkbox.checked = true;
                current_checkbox.disabled = true;
                current_checkbox.parentNode.querySelector('label').textContent = player.mark;
                current_checkbox.parentNode.querySelector('label').classList.add(player.color);
            }
        }

        this.showWinningPattern();
    },

    clearBoard() {
        for (const box of this.checkboxes) {
            box.checked = false;
            box.disabled = false;
            box.parentNode.querySelector('label').textContent = "";
            box.parentNode.querySelector('label').className = "";
        }
    },

    checkboxChange(event) {
        const checkbox_obj = event.target;
        const current_block = parseInt(checkbox_obj.value);
        checkbox_obj.disabled = true;
        this.controller.addPosition(current_block);
    },
    show() {
        this.currentView.style.display = "block";
    },

    hide() {
        this.currentView.style.display = "none";
    },

    showWinningPattern: function () {

        this.checkboxes.forEach(element => {
            const value = parseInt(element.value);
            const winningMoves = this.controller.getWinningMoves();
            if (winningMoves.includes(value)) {
                element.nextSibling.classList.add("wining-position");
            }
        });
    },
}

export default gameView;