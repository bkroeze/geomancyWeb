import React from 'react';
import ShieldChartBG from './ShieldChartBG';
import styles from './ShieldChart.css';
import Figure from './Figure';
import Logger from 'js-logger';
const log = Logger.get('<ShieldChart>');

class ShieldChart extends React.Component {
  render () {
    const figures = [];
    const fields = this.props.chart.getShield();
    const coords = [
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
    log.info('ViewBox', this.props.viewBox);
    const {viewBox} = this.props;

    this.props.chart.shieldKeys.forEach((key, ix) => {
      let [x, y] = coords[ix];
      figures.push(
        <Figure
          figure={fields.get(key)}
          field={ix}
          label={key}
          x={x}
          y={y}
          viewBox={viewBox} />
      );
    });

    return (
      <g className={styles.normal}>
        {figures}
        <ShieldChartBG viewBox={this.props.viewBox} />
      </g>
    );
  }
}

export default ShieldChart;
