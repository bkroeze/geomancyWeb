import React from 'react';
import { Chart } from 'geomancy';
import { Group } from 'react-konva';
import { isRightClick, cancelEvent } from '../../utils/mouse';
import House from './House';
import styles from './HouseChart.css';
const T = React.PropTypes;

import Logger from 'js-logger';
const log = Logger.get('<HouseChart>');

const rad45 = 46 * Math.PI / 180;

class HouseChart extends React.Component {
  static PropTypes = {
      chart: T.instanceOf(Chart).isRequired,
      onHouseSelect: T.func.isRequired,
      selectedHouse: T.number,
      scaling: T.number,
      sizes: T.object
  };

  static defaultProps = {
    selectedHouse: -1,
    scaling: .5,
    sizes: {
      x: 800,
      y: 800
    }
  };

  makeData (x1, y1, offset, direction) {
    let x2=x1, y2=y2;

    switch(direction) {
      case 'S':
        x1 -= offset;
        y1 -= offset;
        x2 += offset;
        y2 = y1;
        break;

      case 'N':
        x1 -= offset;
        y1 += offset;
        x2 += offset;
        y2 = y1;
        break;

      case 'E':
        x1 -= offset;
        y1 += offset;
        x2 = x1;
        y2 -= offset;
        break;

      case 'W':
        x1 += offset;
        y1 += offset;
        x2 = x1;
        y2 -= offset;
        break;
    }

    const data= `M ${x} ${y} L ${x1} ${y1} L ${x2} ${y2} L ${x} ${y} Z`;
    log.debug('Data:', data);
    return data;
  }

  render () {
    // makeSeedhash(this.props.chart);
    const sizes = {
      x: this.props.sizes.width/this.props.scaling,
      y: this.props.sizes.height/this.props.scaling,
    }

    const rad45 = 45 * Math.PI / 180;
    const offset = Math.sqrt((sizes.x/2)*(sizes.x/2)/4);
    //log.debug('offset = ' + offset);

    const houseLayout = [
      [0, 2*offset, 'W'],
      [offset, 3*offset, 'E'],
      [offset, 3*offset, 'N'],
      [2*offset, 4*offset, 'S'],

      [3*offset, 3*offset, 'N'],
      [3*offset, 3*offset, 'W'],
      [4*offset, 2*offset, 'E'],
      [3*offset, offset, 'W'],

      [3*offset, offset, 'S'],
      [2*offset, 0, 'N'],
      [offset, offset, 'S'],
      [offset, offset, 'E']
    ]

    const chartHouses = this.props.chart.getHouses();

    const houses = houseLayout.map((pos, ix) => {
      const [x, y, direction] = pos;
      const onHouseSelect = (reactEvt) => {
        log.debug('Clicked house ' + ix);
        this.props.onHouseSelect(reactEvt, ix);
      }

      return (
        <House
          x={x}
          y={y}
          offset={offset}
          direction={direction}
          key={'house_' + ix}
          scaling={this.props.scaling}
          selected={ix === this.props.selectedHouse}
          figure={chartHouses[ix].figure}
          onClick={onHouseSelect}
        />);
    });

    return (
      <Group>
        {houses}
      </Group>
    );
  }
}

export default HouseChart;
