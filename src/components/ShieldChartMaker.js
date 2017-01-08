import React from 'react';
import styles from './ShieldChartMaker.css';
import FigureBuilder from './FigureBuilder';
import ShieldChart from './ShieldChart';
import { makeElements } from '../utils/figure';
import Logger from 'js-logger';
const log = Logger.get('<ShieldChartBuilder>');

function ShieldChartBuilder (props) {
  const { chart, field } = props;
  const houses = chart.getHouses();
  const figure = houses[field].figure;
  const elements = makeElements(figure);
  log.info('rendering', field, houses, figure.name, elements);

  return (
    <div>
      <div className={styles.chart}>
        <svg viewBox={props.viewBox.join(' ')} width='400' height='305'>
          <ShieldChart chart={chart} viewBox={props.viewBox} />
        </svg>
      </div>
      <div className={styles.builderBox}>
        <div className={styles.figureBuilder}>
          <FigureBuilder elements={elements} onSelect={props.onFigureSelect} />
        </div>
      </div>
    </div>
  );
}

export default ShieldChartBuilder;
