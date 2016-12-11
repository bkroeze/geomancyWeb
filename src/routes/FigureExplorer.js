import React from 'react';
import { connect } from 'dva';
import styles from './FigureExplorer.css';
import FigureDetails from '../components/FigureDetails';
import Logger from 'js-logger';
const log = Logger.get('<FigureExplorer>');

const dotAttribs = {
  r: '8',
  stroke: '#888888',
  'stroke-width': '1',
  fill: 'black'
};

function FigureExplorer (props) {
  return (
    <div className={styles.normal}>
      <FigureDetails figure={props.selected} />
    </div>
  );
}

function mapStateToProps (state) {
  return {selected: state['figure-explorer'].selected};
}

export default connect(mapStateToProps)(FigureExplorer);
