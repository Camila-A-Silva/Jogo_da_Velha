import styles from './Square.module.css';

export default function Square({ value, onSquareClick, isWinning }) {
  
  const squareClasses = `${styles.square} ${isWinning ? styles['square--winning'] : ''}`;

  return (
    <button 
      className={squareClasses} 
      onClick={onSquareClick}
      aria-label={value ? `Quadrado preenchido com ${value}` : 'Quadrado vazio'}
    >
      {value}
    </button>
  );
}