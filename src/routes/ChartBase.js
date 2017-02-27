import React from 'react';
import { makeSeedhash, getSeeds } from '../utils/figure';
import Logger from 'js-logger';

export default class ChartBase extends React.Component {
  componentWillMount () {
    let {seeds} = this.props.params;

    if (!seeds) {
      this.log.info('no seeds, making one');
      this.updateSeedParam();
    } else {
      let chartSeeds = getSeeds(this.props.chart);
      let cSeeds = chartSeeds.map(s => s.toLowerCase().replace(' ', '-'));
      cSeeds = cSeeds.join(',');
      if (cSeeds !== seeds) {
        this.log.debug('Not same seeds, we need to load that chart', seeds, cSeeds);
        this.props.dispatch({type: this.namespace + '/SELECT_SEEDS', payload: seeds.replace('-', ' ').split(',')});
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    const currUrl = this.props.routes[this.props.routes.length - 1].path;
    const newUrl = makeSeedhash(currUrl, nextProps.chart, this.props.seeds);
    if (window.location.hash !== newUrl) {
      this.log.debug('Setting url to history on prop change - new seeds:', window.location.hash, newUrl);
      window.history.pushState({}, 'Chart', newUrl);
    }
  }

  updateSeedParam () {
    const currUrl = this.props.routes[this.props.routes.length - 1].path;
    this.log.info('Current URL:', currUrl);
    const newUrl = makeSeedhash(currUrl, this.props.chart, this.props.seeds);
    if (window.location.hash !== newUrl) {
      this.log.debug('Setting url to history - new seeds:', window.location.hash, newUrl);
      window.history.pushState({}, 'Chart', newUrl);
      const seeds = getSeeds(this.props.chart);
      this.log.debug('seeds', seeds);
      this.props.dispatch({type: this.namespace + 'chart-house/SELECT_SEEDS', payload: seeds});
    }
  }
}
