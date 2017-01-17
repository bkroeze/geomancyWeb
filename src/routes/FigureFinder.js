import React from 'react';
import { connect } from 'dva';
import styles from './FigureFinder.less';
import FigureBuilder from '../components/ui/FigureBuilder';
import FigureDetails from '../components/svg/FigureDetails';
import Logger from 'js-logger';
const log = Logger.get('FigureFinder');

function FigureFinder (props) {
  function select (fig) {
    log.debug('Figure Selected', fig);
    props.dispatch({type: 'figure-finder/SELECT', payload: fig});
  }

  return (
    <div className={styles.finder}>
      <h1>Figure Finder</h1>
      <div className={styles.builder}>
        <FigureBuilder elements={props.elements} onSelect={select} />
      </div>
      <div className={styles.details}>
        <FigureDetails figure={props.selected} />
      </div>
    </div>
  );
}

function mapStateToProps (state) {
  const finder = state['figure-finder'];

  const out = {
    selected: finder.selected,
    elements: finder.elements
  };

  log.debug('state', out);

  return out;
}

export default connect(mapStateToProps)(FigureFinder);
