function GameOverScreen({winner, onRestart}) {
  return (
    <div className="game-over" data-testid="game-over-screen">
      <h2>{winner ? `Победил игрок: ${winner}` : 'Ничья'}</h2>
      <button type="button" onClick={onRestart}>
        Играть снова
      </button>
    </div>
  );
}

export default GameOverScreen;
