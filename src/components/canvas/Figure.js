import React from 'react';
import { Figure as GeoFigure } from 'geomancy';
import { Group, Circle } from 'react-konva';
import Logger from 'js-logger';
const log = Logger.get('<Figure>');
const T = React.PropTypes;

export class ElementLine extends React.Component {
  static propTypes = {
    line: T.number.isRequired,
    width: T.number.isRequired,
    height: T.number.isRequired,
    active: T.bool,
    selected: T.bool
  }

  static defaultProps = {
    selected: false
  }

  render () {
    const {line, height, width, active, selected} = this.props;
    const y = Math.round(line * (height/4));
    const fill = selected ? 'red' : 'black';
    const radius = Math.round(width/8);

    if (active) {
      return (
        <Circle
          key={'line' + line}
          x={Math.round(width/2)}
          y={y}
          radius={radius}
          fill={fill} />
      );
    }
    return (
      <Group key={'line' + line}>
        <Circle
          x={Math.round(width/4)}
          y={y}
          radius={radius}
          fill={fill} />

        <Circle
          x={Math.round(width*3/4)}
          y={y}
          radius={radius}
          fill={fill} />
      </Group>
    );
  }
}

export class Figure extends React.Component {
  static propTypes = {
    selected: T.bool,
    height: T.number,
    width: T.number,
    x: T.number.isRequired,
    y: T.number.isRequired,
    figure: T.instanceOf(GeoFigure)
  }

  static defaultProps = {
    selected: false,
    height: 100,
    width: 80
  }

  makeElementLine (line) {
    const active = this.props.figure.getLine(line);
    const key = `element_${line}`;
    return (
      <ElementLine
        line={line}
        width={this.props.width}
        height={this.props.height}
        active={active}
        key={key}
        selected={this.props.selected}
        />
    );
  }

  render () {
    const lines = [
      this.makeElementLine(0),
      this.makeElementLine(1),
      this.makeElementLine(2),
      this.makeElementLine(3)
    ];
    let {x, y} = this.props;
    x = x-(this.props.width/2);
    y = y-(this.props.height/2);
    return (
      <Group x={x} y={y}>
        {lines}
      </Group>
    );
  }
};

export default Figure;
