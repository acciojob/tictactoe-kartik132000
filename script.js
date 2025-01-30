//your JS code here. If required.
document.getElementById('submit').addEventListener('click', function() {
            let player1 = document.getElementById('player-1').value;
            let player2 = document.getElementById('player-2').value;
            
            if (player1 && player2) {
                document.querySelector('.board').style.display = 'grid';
                document.querySelector('.message').innerText = `${player1}, you're up!`;
                startGame(player1, player2);
            }
        });

        function startGame(player1, player2) {
            let currentPlayer = player1;
            let symbol = 'X';
            let board = Array(9).fill(null);
            let cells = document.querySelectorAll('.cell');
            
            cells.forEach(cell => {
                cell.innerText = '';
                cell.addEventListener('click', function() {
                    if (!board[cell.id - 1]) {
                        board[cell.id - 1] = symbol;
                        cell.innerText = symbol;
                        if (checkWinner(board, symbol)) {
                            document.querySelector('.message').innerText = `${currentPlayer}, congratulations you won!`;
                            disableBoard();
                            return;
                        }
                        currentPlayer = currentPlayer === player1 ? player2 : player1;
                        symbol = symbol === 'X' ? 'O' : 'X';
                        document.querySelector('.message').innerText = `${currentPlayer}, you're up!`;
                    }
                });
            });
        }

        function checkWinner(board, symbol) {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8],
                [0, 3, 6], [1, 4, 7], [2, 5, 8],
                [0, 4, 8], [2, 4, 6]
            ];
            return winPatterns.some(pattern => 
                pattern.every(index => board[index] === symbol)
            );
        }
        
        function disableBoard() {
            document.querySelectorAll('.cell').forEach(cell => cell.style.pointerEvents = 'none');
        }