const gameBoard = (function() {
    let board = {
        row1: [0, 1, 2],
        row2: [0, 1, 2],
        row3: [0, 1, 2]
    };

    return { board };
})();

const game = (function() {
    let lastTurn = null;
    const placeholders = document.querySelectorAll('.placeholder');

    function getScore() {
        console.log(`${players.p1.name}: ${players.p1.getScore()} | ${players.p2.name}: ${players.p2.getScore()}`);
    };
    
    function showBoard() {
        console.table(gameBoard.board);
    };

    function isIndexAvailable(i) {
        return i >= 0 && i <= 2 ? true : false
    };

    function isPlayerTurn(player) {
        return lastTurn === player ? false : true;
    };

    function reset() {
        gameBoard.board = {
            row1: [0, 1, 2],
            row2: [0, 1, 2],
            row3: [0, 1, 2]
        };
    };

    placeholders.forEach(placeholder => {
        placeholder.addEventListener("click", () => {
            let row = placeholder.dataset.row
            let index = placeholder.dataset.index
            // if(players.p1 !== undefined && players.p2 !== undefined) {
                let img = placeholder.firstElementChild.src;
                if(!img.includes('svg')) {
                    game.playRound(players.p1, row, index, players.p2)
                    placeholder.firstElementChild.src = lastTurn.domMarker
                };
            // } else {
            //     alert('Assign players')
            // };
        });
    });

    function playRound(player1, row, index, player2) {
        if(isIndexAvailable(index) === true &&
        gameBoard.board[`${row}`][index] <= 2) {
            if(isPlayerTurn(player1) || lastTurn === null) {
                gameBoard.board[`${row}`][index] = player1.marker;
                showBoard();
                checkResult(player1);
                lastTurn = player1;
            } else {
                gameBoard.board[`${row}`][index] = player2.marker;
                showBoard();
                checkResult(player2);
                lastTurn = player2;
            };
        } else {
            console.log('Posição indisponível.');
        };
    };

    return { 
        getScore, 
        showBoard,
        isIndexAvailable,
        isPlayerTurn, 
        reset,
        playRound
    };
})();

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
        return player.updateScore(), game.reset(), game.getScore();
    } 
    
    // Diagonal
    if((row1[0] === row2[1] &&
        row2[1] === row3[2]) ||
        (row1[2] === row2[1] &&
        row2[1] === row3[0])) {
        console.log(`${player.name} won!`);
        return player.updateScore(), game.reset(), game.getScore();
    } 
     
    //Columns
    if(row1[0] !== 0 && row2[0] !== 0 && row3[0] !== 0) {
        if(row1[0] === row2[0] &&
            row2[0] === row3[0]) {
            console.log(`${player.name} won!`);
            return player.updateScore(), game.reset(), game.getScore();
        };
    } else if((row1[1] !== 1 && row2[1] !== 1 && row3[1] !== 1)) {
        if((row1[1] === row2[1] &&
            row2[1] === row3[1])) {
            console.log(`${player.name} won!`);
            return player.updateScore(), game.reset(), game.getScore();
        };
    } else if((row1[2] !== 2 && row2[1] !== 2 && row3[2] !== 2)) {
        if(row1[2] === row2[2] &&
            row2[2] === row3[2]) {
            console.log(`${player.name} won!`);
            return player.updateScore(), game.reset(), game.getScore();
        };
    };
};

const players = (function() {
    let p1;
    let p2;
    const createP1 = document.querySelector('#player1-btn');
    const createP2 = document.querySelector('#player2-btn');
    
    function createPlayer(name, marker, domMarker) {
        let score = 0;
        
        return {
            name,
            marker,
            domMarker,
            score,
            updateScore(player) { 
                players[player].score += 1
                let domScore = document.querySelector(`#${player}-score`)
                domScore.textContent = players[player].score
            },
            getScore() {
                return score;
            }
        };
    };

    // Player 1
    createP1.addEventListener("click", () => {
        const p1Card = document.querySelector('#player1');
        const p1Name = document.querySelector('#player1-input').value;
        if(p1Name !== '' && p1Name.length <= 13) {
            players.p1 = createPlayer(p1Name, 'X', 'assets/x.svg');
        
            p1Card.lastElementChild.remove();
            p1Card.lastElementChild.remove();
        
            p1Card.appendChild(createElementWithId('p', 'p1-name', p1Name))
            p1Card.appendChild(createElementWithId('p', 'p1-score', players.p1.score))
        } else {
            alert('Name is invalid/too long.')
        }
    });

    // Player 2
    createP2.addEventListener("click", () => {
        const p2Card = document.querySelector('#player2');
        const p2Name = document.querySelector('#player2-input').value;
        if(p2Name !== '' && p2Name.length <= 13) {
            players.p2 = createPlayer(p2Name, 'O', 'assets/circle.svg');
        
            p2Card.lastElementChild.remove();
            p2Card.lastElementChild.remove();
        
            p2Card.appendChild(createElementWithId('p', 'p2-name', p2Name))
            p2Card.appendChild(createElementWithId('p', 'p2-score', players.p2.score))
        } else {
            alert('Name is invalid/too long.')
        }
    });

    return {
        p1,
        p2,
        createPlayer
    }
})();

function createElementWithId(el, id, text) {
    let element = document.createElement(`${el}`);
    element.id = id;
    element.textContent = text;
    return element
};

function createElementWithClass(el, cl, text) {
    let element = document.createElement(`${el}`);
    element.classList.add(cl);
    element.textContent = text;
    return element
};

function getElement(el) {
    return document.querySelector(`${el}`)
};