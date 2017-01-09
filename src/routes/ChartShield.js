import React from 'react';
import { connect } from 'dva';
import styles from './ChartShield.css';
import ShieldChartMaker from '../components/ShieldChartMaker';
import Logger from 'js-logger';
const log = Logger.get('<ChartShield>');

function makeSlug (fig) {
  return fig.name.toLowerCase().replace(' ', '-');
}

function makeSeedhash (chart) {
  const houses = chart.getHouses();
  let seeds = [];
  for (let ix = 0; ix < 4; ix++) {
    seeds.push(makeSlug(houses[ix].figure));
  }
  const seedParam = seeds.join(',');
  let parts = window.location.hash.split('/');
  const lastParts = parts.pop().split('?')[0]; // strip querystring
  if (lastParts !== seedParam) {
    parts.push(seedParam);
    log.info('Setting history', parts.join('/'));
    window.history.pushState({}, 'Chart', parts.join('/'));
  }
}

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
