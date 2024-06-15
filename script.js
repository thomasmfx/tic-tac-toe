const gameBoard = (function() {
    let board = {
        row1: [0, 1, 2],
        row2: [0, 1, 2],
        row3: [0, 1, 2]
    };

    return { board }
})();

const game = (function() {
    let lastTurn = null;

    function getScore() {
        return `${player1.name}: ${player1.getScore()} | ${player2.name}: ${player2.getScore()}`;
    };
    
    function showBoard() {
        console.table(gameBoard.board)
    };

    function isPlayerTurn(player) {
        return lastTurn === player ? false : true;
    };

    function reset() {
        gameBoard.board = {
            row1: [0, 1, 2],
            row2: [0, 1, 2],
            row3: [0, 1, 2]
        }
    };

    function playRound(player, row, index, enemy) {
        if(isPlayerTurn(player) || lastTurn === null) {
            if(isIndexAvailable(index) === true &&
            gameBoard.board[`${row}`][index] <= 2) {
                gameBoard.board[`${row}`][index] = player.marker;
                showBoard();
            } else {
                console.log('Posição indisponível.')
            };
            console.log(`${enemy.name}'s turn`)
            lastTurn = player
        } else {
            console.log(`It's ${enemy.name}'s turn`)
        };
    };

    return { 
        getScore, 
        showBoard,
        isPlayerTurn, 
        reset,
        playRound, 
        lastTurn
    };
})();

function isIndexAvailable(i) {
    return i >= 0 && i <= 2 ? true : false;
};

function createPlayer(name, marker) {
    let score = 0;
    
    return {
        name,
        marker,
        score,
        updateScore() { 
            score++
            return score;
        },
        getScore() {
            return score;
        }
    };
};

function checkResult(player) {
    const row1 = gameBoard.board['row1'],
        row2 = gameBoard.board['row2'],
        row3 = gameBoard.board['row3'];

    // Rows
    if((row1[0] === row1[1] && 
        row1[1] === row1[2]) ||
        (row2[0] === row2[1] && 
        row2[1] === row2[2]) ||
        (row3[0] === row3[1] && 
        row3[1] === row3[2])) {
        console.log(`${player.name} won!`);
        return player.updateScore();
    } 
    
    // Diagonal
    if((row1[0] === row2[1] &&
        row2[1] === row3[2]) ||
        (row1[2] === row2[1] &&
        row2[1] === row3[0])) {
        console.log(`${player.name} won!`);
        return player.updateScore();
    } 
     
    //Columns
    if(row1[0] !== 0 && row2[0] !== 0 && row3[0] !== 0) {
        if(row1[0] === row2[0] &&
            row2[0] === row3[0]) {
            console.log(`${player.name} won!`);
            player.updateScore();
        };
    } else if((row1[1] !== 1 && row2[1] !== 1 && row3[1] !== 1)) {
        if((row1[1] === row2[1] &&
            row2[1] === row3[1])) {
            console.log(`${player.name} won!`);
            return player.updateScore();
        };
    } else if((row1[2] !== 2 && row2[1] !== 2 && row3[2] !== 2)) {
        if(row1[2] === row2[2] &&
            row2[2] === row3[2]) {
            console.log(`${player.name} won!`);
            return player.updateScore();
        };
    };
};