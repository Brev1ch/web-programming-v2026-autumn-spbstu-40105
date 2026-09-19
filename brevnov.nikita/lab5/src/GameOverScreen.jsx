function GameOverScreen({winner, onRestart}) {
  return (
    <>
      <h2>{winner ? `Победил игрок: ${winner}` : 'Ничья'}</h2>
      <button type="button" onClick={onRestart}>
        Играть снова
      </button>
    </>
  );
}

export default GameOverScreen;
