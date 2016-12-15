import React from 'react';
import { connect } from 'dva';
import styles from './FigureFinder.css';
import FigureBuilder from '../components/FigureBuilder';
import FigureDetails from '../components/FigureDetails';

function FigureFinder(props) {
  return (
    <div className={styles.normal}>
      <h1>Figure Finder</h1>
      <div className={styles.builder}>
        <FigureBuilder />
      </div>
      <div> className={styles.details}>
        <FigureDetails figure={props.selected} />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const finder = state['figure-finder'];

  return {
    selected: finder.selected,
    elements: finder.elements
  };
}

export default connect(mapStateToProps)(FigureFinder);
