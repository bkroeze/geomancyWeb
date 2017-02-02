import React from 'react';
import { Stage, Layer, Path } from 'react-konva';
import styles from './HouseChartMaker.css';
import HouseChart from './HouseChart';
import HouseChartMenu from './HouseChartMenu'
import Logger from 'js-logger';

const log = Logger.get('<HouseChartMaker>');

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

class HouseChartMaker extends React.Component {
  componentDidMount () {
    stopRightClick(this.layer.canvas._canvas);
  }

  componentWillUnmount () {
    startRightClick(this.layer.canvas._canvas);
  }

  render() {
    const { chart, house } = props;

    return (
      <div className={styles.chart}>
        <Stage height={sizes.x} width={sizes.y}
          scaleX={this.props.scaling} scaleY={this.props.scaling}>
          <Layer x={0} y={0} ref={(ref) => { this.layer = ref; }}>
            <HouseChart
              chart={chart}
              selectedHouse={this.props.house}
              onHouseSelect={onHouseSelect} />
            <HouseChartMenu
              x={0}
              y={0}
              scaling={this.props.scaling}
              house={this.props.house}
              onFigureSelect={this.props.onFigureSelect} />
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default HouseChartBuilder;
