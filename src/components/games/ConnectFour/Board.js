function Board({ board, onClick }) {
  const getCellClasses = (index) => {
    if (board[index] === 1) {
      return "cell cell--player1"
    }
    if (board[index] === 2) {
      return "cell cell--player2"
    }
    return "cell";
  }

  return (
    <div className="board">
      <div className="row">
        <div onClick={() => onClick(0,0)} className={getCellClasses(0)} />
        <div onClick={() => onClick(1,0)} className={getCellClasses(1)} />
        <div onClick={() => onClick(2,0)} className={getCellClasses(2)} />
        <div onClick={() => onClick(3,0)} className={getCellClasses(3)} />
        <div onClick={() => onClick(4,0)} className={getCellClasses(4)} />
        <div onClick={() => onClick(5,0)} className={getCellClasses(5)} />
        <div onClick={() => onClick(6,0)} className={getCellClasses(6)} />
      </div>
      <div className="row">
        <div onClick={() => onClick(0,1)} className={getCellClasses(7)} />
        <div onClick={() => onClick(1,1)} className={getCellClasses(8)} />
        <div onClick={() => onClick(2,1)} className={getCellClasses(9)} />
        <div onClick={() => onClick(3,1)} className={getCellClasses(10)} />
        <div onClick={() => onClick(4,1)} className={getCellClasses(11)} />
        <div onClick={() => onClick(5,1)} className={getCellClasses(12)} />
        <div onClick={() => onClick(6,1)} className={getCellClasses(13)} />
      </div>
      <div className="row">
        <div onClick={() => onClick(0,2)} className={getCellClasses(14)} />
        <div onClick={() => onClick(1,2)} className={getCellClasses(15)} />
        <div onClick={() => onClick(2,2)} className={getCellClasses(16)} />
        <div onClick={() => onClick(3,2)} className={getCellClasses(17)} />
        <div onClick={() => onClick(4,2)} className={getCellClasses(18)} />
        <div onClick={() => onClick(5,2)} className={getCellClasses(19)} />
        <div onClick={() => onClick(6,2)} className={getCellClasses(20)} />
      </div>
      <div className="row">
        <div onClick={() => onClick(0,3)} className={getCellClasses(21)} />
        <div onClick={() => onClick(1,3)} className={getCellClasses(22)} />
        <div onClick={() => onClick(2,3)} className={getCellClasses(23)} />
        <div onClick={() => onClick(3,3)} className={getCellClasses(24)} />
        <div onClick={() => onClick(4,3)} className={getCellClasses(25)} />
        <div onClick={() => onClick(5,3)} className={getCellClasses(26)} />
        <div onClick={() => onClick(6,3)} className={getCellClasses(27)} />
      </div>
      <div className="row">
        <div onClick={() => onClick(0,4)} className={getCellClasses(28)} />
        <div onClick={() => onClick(1,4)} className={getCellClasses(29)} />
        <div onClick={() => onClick(2,4)} className={getCellClasses(30)} />
        <div onClick={() => onClick(3,4)} className={getCellClasses(31)} />
        <div onClick={() => onClick(4,4)} className={getCellClasses(32)} />
        <div onClick={() => onClick(5,4)} className={getCellClasses(33)} />
        <div onClick={() => onClick(6,4)} className={getCellClasses(34)} />
      </div>
      <div className="row">
        <div onClick={() => onClick(0,5)} className={getCellClasses(35)} />
        <div onClick={() => onClick(1,5)} className={getCellClasses(36)} />
        <div onClick={() => onClick(2,5)} className={getCellClasses(37)} />
        <div onClick={() => onClick(3,5)} className={getCellClasses(38)} />
        <div onClick={() => onClick(4,5)} className={getCellClasses(39)} />
        <div onClick={() => onClick(5,5)} className={getCellClasses(40)} />
        <div onClick={() => onClick(6,5)} className={getCellClasses(41)} />
      </div>
      <div className="row">
        <div onClick={() => onClick(0,6)} className={getCellClasses(42)} />
        <div onClick={() => onClick(1,6)} className={getCellClasses(43)} />
        <div onClick={() => onClick(2,6)} className={getCellClasses(44)} />
        <div onClick={() => onClick(3,6)} className={getCellClasses(45)} />
        <div onClick={() => onClick(4,6)} className={getCellClasses(46)} />
        <div onClick={() => onClick(5,6)} className={getCellClasses(47)} />
        <div onClick={() => onClick(6,6)} className={getCellClasses(48)} />
      </div>
    </div>
  );
}

export default Board;
