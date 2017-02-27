import React from 'react';
import Logger from 'js-logger';
import { Figure as GeoFigure } from 'geomancy';
import Figure from './Figure';
import { Group, Path, Text } from 'react-konva';
import { isRightClick, cancelEvent } from '../../utils/mouse';
import _ from 'lodash';
const log = Logger.get('<House>');
const T = React.PropTypes;

class House extends React.Component {
  static propTypes = {
    house: T.number.isRequired,
    onClick: T.func,
    x: T.number.isRequired,
    y: T.number.isRequired,
    offset: T.number.isRequired,
    direction: T.string.isRequired,
    selected: T.bool,
    figure: T.instanceOf(GeoFigure),
    showAnnotations: T.bool
  }

  static defaultProps = {
    onClick: function() {},
    selected: false,
    showAnnotations: false
  }

  getCentroid (points, offset) {
    const [p1, p2, p3] = points;
    return {
      x: Math.floor((p1.x + p2.x + p3.x)/3 + offset.x),
      y: Math.floor((p1.y + p2.y + p3.y)/3 + offset.y),
    }
  }

  getTrianglePoints () {
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
    return [{x, y}, {x: x1, y: y1}, {x: x2, y: y2}];
  }

  makePathData (points) {
    const [p1, p2, p3] = points;
    return `M ${p1.x} ${p1.y} L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} L ${p1.x} ${p1.y} Z`;
  }

  render () {
    const points = this.getTrianglePoints();
    const data = this.makePathData(points);

    const houseShape = (
      <Path
        data={data}
        fill={this.props.selected ? 'gray' : 'white'}
        stroke='black'
        onClick={this.props.onClick}
        strokeWidth={5 / this.props.scaling} />
    );

    if (this.props.figure) {
      const pos =  this.getCentroid(points, {x: 0, y: 0});

      let annotations = [];
      if (this.props.showAnnotations) {
        const {house} = this.props;
        let {strong, weak} = this.props.figure.details.houses;
        if (!_.isArray(strong)) { strong = [strong] }
        if (!_.isArray(weak)) { weak = [weak] }

        const houseHit = (acc, val) => { return val === house ? 1 : acc};
        if (strong.reduce(houseHit, 0) > 0) {
          log.info("strong", house, strong, weak);
          annotations.push(
            <Text
              key={"strong" + house}
              text='+'
              fontSize={100}
              fill='#aaa'
              x={pos.x+20}
              y={pos.y-150}
            />
          );
        }
        if (weak.reduce(houseHit, 0) > 0) {
          log.info("weak", house);
          annotations.push(
            <Text
              key={"weak" + house}
              text='&ndash;'
              fontSize={100}
              fill='#aaa'
              x={pos.x+20}
              y={pos.y-150}
            />
          );
        }
      }

      return (
        <Group>
          {houseShape}
          <Figure figure={this.props.figure} x={pos.x} y={pos.y} />
          {annotations}
        </Group>
      );
    }
    // No figure
    return houseShape;
  }
}

export default House;
