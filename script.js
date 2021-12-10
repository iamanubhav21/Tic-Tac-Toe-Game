var TicTacToe = {
    //initialise TicTacToe variables
    init: function () {
        this.symbols = ["X", "O"];
        this.squares = Array.from(document.querySelectorAll(".square"));
        this.turnIndicator = document.querySelector(".turnIndicator");
        this.button = document.querySelector(".newGame");
        this.board = document.querySelector(".board");
        //winning positions on board
        this.winningSets = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        //adding click event listeners to squares and buttons
        TicTacToe.addEventListeners();
        //new game reset
        TicTacToe.newGame();
    },
    //adding click event listeners to squares and buttons
    addEventListeners: function () {
        var ttt = this;
        //for each square adding click listener which will call play
        this.squares.forEach(function (x) {
            x.addEventListener("click", function () {
                ttt.play(this);
            })
        })
        // newgame button is clicked call newGame function
        this.button.addEventListener("click", function () {
            ttt.newGame();
        });
    },
    //new game
    newGame: function () {
        //set player to X
        this.activePlayer = 0;
        //reset game over variable
        this.gameOver = false;
        //remove all X and O classes from every square
        this.squares.forEach(function (x) {
            x.classList.remove(TicTacToe.symbols[0]);
            x.classList.remove(TicTacToe.symbols[1]);
        })
        // remove game over class from board if it exists
        this.board.classList.remove("gameOver");
        this.setTurnIndicator();
    },

    // set turn indicator to indicate whose turn 
    setTurnIndicator: function () {
        this.turnIndicator.innerText = this.symbols[this.activePlayer] + "'s turn."
    },

    play: function (el) {
        // make sure square is not filled
        if (!this.gameOver && el.classList.length == 1) {
            // set the contents to ur players symbol
            el.classList.add(this.symbols[this.activePlayer]);
            // check if you won
            if (this.checkWin()) {
                //set game text to show winner
                this.turnIndicator.innerText = this.symbols[this.activePlayer] + " wins!";
                // call game over function
                this.endGame();
            }
            // check if there is a draw
            else if (this.checkDraw()) {
                //set game text to show draw
                this.turnIndicator.innerText = "Its a draw!";
                // call game over function
                this.endGame();
            }
            // go to the next player's turn
            else {
                //change turn 0 to 1 and 1 to 0
                this.activePlayer = 1 - this.activePlayer;
                //set turn indicator text
                this.setTurnIndicator();
            }
        }
    },

    //check if player won
    checkWin: function () {
        var ttt = this;
        // if player symbol in all elements of current set return true else false
        return this.winningSets.some(function (x) {
            return x.every(function (i) {
                return Array.from(ttt.squares[i].classList).indexOf(ttt.symbols[ttt.activePlayer]) > -1;
            })
        })
    },

    //check for draw
    checkDraw: function () {
        return this.squares.every(function (x) {
            return x.classList.length > 1;
        })
    },

    //set game over variable and board class when game ends
    endGame: function () {
        this.gameOver = true;
        this.board.classList.add("gameOver");
    }
}

// call the init() function of TicTacToe when the page loads
window.onload = TicTacToe.init();