import React from 'react';
import { connect } from 'dva';
import styles from './ChartHouse.css';
import HouseChartMaker from '../components/canvas/HouseChartMaker';
import ChartBase from './ChartBase';
import Logger from 'js-logger';

class ChartHouse extends ChartBase {
  constructor (props) {
    super(props);
    this.log = Logger.get('<ChartHouse>');
    this.namespace = 'chart-house';
  }

  render () {
    const selectFigure = (reactEvt, val) => {
      this.props.dispatch({type: 'chart-house/SELECT_FIGURE', payload: val});
    };

    const selectHouse = (reactEvt, val) => {
      this.props.dispatch({type: 'chart-house/SELECT_HOUSE', payload: val});
    };

    const {chart, house} = this.props;

    return (
      <div className={styles.normal}>
        <HouseChartMaker
          chart={chart}
          selectedHouse={house}
          onFigureSelect={selectFigure}
          onHouseSelect={selectHouse}
          scaling={0.25} />
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
