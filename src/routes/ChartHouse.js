import React from 'react';
import { connect } from 'dva';
import styles from './ChartHouse.css';
import { makeSeedhash } from '../utils/figure';
import Logger from 'js-logger';
import HouseChart from '../components/canvas/HouseChart';

const log = Logger.get('<ChartHouse>');

class ChartHouse extends React.Component {
  render () {
    // makeSeedhash(this.props.chart)
    const selectFigure = (reactEvt, val) => {
      this.props.dispatch({type: 'chart-house/SELECT_FIGURE', payload: val});
    };

    const selectHouse = (reactEvt, val) => {
      this.props.dispatch({type: 'chart-house/SELECT_HOUSE', payload: val});
    };

    return (
      <div className={styles.normal}>
        <HouseChart
          chart={this.props.chart}
          selectedHouse={this.props.house}
          onClick={selectHouse}
          scaling='.5'/>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    chart: state['chart-house'].chart,
    house: state['chart-house'].house
  };
}

export default connect(mapStateToProps)(ChartHouse);
