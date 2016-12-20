import React from 'react';
import { connect } from 'dva';
import { Chart } from 'geomancy';
import styles from './ChartShield.css';
import ShieldChart from '../components/ShieldChart';

class ChartShield extends React.Component {
  render () {
    const chart = new Chart();
    return (
      <div className={styles.normal}>
        <svg viewBox='0 0 1000 750' width='400' height='300'>
          <ShieldChart viewBox={[0, 0, 1000, 750]} chart={chart} />
        </svg>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {};
}

export default connect(mapStateToProps)(ChartShield);
