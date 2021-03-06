import React from 'react';
import ShieldChartBG from './ShieldChartBG';
import styles from './ShieldChart.css';
import Figure from './Figure';
import Logger from 'js-logger';
const log = Logger.get('<ShieldChart>');

function makeNoop (name) {
  log.debug('Noop ' + name);
  return (evt) => {
    log.info(name + ' clicked');
  };
}

class ShieldChart extends React.Component {

  constructor (props) {
    super(props);
    this.coords = [
      [695, 20],
      [595, 20],
      [500, 20],
      [403, 20],
      [305, 20],
      [207, 20],
      [110, 20],
      [11, 20],
      [650, 200],
      [455, 200],
      [257, 200],
      [62, 200],
      [555, 370],
      [155, 370],
      [355, 400]
    ];
  }

  render () {
    const figures = [];
    const fields = this.props.chart.getShield();

    // log.info('ViewBox', this.props.viewBox)
    const {viewBox, selectedField} = this.props;

    this.props.chart.shieldKeys.forEach((key, ix) => {
      let [x, y] = this.coords[ix];
      const [vX, vY, maxX, maxY] = this.props.viewBox;
      const scale = (maxX - vX) / 200 / 4;
      figures.push(
        <Figure
          figure={fields.get(key)}
          field={ix}
          label={key}
          key={key}
          x={x}
          y={y}
          scale={scale}
          selected={selectedField == ix} />
      );
    });

    return (
      <g className={styles.normal}>
        <ShieldChartBG viewBox={this.props.viewBox} />
        {figures}
      </g>
    );
  }
}

export default ShieldChart;
