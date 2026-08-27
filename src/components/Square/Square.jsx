import styles from './Square.module.css';

export default function Square({ value, onSquareClick }) {
  return (
    <button 
      className={styles.square} 
      onClick={onSquareClick}
      aria-label={value ? `Quadrado preenchido com ${value}` : 'Quadrado vazio'}
    >
      {value}
    </button>
  );
}