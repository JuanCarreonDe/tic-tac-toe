import { useState, useEffect } from "react";
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

  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);

  const [fullGameWinner, setFullGameWinner] = useState(null);

  const [timeLeft, setTimeLeft] = useState(15);
  const [useTimer, setUseTimer] = useState(false); // Estado para habilitar o deshabilitar el temporizador

  useEffect(() => {
    if (!useTimer || winner || checkEndGame(board)) return; // Solo usar el temporizador si está habilitado

    setTimeLeft(15); // Reiniciar el temporizador al inicio de un turno

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          const newTurn = turn === TRUNS.X ? TRUNS.O : TRUNS.X;
          setTurn(newTurn);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [turn, board, winner, useTimer]);

  useEffect(() => {
    if (scoreX === 3) {
      setFullGameWinner(TRUNS.X);
      setScoreO(0);
      setScoreX(0);
      confetti();
    }

    if (scoreO === 3) {
      setFullGameWinner(TRUNS.O);
      setScoreO(0);
      setScoreX(0);
      confetti();
    }
  }, [scoreX, scoreO]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TRUNS.X);
    setWinner(null);
    setFullGameWinner(null);
    resetGameStorage();
  };

  const updateBoard = (i) => {
    if (board[i] || winner) return;

    const newBoard = [...board];
    newBoard[i] = turn;

    const newWinner = checkWinner(newBoard);

    if (newWinner) {
      setWinner(newWinner);
      newWinner === TRUNS.X ? setScoreX(scoreX + 1) : setScoreO(scoreO + 1);
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

  return {
    board,
    turn,
    winner,
    resetGame,
    updateBoard,
    scoreX,
    scoreO,
    fullGameWinner,
    timeLeft,
    useTimer,
    setUseTimer, // Exponer función para activar o desactivar el temporizador
  };
}
