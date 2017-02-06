import React from 'react';
import { Figure as GeoFigure, Chart } from 'geomancy';
import { Rect, Group, Circle, Text } from 'react-konva';
import FigureSelectorTable from './FigureSelectorTable';
import Logger from 'js-logger';
const log = Logger.get('<HouseChartMenu>');
const T = React.PropTypes;

export default class HouseChartMenu extends React.Component {
  static propTypes = {
    house: T.number.isRequired,
    chart: T.instanceOf(Chart).isRequired,
    x: T.number.isRequired,
    y: T.number.isRequired,
    scaling: T.number,
    sizes: T.object.isRequired,
    onFigureSelect: T.func
  }

  static defaultProps = {
    scaling: .5
  }

  render () {
    if (this.props.house < 0) {
      return <Group />;
    }
    const message = "Selected House: " + this.props.house;
    const { scaling } = this.props;
    const sizes = {
      width: (this.props.sizes.width/2) / scaling,
      height: (this.props.sizes.height/2) / scaling,
      strokeWidth: 5 / scaling,
      fontSize: 32 / scaling,
      x: this.props.x + (this.props.sizes.width*.25) / scaling,
      y: this.props.y + (this.props.sizes.height*.25) / scaling
    };

    const house = this.props.chart.getHouses()[this.props.house];
    const figure = house.figure;

    return (
      <Group
        x={sizes.x}
        y={sizes.y}>
        <Rect
          x={0}
          y={0}
          width={sizes.width}
          height={sizes.height}
          fill="#ddd"
          stroke='black'
          strokeWidth={sizes.strokeWidth}
          />
        <Text
          x={20}
          y={20}
          width={sizes.width-40}
          height={100}
          align='center'
          text={message}
          wrap='word'
          fill='black'
          fontFamily='arial'
          fontStyle='normal'
          fontSize={sizes.fontSize}
        />
        <FigureSelectorTable
          x={100}
          y={180}
          height={sizes.height-120}
          width={sizes.width-40}
          selected={figure}
          osSelect={this.props.onFigureSelect}
        />
      </Group>
    );
  }
}
