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
    y: T.number.isReuired,
    scaling: T.number
  }

  static defaultProps = {
    scaling: .5
  }

  render () {
    if (this.props.house < 0) {
      return null;
    }
    const message = "Selected House: " + this.props.house;
    return (
      <Group>
        <Rect
          x={this.props.x}
          y={this.props.y}
          stroke='black'
          onClick={this.props.onClick}
          strokeWidth={5 / this.props.scaling}
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
          fontSize={32*this.props.scaling}
        />
      </Group>
    );
  }
}
