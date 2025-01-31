let player1 = '';
    let player2 = '';
    let currentPlayer = 1; // 1 for player 1 (X), 2 for player 2 (O)
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = false;

    document.getElementById('submit').addEventListener('click', startGame);

    function startGame() {
        player1 = document.getElementById('player-1').value;
        player2 = document.getElementById('player-2').value;

        if (player1 === '' || player2 === '') {
            alert('Please enter names for both players');
            return;
        }

        document.getElementById('player-names').style.display = 'none';
        document.getElementById('game-board').style.display = 'grid';
        document.querySelector('.message').innerText = `${player1}, you're up!`;
        
        createBoard();
        gameActive = true;
    }

    function createBoard() {
        const board = document.getElementById('game-board');
        board.innerHTML = '';
        gameBoard = ['', '', '', '', '', '', '', '', ''];

        for (let i = 1; i <= 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = i;
            cell.addEventListener('click', handleCellClick);
            board.appendChild(cell);
        }
    }

    function handleCellClick(event) {
        const cellId = event.target.id;
        
        if (gameBoard[cellId - 1] !== '' || !gameActive) {
            return; // Cell is already filled or game is over
        }

        gameBoard[cellId - 1] = currentPlayer === 1 ? 'X' : 'O';
        event.target.innerText = currentPlayer === 1 ? 'X' : 'O';

        if (checkWinner()) {
            document.querySelector('.message').innerText = `${currentPlayer === 1 ? player1 : player2}, congratulations you won!`;
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 1 ? 2 : 1;
        const nextPlayer = currentPlayer === 1 ? player1 : player2;
        document.querySelector('.message').innerText = `${nextPlayer}, you're up!`;
    }

    function checkWinner() {
        const winningCombination = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let combination of winningCombination) {
            const [a, b, c] = combination;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return true;
            }
        }

        return gameBoard.every(cell => cell !== '');
    }