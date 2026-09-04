import { useState } from 'react';
import Board from '../Board/Board';
import styles from './Game.module.css';

function calculateWinner(squares) {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontais
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticais
      [0, 4, 8], [2, 4, 6]             // Diagonais
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [scores, setScores] = useState({ x:0, o:0, empate:0});

  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

    //Verifica se a jogada acabou e atualiza o placar

    const winner = calculateWinner(nextSquares);
    const isEmpate = !winner && nextSquares.every((square) => square !== null);

    if (winner === 'X') {
      setScores((prev) => ({ ...prev, x: prev.x + 1 }));
    } else if (winner === 'O') {
      setScores((prev) => ({ ...prev, o: prev.o + 1 }));
    } else if (isEmpate) {
      setScores((prev) => ({ ...prev, empate: prev.empate + 1 }));
    }
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    //apaga o hitórico de jogadas quando aperto no botão voltar
    if (nextMove === 0) {
    setHistory([Array(9).fill(null)]);
  }
  }

  function handleResetAll() {
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
    setScores({ x:0, o:0, empate:0});
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = move + '° Jogada' ;
    } else {
      description = 'Iníciar jogo';
    }
    return (

      <li className={styles.lista}>
          <button className={styles.btn} onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className={styles.game}>
      
      <div className={styles.placar}>
        <h2>Placar</h2>
        <div className={styles.ganhador}>
          <span>X: <strong>{scores.x}</strong>   </span>
          <span>O: <strong>{scores.o}</strong>   </span>
          <span>Empates: <strong>{scores.empate}</strong>   </span>
        </div>
      </div>

    <div className={styles['game_info']}>
      <div className={styles['game-board']}>
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>      

      <div >

      </div>
      <button className={styles['btn-reiniciar']} onClick={handleResetAll}>Reiniciar Jogo</button>

    </div>
      <div className={styles.historico}>
        <h1 className={styles.titulohis}>Histórico de Jogadas</h1>
        <ol className={styles.ol}>{moves}</ol>
      </div>
    
    </div>
 
  );
}