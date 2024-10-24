import Square from "./Square";

const WinnerModal = ({ winner, resetGame, fullGameWinner }) => {
  if (winner === null) return null;

  const winnerText = winner === false ? "Empate" : "Ganó:";
  return (
    <section className="winner">
      <div className="text">
        <h2>{fullGameWinner ? "Ganador de la partida:" : winnerText}</h2>
        <header>{winner && <Square>{winner}</Square>}</header>
        <footer>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </footer>
      </div>
    </section>
  );
};

export default WinnerModal;
