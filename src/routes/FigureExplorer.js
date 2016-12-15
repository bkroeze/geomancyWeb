import React from 'react';
import { connect } from 'dva';
// import { bindActionCreators } from 'redux'
import styles from './FigureExplorer.css';
import FigureDetails from '../components/FigureDetails';
import FigureChooser from '../components/FigureChooser';
import Logger from 'js-logger';
import { actions } from '../models/figure-explorer';
const log = Logger.get('<FigureExplorer>');

const dotAttribs = {
  r: '8',
  stroke: '#888888',
  'stroke-width': '1',
  fill: 'black'
};

function FigureExplorer (props) {
  log.info('props', props);

  function selectFigure (val) {
    log.info('Selecting Figure: ' + val);
    props.dispatch({type: 'figure-explorer/SELECT_FIGURE', payload: val});
  }

  return (
    <div className={styles.normal}>
      <div className={styles.figureChooser}>
        <FigureChooser select={selectFigure} selected={props.selected} />
      </div>
      <div className={styles.FigureDetails}>
        <FigureDetails figure={props.selected} />
      </div>
    </div>
  );
}

function mapStateToProps (state) {
  return {selected: state['figure-explorer'].selected};
}

export default connect(mapStateToProps)(FigureExplorer);
