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
            if(gameBoard.board[`${row}`][index] < 2) {
                gameBoard.board[`${row}`][index] = player.marker;
                showBoard();
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