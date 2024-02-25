export const saveGameToStorage = ({ board, turn, winner }) => {
  // Guardar aqui la partida
  window.localStorage.setItem("board", JSON.stringify(board));
  window.localStorage.setItem("turn", turn);
  winner? window.localStorage.setItem("winner", winner) : null
};

export const resetGameStorage = () => {
  window.localStorage.removeItem("board");
  window.localStorage.removeItem("turn");
  window.localStorage.removeItem("winner");
};
