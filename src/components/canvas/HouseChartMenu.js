import React from 'react';
import { Figure as GeoFigure } from 'geomancy';
import { Rect, Group, Circle, Text } from 'react-konva';
import Logger from 'js-logger';
const log = Logger.get('<HouseChartMenu>');
const T = React.PropTypes;

export default class HouseChartMenu extends React.Component {
  static propTypes = {
    house: T.number.isRequired,
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
      width: (this.props.width/2) * scaling,
      height: (this.props.height/2) * scaling,
      strokeWidth: 10 * scaling,
      fontSize: 32 * scaling,
      x: (this.props.width*.25) * scaling,
      y: (this.props.height*.25) * scaling
    };

    return (
      <Group>
        <Rect
          x={this.props.x}
          y={this.props.y}
          width={sizes.width}
          height={sizes.height}
          fill="tan"
          stroke='black'
          strokeWidth={sizes.strokeWidth}
          />
        <Text
          x={10}
          y={75}
          width={180}
          height={100}
          align='center'
          text={message}
          wrap='word'
          fill='black'
          fontFamily='arial'
          fontStyle='normal'
          fontSize={sizes.fontSize}
        />
      </Group>
    );
  }
}
