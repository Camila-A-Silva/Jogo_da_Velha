import { useState } from 'react';
import Board from '../Board/Board';
import styles from './Game.module.css';

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    //apaga o hitórico de jogadas quando aperto no botão voltar
    if (nextMove === 0) {
    setHistory([Array(9).fill(null)]);
  }
  }

  const moves = history.map((squares, move) => {
    let voltar;
    let description;
    if (move > 0) {
      description = 'Ir para a jogada #' + move;
    } else {
      voltar = 'Iníciar jogo';
    }
    return (
      <li className={styles.botao} key={move}>
        <button className={styles.btn} onClick={() => jumpTo(move)}>{voltar}</button>
        <p>{description}</p>
      </li>
    );
  });

  return (
    <div className={styles.game}>
      <div className={styles['game-board']}>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className={styles['game-info']}>
        <ol className={styles.ol}>{moves}</ol>
      </div>
    </div>
  );
}