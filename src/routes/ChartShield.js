import React from 'react';
import { connect } from 'dva';
import styles from './ChartShield.css';
import ShieldChart from '../components/ShieldChart';

function ChartShield (props) {
  return (
    <div className={styles.normal}>
      <svg viewBox='0 0 200 150' width='400' height='300'>
        <ShieldChart />
      </svg>
    </div>
  );
}

function mapStateToProps (state) {
  return {};
}

export default connect(mapStateToProps)(ChartShield);
