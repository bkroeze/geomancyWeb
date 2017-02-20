import React from 'react';
import { Stage, Layer, Path } from 'react-konva';
import styles from './HouseChartMaker.css';
import HouseChart from './HouseChart';
import HouseChartMenu from './HouseChartMenu';
import { toggleRightClick } from '../../utils/mouse';
import Logger from 'js-logger';

const log = Logger.get('<HouseChartMaker>');
const T = React.PropTypes;

class HouseChartMaker extends React.Component {
  static propTypes = {
    onFigureSelect: T.func.isRequired,
    onHouseSelect: T.func,
    selectedHouse: T.number.isRequired,
    sizes: T.object,
    scaling: T.number
  }

  static defaultProps = {
    scaling: .5,
    sizes: {
      width: 800,
      height: 800
    }
  }

  componentDidMount () {
    toggleRightClick(false, this.layer.canvas._canvas);
  }

  componentWillUnmount () {
    toggleRightClick(true, this.layer.canvas._canvas);
  }

  handleHouseSelect = (reactEvt, house) => {
    this.setState({selectedHouse: house});
    if (this.props.onHouseSelect) {
      this.props.onHouseSelect(reactEvt, house);
    }
  }

  render() {
    const { chart, sizes, scaling, onFigureSelect, selectedHouse } = this.props;

    return (
      <div className={styles.chart}>
        <Stage height={sizes.height} width={sizes.width}
          scaleX={scaling} scaleY={scaling}>
          <Layer x={0} y={0} ref={(ref) => { this.layer = ref; }}>
            <HouseChart
              chart={chart}
              sizes={sizes}
              selectedHouse={selectedHouse}
              onHouseSelect={this.handleHouseSelect}
              />
            <HouseChartMenu
              x={0}
              y={0}
              scaling={scaling}
              sizes={sizes}
              house={selectedHouse}
              chart={chart}
              onFigureSelect={onFigureSelect} />
          </Layer>
        </Stage>
      </div>
    );
  }
}

export default HouseChartMaker;
