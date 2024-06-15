const gameBoard = (function() {
    let board = {
        row1: [0, 1, 2],
        row2: [0, 1, 2],
        row3: [0, 1, 2]
    };

    return { board }
})();

const game = (function() {
    let score = 0;

    function getScore() {
        return score;
    };

    function updateScore() {
        score++
        return score;
    };

    function showBoard() {
        console.table(gameBoard.board)
    };

    function playRound(player, row, index) {
        if(isIndexAvailable(index) === true) {
            if(gameBoard.board[`${row}`][index] <= 2) {
                gameBoard.board[`${row}`][index] = player.marker;
                showBoard();
                checkResult(player.name)
            } else {
                console.log('Posição indisponível.')
            }
        } else {
            console.log('Posição indisponível.')
        }
    };

    return { getScore, updateScore, showBoard, playRound };
})();

function isIndexAvailable(i) {
    return i >= 0 && i <= 2 ? true : false
};

function createPlayer(name, marker) {
    let score = 0;
    
    return {
        name,
        marker,
        score,
        updateScore() { 
            score += 1
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
        console.log(`${player} won!`)
        return player.updateScore()
    } 
    
    // Diagonal
    if((row1[0] === row2[1] &&
        row2[1] === row3[2]) ||
        (row1[2] === row2[1] &&
        row2[1] === row3[0])) {
        console.log(`${player} won!`)
        return player.updateScore()
    } 
    
    //Columns (1-2-3)
    if(row1[0] !== 0 && row2[0] !== 0 && row3[0] !== 0) {
        if(row1[0] === row2[0] &&
            row2[0] === row3[0]) {
            console.log(`${player} won!`)
            return player.updateScore()
        };
    } else if((row1[1] !== 1 && row2[1] !== 1 && row3[1] !== 1)) {
        if((row1[1] === row2[1] &&
            row2[1] === row3[1])) {
            console.log(`${player} won!`)
            return player.updateScore()
        };
    } else if((row1[2] !== 2 && row2[1] !== 2 && row3[2] !== 2)) {
        if(row1[2] === row2[2] &&
            row2[2] === row3[2]) {
            console.log(`${player} won!`)
            return player.updateScore()
        };
    };
};