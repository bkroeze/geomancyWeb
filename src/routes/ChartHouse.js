import React from 'react';
import { connect } from 'dva';
import styles from './ChartHouse.css';
import HouseChartMaker from '../components/canvas/HouseChartMaker';
import { makeSeedhash } from '../utils/figure';
import Logger from 'js-logger';
import { Stage, Layer, Path } from 'react-konva';
import { isRightClick, cancelEvent } from '../utils/mouse';

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
      rotation: 90
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

  makeData (x, y, sideLen, direction) {
    let x1=x,
      y1=y,
      x2=x,
      y2=y;

    const rad45 = 46 * Math.PI / 180;

    switch(direction) {
      case 'S':
        x1 -= (sideLen * Math.cos(rad45));
        y1 -= (sideLen * Math.sin(rad45));
        x2 += (sideLen * Math.cos(rad45));
        y2 = y1;
        break;

      case 'N':
        x1 -= (sideLen * Math.cos(rad45));
        y1 += (sideLen * Math.sin(rad45));
        x2 += (sideLen * Math.cos(rad45));
        y2 = y1;
        break;

      case 'E':
        x1 -= (sideLen * Math.cos(rad45));
        y1 += (sideLen * Math.sin(rad45));
        x2 = x1;
        y2 -= (sideLen * Math.sin(rad45));
        break;

      case 'W':
        x1 += (sideLen * Math.cos(rad45));
        y1 += (sideLen * Math.sin(rad45));
        x2 = x1;
        y2 -= (sideLen * Math.sin(rad45));
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
      x: 800,
      y: 800
    }

    // <HouseChartMaker
    //   viewBox={viewbox}
    //   chart={this.props.chart}
    //   field={this.props.field}
    //   onFigureSelect={selectFigure}
    //   onFieldSelect={selectField} />

    // x, y, rotation
    const houseLayout = [
      [99, 100, 'W'],
      [74, 144, 'E'],
      [99, 200, 'N'],
      [400, 400, 'S'],

      [],
      [],
      [],
      [],

      [],
      [],
      [],
      []
    ]

    let triangles = houseLayout.map((pos, ix) => {
      if (pos.length === 0) {
        return null;
      }
      const [x, y, direction] = pos;

      // rotation={rotation}

      return (<Path
        data={this.makeData(x*5, y*5, 250, direction)}
        key={'house' + ix}
        fill='red'
        stroke='black'
        strokeWidth={15}
        />);
    });


    return (
      <div className={styles.normal}>
        <Stage height={sizes.x*5} width={sizes.y*5} scaleX={.2} scaleY={.2}>
          <Layer x={0} y={0}
            ref={(ref) => { this.layer = ref; }}
          >
            {triangles}
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
