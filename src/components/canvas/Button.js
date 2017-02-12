import React from 'react';
import Logger from 'js-logger';
import { Group, Text, Rect } from 'react-konva';
const log = Logger.get('<Button>');
const T = React.PropTypes;

class Button extends React.Component {
  static propTypes = {
    onClick: T.func.isRequired,
    name: T.string.isRequired,
    x: T.number.isRequired,
    y: T.number.isRequired,
    height: T.number,
    width: T.number,
    fill: T.string
  }

  static defaultProps = {
    height: 30,
    width: 200,
    fill: '#aaa'
  }

  render () {
    const tY = Math.floor(this.props.height/2-10);
    return (
      <Group x={this.props.x} y={this.props.y}
        onClick={evt => this.props.onClick(evt)}>
        <Rect x={0} y={0}
          height={this.props.height} width={this.props.width}
          fill={this.props.fill}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        />
        <Text
          x={0} y={tY}
          width={this.props.width}
          align='center'
          text={this.props.name}
          fill='black'
          fontSize={20}
        />
      </Group>
    );
  }
}

export default Button;
