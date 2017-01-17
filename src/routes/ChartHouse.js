import React from 'react';
import { connect } from 'dva';
import styles from './ChartHouse.css';
import HouseChartMaker from '../components/canvas/HouseChartMaker';
import { makeSeedhash } from '../utils/figure';
import Logger from 'js-logger';
import { Stage, Layer, Path } from 'react-konva';
import { isRightClick, cancelEvent } from '../utils/mouse';
import House from '../components/canvas/House';

const log = Logger.get('<ChartHouse>');

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

class ChartHouse extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      rotation: 90,
      scaling: .5
    }
  }

  componentDidMount () {
    log.debug('stopping rt-click', this.layer);
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

  handleClick = () => {
    console.log(this.state.rotation+1);
    this.setState({rotation: this.state.rotation+1});
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
    const selectFigure = (val) => {
      // log.info('Selected: ', event, index, val)
      this.props.dispatch({type: 'chart-house/SELECT_FIGURE', payload: val});
    };

    const selectField = (val) => {
      this.props.dispatch({type: 'chart-house/SELECT_FIELD', payload: val});
    };

    const sizes = {
      x: 800/this.state.scaling,
      y: 800/this.state.scaling,
    }

    const rad45 = 45 * Math.PI / 180;
    const offset = Math.sqrt((sizes.x/2)*(sizes.x/2)/4);
    log.debug('offset = ' + offset);

    // <HouseChartMaker
    //   viewBox={viewbox}
    //   chart={this.props.chart}
    //   field={this.props.field}
    //   onFigureSelect={selectFigure}
    //   onFieldSelect={selectField} />

    // x, y, rotation

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

    const houses = houseLayout.map((pos, ix) => {
      const [x, y, direction] = pos;

      return (
        <House
          x={x}
          y={y}
          offset={offset}
          direction={direction}
          key={'house_' + ix}
          scaling={this.state.scaling}
          onClick={() => { console.log('clicked house ' + ix) }}
        />);
    });

    return (
      <div className={styles.normal}>
        <Stage height={sizes.x} width={sizes.y}
          scaleX={this.state.scaling} scaleY={this.state.scaling}>
          <Layer x={0} y={0} ref={(ref) => { this.layer = ref; }}>
            {houses}
          </Layer>
        </Stage>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    chart: state['chart-house'].chart,
    field: state['chart-house'].field
  };
}

export default connect(mapStateToProps)(ChartHouse);
