import React from 'react';
import { connect } from 'dva';
import styles from './ChartHouse.css';
import HouseChartMaker from '../components/canvas/HouseChartMaker';
import { makeSeedhash } from '../utils/figure';
import Logger from 'js-logger';

const log = Logger.get('<ChartHouse>');

class ChartHouse extends React.Component {
  componentWillMount () {
    log.info('params', this.props.params);
    let { seeds } = this.props.params;
    if (seeds) {
      seeds = seeds.replace('-', ' ').split(',');
      log.info('seeds', seeds);
      this.props.dispatch({type: 'chart-house/SELECT_SEEDS', payload: seeds});
    }
  }

  render () {
    makeSeedhash(this.props.chart);
    const selectFigure = (val) => {
      // log.info('Selected: ', event, index, val)
      this.props.dispatch({type: 'chart-house/SELECT_FIGURE', payload: val});
    };

    const selectField = (val) => {
      this.props.dispatch({type: 'chart-house/SELECT_FIELD', payload: val});
    };

    const viewbox = [0, 0, 1000, 1000];

    return (
      <div className={styles.normal}>
        <HouseChartMaker
          viewBox={viewbox}
          chart={this.props.chart}
          field={this.props.field}
          onFigureSelect={selectFigure}
          onFieldSelect={selectField} />
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    chart: state['chart-house'].chart,
    field: state['chart-house'].field
  };
}

export default connect(mapStateToProps)(ChartHouse);
