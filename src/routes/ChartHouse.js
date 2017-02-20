import React from 'react';
import { connect } from 'dva';
import styles from './ChartHouse.css';
import { makeSeedhash, getSeeds, makeSlug } from '../utils/figure';
import Logger from 'js-logger';
import HouseChartMaker from '../components/canvas/HouseChartMaker';

const log = Logger.get('<ChartHouse>');

class ChartHouse extends React.Component {
  componentWillMount () {
    let {seeds} = this.props.params;

    if (!seeds) {
      log.info('no seeds, making one');
      this.updateSeedParam();
    } else {
      let chartSeeds = getSeeds(this.props.chart);
      let cSeeds = chartSeeds.map(s => s.toLowerCase().replace(' ', '-'));
      cSeeds = cSeeds.join(',');
      if (cSeeds !== seeds) {
        log.debug('Not same seeds, we need to load that chart', seeds, cSeeds);
        this.props.dispatch({type: 'chart-house/SELECT_SEEDS', payload: seeds.replace('-', ' ').split(',')});
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    const currUrl = this.props.routes[this.props.routes.length - 1].path;
    const newUrl = makeSeedhash(currUrl, nextProps.chart, this.props.seeds);
    if (window.location.hash !== newUrl) {
      log.debug('Setting url to history on prop change - new seeds:', window.location.hash, newUrl);
      window.history.pushState({}, 'Chart', newUrl);
    }
  }

  updateSeedParam () {
    const currUrl = this.props.routes[this.props.routes.length - 1].path;
    log.info('Current URL:', currUrl);
    const newUrl = makeSeedhash(currUrl, this.props.chart, this.props.seeds);
    if (window.location.hash !== newUrl) {
      log.debug('Setting url to history - new seeds:', window.location.hash, newUrl);
      window.history.pushState({}, 'Chart', newUrl);
      const seeds = getSeeds(this.props.chart);
      log.debug('seeds', seeds);
      this.props.dispatch({type: 'chart-house/SELECT_SEEDS', payload: seeds});
    }
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
          scaling={0.5} />
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
