import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IndexPage from './routes/IndexPage';
import FigureExplorer from './routes/FigureExplorer.js';
import FigureGrid from './routes/FigureGrid.js';
import FigureFinder from './routes/FigureFinder.js';

import ChartShield from './routes/ChartShield.js';

export default function({ history }) {
  return (
    <MuiThemeProvider>
      <Router history={history}>
        <Route path='/' component={IndexPage} />
        <Route path='/figure/explorer' component={FigureExplorer} />
        <Route path='/figure/grid' component={FigureGrid} />
        <Route path='/figure/finder' component={FigureFinder} />
        <Route path='/chart/shield(/:seeds)' component={ChartShield} />
      </Router>
    </MuiThemeProvider>
  );
};
