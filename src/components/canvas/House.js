import React from 'react';
import Logger from 'js-logger';
import { Path } from 'react-konva';
import { isRightClick, cancelEvent } from '../../utils/mouse';
const log = Logger.get('<House>');
const T = React.PropTypes;

class House extends React.Component {
  static propTypes = {
    onClick: T.function,
    x: T.number.isRequired,
    y: T.number.isRequired,
    offset: T.number.isRequired,
    direction: T.string.isRequired,
    selected: T.bool
  }

  static defaultProps = {
    onClick: function() {},
    selected: false
  }

  constructor (props) {
    super(props);
    this.data = this.makePathData();
  }

  makePathData () {
    const {x, y, direction, offset} = this.props;

    let x1 = x,
      y1 = y,
      x2 = x,
      y2 = y;

    switch (direction) {
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

    const data = `M ${x} ${y} L ${x1} ${y1} L ${x2} ${y2} L ${x} ${y} Z`;
    log.debug('Data:', data);
    return data;
  }

  render () {
    return (
      <Path
        data={this.data}
        fill={this.props.selected ? 'gray' : 'white'}
        stroke='black'
        onClick={this.props.onClick}
        strokeWidth={5 / this.props.scaling} />
    );
  }
}

export default House;
