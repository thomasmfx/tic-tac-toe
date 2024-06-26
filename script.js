const game = (function() {
    let board = {
        row1: [0, 1, 2],
        row2: [0, 1, 2],
        row3: [0, 1, 2]
    };

    const restartBtn = document.querySelector('#restart');
    restartBtn.addEventListener("click", () => {
        gameActions.reset()
    })

    return { board };
})();

const gameActions = (function() {
    let lastTurn = null;
    const placeholders = document.querySelectorAll('.placeholder');

    function getScore() {
        console.log(`${players.p1.name}: ${players.p1.score} | ${players.p2.name}: ${players.p2.score}`);
    };
    
    function showBoard() {
        console.table(game.board);
    };

    function isIndexAvailable(i) {
        return i >= 0 && i <= 2 ? true : false;
    };

    function isPlayerTurn(player) {
        return lastTurn === player ? false : true;
    };

    function reset() {
        game.board = {
            row1: [0, 1, 2],
            row2: [0, 1, 2],
            row3: [0, 1, 2]
        };

        placeholders.forEach(placeholder => {
            placeholder.firstElementChild.src = '';
        })
    };

    placeholders.forEach(placeholder => {
        placeholder.addEventListener("click", () => {
            let row = placeholder.dataset.row;
            let index = placeholder.dataset.index;
            if(players.p1 !== undefined && players.p2 !== undefined) {
                let img = placeholder.firstElementChild.src;
                if(!img.includes('svg')) {
                    gameActions.playRound(players.p1, row, index, players.p2);
                    placeholder.firstElementChild.src = lastTurn.domMarker;
                    checkResult(lastTurn);
                };
            } else {
                const inputs = document.querySelectorAll("input")
                inputs.forEach(input => input.style.borderColor = 'red')
            };
        });
    });

    function playRound(player1, row, index, player2) {
        if(isIndexAvailable(index) === true &&
        game.board[`${row}`][index] <= 2) {
            if(isPlayerTurn(player1) || lastTurn === null) {
                game.board[`${row}`][index] = player1.marker;
                showBoard();
                lastTurn = player1;
            } else {
                game.board[`${row}`][index] = player2.marker;
                showBoard();
                lastTurn = player2;
            };
        } else {
            console.log('Posição indisponível.');
        };
    };

    return { 
        getScore, 
        showBoard,
        reset,
        playRound
    };
})();

const players = (function() {
    let p1;
    let p2;
    const createP1 = document.querySelector('#player1-btn');
    const createP2 = document.querySelector('#player2-btn');
    
    function createPlayer(name, marker, domMarker, identifier) {
        let score = 0;
        
        return {
            name,
            marker,
            domMarker,
            score,
            identifier,
            updateScore(player) { 
                player.score++;
                let domScore = document.querySelector(`#${player.identifier}-score`);
                return domScore.textContent = player.score;
            }
        };
    };

    // Player 1
    createP1.addEventListener("click", () => {
        const p1Card = document.querySelector('#player1');
        const p1Name = document.querySelector('#player1-input');
        if(p1Name.value !== '') {
            players.p1 = createPlayer(p1Name.value, 'X', 'assets/x.svg', 'p1');
        
            p1Card.lastElementChild.remove();
            p1Card.lastElementChild.remove();
        
            p1Card.appendChild(createElementWithId('p', 'p1-name', p1Name.value));
            p1Card.appendChild(createElementWithId('p', 'p1-score', players.p1.score));
        }
    });

    // Player 2
    createP2.addEventListener("click", () => {
        const p2Card = document.querySelector('#player2');
        const p2Name = document.querySelector('#player2-input');
        if(p2Name.value !== '') {
            players.p2 = createPlayer(p2Name.value, 'O', 'assets/circle.svg', 'p2');
        
            p2Card.lastElementChild.remove();
            p2Card.lastElementChild.remove();
        
            p2Card.appendChild(createElementWithId('p', 'p2-name', p2Name.value));
            p2Card.appendChild(createElementWithId('p', 'p2-score', players.p2.score));
        }
    });

    return {
        p1,
        p2,
        createPlayer
    }
})();

function checkResult(player) {
    const row1 = game.board['row1'],
        row2 = game.board['row2'],
        row3 = game.board['row3'];

    // Rows
    if((row1[0] === row1[1] && 
        row1[1] === row1[2]) ||
        (row2[0] === row2[1] && 
        row2[1] === row2[2]) ||
        (row3[0] === row3[1] && 
        row3[1] === row3[2])) {
        console.log(`${player.name} won!`);
        return player.updateScore(player), gameActions.reset(), gameActions.getScore();
    } 
    
    // Diagonal
    if((row1[0] === row2[1] &&
        row2[1] === row3[2]) ||
        (row1[2] === row2[1] &&
        row2[1] === row3[0])) {
        console.log(`${player.name} won!`);
        return player.updateScore(player), gameActions.reset(), gameActions.getScore();
    } 
     
    //Columns
    if(row1[0] !== 0 && row2[0] !== 0 && row3[0] !== 0) {
        if(row1[0] === row2[0] &&
            row2[0] === row3[0]) {
            console.log(`${player.name} won!`);
            return player.updateScore(player), gameActions.reset(), gameActions.getScore();
        };
    } else if((row1[1] !== 1 && row2[1] !== 1 && row3[1] !== 1)) {
        if((row1[1] === row2[1] &&
            row2[1] === row3[1])) {
            console.log(`${player.name} won!`);
            return player.updateScore(player), gameActions.reset(), gameActions.getScore();
        };
    } else if((row1[2] !== 2 && row2[2] !== 2 && row3[2] !== 2)) {
        if(row1[2] === row2[2] &&
            row2[2] === row3[2]) {
            console.log(`${player.name} won!`);
            return player.updateScore(player), gameActions.reset(), gameActions.getScore();
        };
    };
};

function createElementWithId(el, id, text) {
    let element = document.createElement(`${el}`);
    element.id = id;
    element.textContent = text;
    return element;
};

function createElementWithClass(el, cl, text) {
    let element = document.createElement(`${el}`);
    element.classList.add(cl);
    element.textContent = text;
    return element;
};