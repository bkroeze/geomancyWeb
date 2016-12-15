import styles from './FigureGrid.css';
import React from 'react';
import {connect} from 'dva';
import FigureTable from '../components/FigureTable';

function FigureGrid(props) {
  return (
    <div className={styles.normal}>
      <h1>Geomantic Figures</h1>
      <FigureTable />
    </div>
  );
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps)(FigureGrid);
