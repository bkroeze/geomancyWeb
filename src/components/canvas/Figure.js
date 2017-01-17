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
    active: T.bool
  }

  render () {
    const {line} = this.props
    const y = line * (this.props.height/4);
    const fill = this.props.selected ? 'red' : 'black';
    const radius = Math.round(this.props.width/8);

    if (this.props.active) {
      log.info('returning active line');
      return (<Circle
                key={'line' + line}
                x={this.props.width/2}
                y={y}
                radius={radius}
                fill={fill} />);
    }
    log.info('returning passive line');
    return (
      <Group key={'line' + line}>
        <Circle
          x={this.props.width/4}
          y={y}
          radius={radius}
          fill={fill} />

        <Circle
          x={this.props.width*3/4}
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
