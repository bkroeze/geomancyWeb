import React from 'react';
import { connect } from 'dva';
// import { bindActionCreators } from 'redux'
import styles from './FigureExplorer.css';
import FigureDetails from '../components/svg/FigureDetails';
import FigureChooser from '../components/ui/FigureChooser';
import Logger from 'js-logger';
import { actions } from '../models/figure-explorer';
const log = Logger.get('<FigureExplorer>');

function FigureExplorer (props) {
  function selectFigure (val) {
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
