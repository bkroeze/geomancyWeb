import React, { Component, PropTypes } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './IndexPage.css';

function IndexPage () {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Geomancy Tools</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>
          <Link to='/figure/explorer'> Figure Explorer
          </Link>
        </li><li>
          <Link to='/figure/grid'> Figure Grid
          </Link>
        </li>
      </ul>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
