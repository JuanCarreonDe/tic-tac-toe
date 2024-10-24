import Square from "./components/Square";
import { TRUNS } from "./constants";
import WinnerModal from "./components/WinnerModal";
import { useBoard } from "./hooks/useBoard";
import { Score } from "./components/Score";

function App() {
  const {
    board,
    turn,
    winner,
    resetGame,
    updateBoard,
    scoreX,
    scoreO,
    fullGameWinner,
  } = useBoard();

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <Score scoreO={scoreO} scoreX={scoreX} />
      <section className="game">
        {board?.map((_, i) => {
          return (
            <Square key={i} i={i} updateBoard={updateBoard}>
              {board[i]}
            </Square>
          );
        })}
      </section>
      <section className="turn">
        <Square isSelected={turn === TRUNS.X}>{TRUNS.X}</Square>
        <Square isSelected={turn === TRUNS.O}>{TRUNS.O}</Square>
      </section>
      <WinnerModal
        resetGame={resetGame}
        winner={winner}
        fullGameWinner={fullGameWinner}
      />
      {/* <button onClick={resetGame}>🔄️Reiniciar</button> */}
    </main>
  );
}

export default App;
