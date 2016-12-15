import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import IndexPage from './routes/IndexPage';

import FigureExplorer from './routes/FigureExplorer.js';

import FigureGrid from './routes/FigureGrid.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default function({ history }) {
  return (
    <MuiThemeProvider>
      <Router history={history}>
        <Route path='/' component={IndexPage} />
        <Route path='/figure/explorer' component={FigureExplorer} />
        <Route path='/figure/grid' component={FigureGrid} />
      </Router>
    </MuiThemeProvider>
  );
};
