import React from 'react';
import styles from './FigureBuilder.css';

function makeElements(fig) {
  return {fire: fig.fire, earth: fig.earth, water: fig.water, earth: fig.earth}
}

function FigureBuilder(props) {
  return (
    <div className={styles.normal}>
      Component: 'FigureBuilder'
    </div>
  );
}

export default FigureBuilder;
