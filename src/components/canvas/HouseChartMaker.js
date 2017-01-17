import React from 'react';
import IconButton from 'material-ui/IconButton';
import KeyboardArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import KeyboardArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import styles from './HouseChartMaker.css';
import FigureBuilder from '../ui/FigureBuilder';
import HouseChart from './HouseChart';
import { makeElements } from '../../utils/figure';
import Logger from 'js-logger';
const log = Logger.get('<HouseChartMaker>');

function HouseChartBuilder (props) {
  const { chart, field } = props;
  const houses = chart.getHouses();
  const figure = houses[field].figure;
  const elements = makeElements(figure);
  // log.info('rendering', field, houses, figure.name, elements)

  const nextField = () => {
    log.info('next field: ', field + 1);
    props.onFieldSelect(field + 1);
  };

  const prevField = () => {
    log.info('prev field: ', field - 1);
    props.onFieldSelect(field - 1);
  };

  return (
    <div>
      <div className={styles.chart}>
        <svg viewBox={props.viewBox.join(' ')} width='400' height='400'>
          <HouseChart chart={chart} viewBox={props.viewBox} selectedField={field} />
        </svg>
      </div>
      <div className={styles.builderBox}>
        <div className={styles.figureBuilder}>
          <IconButton disabled={field > 2} onClick={nextField} className={styles.buttons}>
            <KeyboardArrowLeft />
          </IconButton>
          <IconButton disabled={field < 1} onClick={prevField} className={styles.buttons}>
            <KeyboardArrowRight />
          </IconButton>
          <FigureBuilder elements={elements} onSelect={props.onFigureSelect} />
        </div>
      </div>
    </div>
  );
}

export default HouseChartBuilder;
