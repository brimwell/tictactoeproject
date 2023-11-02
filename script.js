let playerOne = {
    name: 'Player One',
    marker: 'X'
};

let playerTwo = {
    name: 'Player Two',
    marker: 'O'
}

let activePlayer;

let playerOneName = document.getElementById('playerOneName');
let playerTwoName = document.getElementById('playerTwoName');



function createCell() {
    let value = 'blank';
    function changeVal() {
            this.value = activePlayer.marker;
        }
    return { value, changeVal }
}

let board = [createCell(), createCell(), createCell(), createCell(), createCell(), createCell(), createCell(), createCell(), createCell()];

const grid = document.getElementById('grid');
const player1 = document.getElementById('playerOne');
const player2 = document.getElementById('playerTwo');

function displayBoard() {
    for (i = 0; i < board.length; i++) {
        let gridCell = document.createElement('button');
        gridCell.setAttribute('id', `${i}`);
        gridCell.setAttribute('disabled', '');
        grid.appendChild(gridCell);
    }
}

displayBoard();





function switchActive() {
    if (!activePlayer) {
        let randomNum = Math.floor(Math.random() * 100);
        if (randomNum >= 0 && randomNum < 50) {
            activePlayer = playerOne;
            player1.classList.add('active');
        } else {
            activePlayer = playerTwo;
            player2.classList.add('active');
        }
    } else if (activePlayer === playerOne) {
        activePlayer = playerTwo;
        player1.classList.remove('active');
        player2.classList.add('active');
    } else {
        activePlayer = playerOne;
        player2.classList.remove('active');
        player1.classList.add('active');
    }
    console.log(activePlayer);
    console.log(`It is the turn of ${activePlayer.name}`);
}

function checkWinner() {
    if (board[0].value === board[1].value && 
        board[0].value === board[2].value &&
        board[0].value !== 'blank' || 
        board[0].value === board[3].value &&
        board[0].value === board[6].value &&
        board[0].value !== 'blank' ||
        board[0].value === board[4].value &&
        board[0].value === board[8].value &&
        board[0].value !== 'blank' ||
        board[3].value === board[4].value &&
        board[3].value === board[5].value &&
        board[3].value !== 'blank' ||
        board[6].value === board[7].value &&
        board[6].value === board[8].value &&
        board[6].value !== 'blank' ||
        board[6].value === board[4].value &&
        board[6].value === board[2].value &&
        board[6].value !== 'blank' ||
        board[1].value === board[4].value &&
        board[1].value === board[7].value &&
        board[1].value !== 'blank' ||
        board[2].value === board[5].value &&
        board[2].value === board[8].value &&
        board[2].value !== 'blank' ) {
            declareWinner();
        } else if (board[0].value !== 'blank' &&
        board[1].value !== 'blank' &&
        board[2].value !== 'blank' &&
        board[3].value !== 'blank' &&
        board[4].value !== 'blank' &&
        board[5].value !== 'blank' &&
        board[6].value !== 'blank' &&
        board[7].value !== 'blank' &&
        board[8].value !== 'blank') {
            declareTie();
        } else {
            switchActive();
        }
}

const gameResult = document.getElementById('gameResult');

function declareWinner() {
    for (i = 0; i < board.length; i++) {
        let gridCell = document.getElementById(`${i}`);
        gridCell.setAttribute('disabled', '');
    }
    gameResult.textContent = `Congrats! ${activePlayer.name} has won the game!`;
    startBtn.textContent = 'Play Again';
    startBtn.style.display = 'block';
}

function declareTie() {
    gameResult.textContent = `This was a tie game.`;
    startBtn.textContent = 'Play Again';
    startBtn.style.display = 'block';
}

function reset() {
    for (i = 0; i < board.length; i++) {
        board[i].value = 'blank';
    }
}


const startBtn = document.getElementById('startBtn');
startBtn.addEventListener('click', startGame);

function startGame() {
    player1.classList.remove('active');
    player2.classList.remove('active');
    activePlayer = undefined;
    switchActive();
    startBtn.style.display = 'none';
    gameResult.textContent = `We have randomly chosen who will start the game. The current turn will be highlighted above.`;
    for (i = 0; i < board.length; i++) {
        let gridCell = document.getElementById(`${i}`);
        gridCell.removeAttribute('disabled');
        board[i].value = 'blank';
        gridCell.textContent = '';
        gridCell.addEventListener('click', takeTurn);     
    }
    if (startBtn.textContent === 'Start Game') {
        addNames();
    }
}

function takeTurn() {
    event.target.textContent = `${activePlayer.marker}`;
    board[event.target.id].changeVal();
    event.target.setAttribute('disabled', '');   
    checkWinner();
}

function addNames() {
    playerOne.name = prompt('Please enter Player One\'s name', 'Player One');
    playerTwo.name = prompt('Please enter Player Two\'s name', 'Player Two');

    playerOneName.textContent = `${playerOne.name}`;
    playerTwoName.textContent = `${playerTwo.name}`;
}








