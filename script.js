const game = (function() {
    let score = 0;
    let board = {
        row1: [0, 1, 2],
        row2: [0, 1, 2],
        row3: [0, 1, 2]
    };
    
    function getScore() {
        return score;
    };

    function updateScore() {
        score++
        return score;
    };

    function playRound(player, row, index) {
        if(isIndexAvailable(index) === true) {
            if(board[`${row}`][index] < 2) {
                board[`${row}`][index] = player.marker
                console.table(board)
            } else {
                console.log('Posição indisponível.')
            }
        } else {
            console.log('Posição indisponível.')
        }
    };

    return { getScore, updateScore, playRound };
})();

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

function isIndexAvailable(i) {
    return i >= 0 && i <= 2 ? true : false
};