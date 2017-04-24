import React from 'react';
import { connect } from 'dva';
import styles from './ChartHouse.css';
import HouseChartMaker from '../components/canvas/HouseChartMaker';
import { getSeeds } from '../utils/figure';
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

    const selectQuerent = (reactEvt, val) => {
      this.props.dispatch({type: 'chart-house/SELECT_QUERENT', payload: val});
    };

    const selectQuesited = (reactEvt, val) => {
      this.props.dispatch({type: 'chart-house/SELECT_QUESITED', payload: val});
    };

    const {chart, house} = this.props;
    let chartSeeds = getSeeds(this.props.chart);
    let seeds = chartSeeds.map(s => s.toLowerCase().replace(' ', '-'));
    seeds = seeds.join(',');
    this.log.info('Seeds', seeds);

    return (
      <div className={styles.normal}>
        <HouseChartMaker
          chart={chart}
          selectedHouse={house}
          onFigureSelect={selectFigure}
          onHouseSelect={selectHouse}
          onQuesitedSelect={selectQuesited}
          onQuerentSelect={selectQuerent}
          scaling={0.25} />
        <p>
          <a href={'#/chart/shield/svg/' + seeds}>Shield Chart</a>
        </p>
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
