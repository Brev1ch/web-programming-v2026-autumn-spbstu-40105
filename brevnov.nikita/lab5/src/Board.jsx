function Board({board, onCellClick}) {
  return (
    <div className="board" data-testid="board">
      {board.map((cell, index) => (
        <button
          key={index}
          type="button"
          className="board-cell"
          data-testid="board-cell"
          onClick={() => onCellClick(index)}
          disabled={cell !== null}
        >
          {cell}
        </button>
      ))}
    </div>
  );
}

export default Board;
