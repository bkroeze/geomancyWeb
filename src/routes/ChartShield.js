import React from 'react';
import { connect } from 'dva';
import styles from './ChartShield.css';
import ShieldChartMaker from '../components/svg/ShieldChartMaker';
import ChartBase from './ChartBase';
import Logger from 'js-logger';

class ChartShield extends ChartBase {
  constructor (props) {
    super(props);
    this.log = Logger.get('<ChartShield>');
    this.namespace = 'chart-shield';
  }

  render () {
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
