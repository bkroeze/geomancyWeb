import React from 'react';
import { connect } from 'dva';
import styles from './ChartShield.css';
import ShieldChartMaker from '../components/ShieldChartMaker';
import { makeSeedhash } from '../utils/figure';
import Logger from 'js-logger';

const log = Logger.get('<ChartShield>');

class ChartShield extends React.Component {
  componentWillMount () {
    log.info('params', this.props.params);
    let { seeds } = this.props.params;
    if (seeds) {
      seeds = seeds.replace('-', ' ').split(',');
      log.info('seeds', seeds);
      this.props.dispatch({type: 'chart-shield/SELECT_SEEDS', payload: seeds});
    }
  }

  render () {
    const currUrl = this.props.routes[this.props.routes.length - 1];
    log.info('Current URL:', currUrl);
    makeSeedhash(this.props.chart);
    const selectFigure = (val) => {
      // log.info('Selected: ', event, index, val)
      this.props.dispatch({type: 'chart-shield/SELECT_FIGURE', payload: val});
    };

    const selectField = (val) => {
      this.props.dispatch({type: 'chart-shield/SELECT_FIELD', payload: val});
    };

    const viewbox = [0, 0, 1000, 750];

    return (
      <div className={styles.normal}>
        <ShieldChartMaker
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
    chart: state['chart-shield'].chart,
    field: state['chart-shield'].field
  };
}

export default connect(mapStateToProps)(ChartShield);
