import { useState } from 'react';

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function findLowestEmptyIndex(column) {
    for (let i = 5; i >= 0; i--) {
      if (!squares[i * 7 + column]) {
        return i * 7 + column;
      }
    }
    return -1;
  }

  function handleClick(column) {
    const index = findLowestEmptyIndex(column);
    if (index === -1 || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? 'X' : 'O';
    onPlay(nextSquares);
  }

  return (
    <div>
      {[...Array(6)].map((_, i) => (
        <div key={i} className="board-row">
          {[...Array(7)].map((_, j) => (
            <Square
              key={7 * i + j}
              value={squares[7 * i + j]}
              onSquareClick={() => handleClick(j)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    // Horizontal
    ...Array(6).fill().map((_, i) => [0, 1, 2, 3].map(j => i * 7 + j)),
    ...Array(6).fill().map((_, i) => [1, 2, 3, 4].map(j => i * 7 + j)),
    ...Array(6).fill().map((_, i) => [2, 3, 4, 5].map(j => i * 7 + j)),
    ...Array(6).fill().map((_, i) => [3, 4, 5, 6].map(j => i * 7 + j)),
    // Vertical
    ...Array(7).fill().map((_, i) => [0, 1, 2, 3].map(j => i + j * 7)),
    ...Array(7).fill().map((_, i) => [1, 2, 3, 4].map(j => i + j * 7)),
    ...Array(7).fill().map((_, i) => [2, 3, 4, 5].map(j => i + j * 7)),
  ];

  for (let line of lines) {
    if (line.every(index => squares[index] && squares[index] === squares[line[0]])) {
      return squares[line[0]];
    }
  }
  return null;
}

function Game() {
  const [history, setHistory] = useState([Array(42).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

export default Game;
