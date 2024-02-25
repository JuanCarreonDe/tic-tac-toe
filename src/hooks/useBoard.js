import { useState } from "react";
import { TRUNS } from "../constants";
import confetti from "canvas-confetti";
import { resetGameStorage, saveGameToStorage } from "../logic/storage";
import { checkEndGame, checkWinner } from "../logic/board";

export function useBoard() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");
    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });

  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem("turn");
    return turnFromStorage ? turnFromStorage : TRUNS.X;
  });

  const [winner, setWinner] = useState(() => {
    const winnerFromStorage = window.localStorage.getItem("winner");
    return winnerFromStorage ? winnerFromStorage : null;
  });

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TRUNS.X);
    setWinner(null);

    resetGameStorage();
  };

  const updateBoard = (i) => {
    if (board[i] || winner) return;

    const newBoard = [...board];
    newBoard[i] = turn;

    const newWinner = checkWinner(newBoard);

    if (newWinner) {
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }

    const newTurn = turn === TRUNS.X ? TRUNS.O : TRUNS.X;
    setTurn(newTurn);
    setBoard(newBoard);

    
    saveGameToStorage({
        board: newBoard,
        turn: newTurn,
        winner: newWinner !== null ? newWinner : null,
      });
  };

  return { board, turn, winner, resetGame, updateBoard };
}
