//your JS code here. If required.
document.addEventListener('DOMContentLoaded', function () {
    const playersForm = document.getElementById('playersForm');
    const board = document.getElementById('board');
    const player1Input = document.getElementById('player-1');
    const player2Input = document.getElementById('player-2');
    const submitButton = document.getElementById('submit');
    const messageDiv = document.querySelector('.message');
    const cells = document.querySelectorAll('.cell');

    let currentPlayer = '';
    let boardArray = Array(9).fill('');

    submitButton.addEventListener('click', function () {
        const player1Name = player1Input.value.trim();
        const player2Name = player2Input.value.trim();

        if (player1Name && player2Name) {
            setupGame(player1Name, player2Name);
        }
    });

    function setupGame(player1Name, player2Name) {
        currentPlayer = player1Name;
        messageDiv.textContent = `${currentPlayer}, you're up!`;
        playersForm.style.display = 'none';
        board.style.display = 'block';

        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('disabled');
        });

        boardArray = Array(9).fill('');
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (boardArray[a] && boardArray[a] === boardArray[b] && boardArray[a] === boardArray[c]) {
                return true;
            }
        }

        return false;
    }

    function checkTie() {
        return boardArray.every(cell => cell !== '');
    }

    function endGame() {
        cells.forEach(cell => {
            cell.classList.add('disabled');
        });
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === player1Input.value ? player2Input.value : player1Input.value;
        messageDiv.textContent = `${currentPlayer}, you're up!`;
    }

    function cellClick(event) {
        const clickedCell = event.target;
        const cellIndex = clickedCell.id - 1;

        if (!boardArray[cellIndex] && currentPlayer) {
            clickedCell.textContent = currentPlayer;
            boardArray[cellIndex] = currentPlayer;

            if (checkWinner()) {
                messageDiv.textContent = `${currentPlayer} congratulations, you won!`;
                endGame();
            } else if (checkTie()) {
                messageDiv.textContent = 'It\'s a tie!';
                endGame();
            } else {
                switchPlayer();
            }

            clickedCell.classList.add('disabled');
        }
    }
});
