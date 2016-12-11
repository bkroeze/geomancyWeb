import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'dva/router';
import IndexPage from './routes/IndexPage';

import FigureExplorer from './routes/FigureExplorer.js';

export default function({ history }) {
  return (
    <Router history={history}>
      <Route path='/' component={IndexPage} />
      <Route path='/figure-explorer' component={FigureExplorer} />
    </Router>
  );
};
