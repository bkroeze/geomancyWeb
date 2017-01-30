import React from 'react';
import { Stage, Layer, Path } from 'react-konva';
import { Chart } from 'geomancy';
import { isRightClick, cancelEvent } from '../../utils/mouse';
import House from './House';
import styles from './HouseChart.css';
const T = React.PropTypes;

import Logger from 'js-logger';
const log = Logger.get('<HouseChart>');

function noRightClick(e) {
  e.preventDefault();
  cancelEvent(e);
}

function stopRightClick(el) {
  log.info('stopping rt click on', el);
  el.addEventListener("contextmenu", noRightClick);
}

function startRightClick(el) {
  el.removeEventListener("contextmenu", noRightClick);
}

class HouseChart extends React.Component {
  static PropTypes = {
      chart: T.instanceOf(Chart).isRequired,
      onClick: T.func.isRequired,
      selectedHouse: T.number,
      scaling: T.number
  };

  static defaultProps = {
    selectedHouse: -1,
    scaling: .5
  };

  componentDidMount () {
    stopRightClick(this.layer.canvas._canvas);
  }

  componentWillMount () {
    // log.info('params', this.props.params);
    // let { seeds } = this.props.params;
    // if (seeds) {
    //   seeds = seeds.replace('-', ' ').split(',');
    //   log.info('seeds', seeds);
    //   this.props.dispatch({type: 'chart-house/SELECT_SEEDS', payload: seeds});
    // }
  }

  componentWillUnmount () {
    startRightClick(this.layer.canvas._canvas);
  }

  makeData (x, y, offset, direction) {
    let x1=x,
      y1=y,
      x2=x,
      y2=y;

    const rad45 = 46 * Math.PI / 180;

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
      x: 800/this.props.scaling,
      y: 800/this.props.scaling,
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
      const onClick = (reactEvt) => {
        log.debug('Clicked house ' + ix);
        this.props.onClick(reactEvt, ix);
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
          onClick={onClick}
        />);
    });

    return (
      <div className={styles.normal}>
        <Stage height={sizes.x} width={sizes.y}
          scaleX={this.props.scaling} scaleY={this.props.scaling}>
          <Layer x={0} y={0} ref={(ref) => { this.layer = ref; }}>
            {houses}
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default HouseChart;
