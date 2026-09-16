import {useEffect, useState} from 'react';
import Splash from './Splash.jsx';
import Board from './Board.jsx';
import GameOverScreen from './GameOverScreen.jsx';
import {
  createEmptyBoard,
  calculateWinner,
  isBoardFull,
  getRandomComputerMove,
} from './gameLogic.js';

const SCREEN = {
  SPLASH: 'splash',
  PLAYING: 'playing',
  GAME_OVER: 'gameOver',
};

function App() {
  const [screen, setScreen] = useState(SCREEN.SPLASH);
  const [mode, setMode] = useState('player');
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [winner, setWinner] = useState(null);

  function startGame(selectedMode) {
    setMode(selectedMode);
    setBoard(createEmptyBoard());
    setCurrentPlayer('X');
    setWinner(null);
    setScreen(SCREEN.PLAYING);
  }

  function handleCellClick(index) {
    if (board[index] !== null) {
      return;
    }

    const nextBoard = [...board];
    nextBoard[index] = currentPlayer;
    setBoard(nextBoard);

    const nextWinner = calculateWinner(nextBoard);
    if (nextWinner || isBoardFull(nextBoard)) {
      setWinner(nextWinner);
      setScreen(SCREEN.GAME_OVER);
      return;
    }

    setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
  }

  useEffect(() => {
    if (
      screen !== SCREEN.PLAYING ||
      mode !== 'computer' ||
      currentPlayer !== 'O'
    ) {
      return;
    }

    const timeoutId = setTimeout(() => {
      const computerMoveIndex = getRandomComputerMove(board);
      if (computerMoveIndex === null) {
        return;
      }

      const nextBoard = [...board];
      nextBoard[computerMoveIndex] = 'O';
      setBoard(nextBoard);

      const nextWinner = calculateWinner(nextBoard);
      if (nextWinner || isBoardFull(nextBoard)) {
        setWinner(nextWinner);
        setScreen(SCREEN.GAME_OVER);
        return;
      }

      setCurrentPlayer('X');
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [board, currentPlayer, mode, screen]);

  return (
    <main data-testid="app" className="app">
      {screen === SCREEN.SPLASH && <Splash onStart={startGame} />}

      {screen === SCREEN.PLAYING && (
        <div className="game">
          <p className="current-player">Ход игрока: {currentPlayer}</p>
          <Board board={board} onCellClick={handleCellClick} />
        </div>
      )}

      {screen === SCREEN.GAME_OVER && (
        <GameOverScreen
          winner={winner}
          onRestart={() => setScreen(SCREEN.SPLASH)}
        />
      )}
    </main>
  );
}

export default App;
