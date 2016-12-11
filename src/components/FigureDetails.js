import React from 'react';
import styles from './FigureDetails.css';
import Figure from './Figure';

function FigureDetails (props) {
  const {figure} = props;
  return (
    <div className={styles.normal}>
      <div className={styles.figureName}>
        {figure.name}
        <div className={styles.figureEnglish}>
          {figure.english}
        </div>
      </div>
      <div className={styles.figure}>
        <svg viewBox='0 0 80 100' width='100' height='100'>
          <Figure figure={figure} />
        </svg>
      </div>
      <ul className={styles.details}>
        <li>
          Strong Houses:
          {figure.details.houses.strong}
        </li>
        <li>
          Weak Houses:
          {figure.details.houses.weak}
        </li>
      </ul>
    </div>
  );
}

export default FigureDetails;
