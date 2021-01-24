function Board({ board, onClick }) {
  const renderCell = (index) => {
    if (board[index] === 1) {
      return "x"
    }
    if (board[index] === 2) {
      return "✓"
    }
    return "";
  }

  return (
    <div className="board">
      <div className="row">
        <div onClick={() => onClick(0,0)}>{renderCell(0)}</div>
        <div onClick={() => onClick(1,0)}>{renderCell(1)}</div>
        <div onClick={() => onClick(2,0)}>{renderCell(2)}</div>
      </div>
      <div className="row">
        <div onClick={() => onClick(0,1)}>{renderCell(3)}</div>
        <div onClick={() => onClick(1,1)}>{renderCell(4)}</div>
        <div onClick={() => onClick(2,1)}>{renderCell(5)}</div>
      </div>
      <div className="row">
        <div onClick={() => onClick(0,2)}>{renderCell(6)}</div>
        <div onClick={() => onClick(1,2)}>{renderCell(7)}</div>
        <div onClick={() => onClick(2,2)}>{renderCell(8)}</div>
      </div>
    </div>
  );
}

export default Board;
