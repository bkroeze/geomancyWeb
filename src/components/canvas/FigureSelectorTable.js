import React from 'react';
import Logger from 'js-logger';
import { Figure as GeoFigure } from 'geomancy';
import Figure from './Figure';
import { Group, Path, Rect } from 'react-konva';
import { isRightClick, cancelEvent } from '../../utils/mouse';
const log = Logger.get('<FigureSelectorTable>');
const T = React.PropTypes;

class FigureSelectorTable extends React.Component {
  static propTypes = {
    onSelect: T.func.isRequired,
    x: T.number.isRequired,
    y: T.number.isRequired,
    selected: T.instanceOf(GeoFigure),
    width: T.number.isRequired,
    height: T.number.isRequired,
    onSelect: T.func
  }

  static defaultProps = {
    selected: null,
    onSelect: null
  }

  render () {
    const figures = [],
      width = Math.floor(this.props.width/4),
      height = Math.floor(this.props.width/4),
      figureNumbers = [0,1,10,11,100,101,110,111,1000,1001,1010,1011,1100,1101,1110,1111];

    for (let i=0; i<16; i++) {
      const fig = new GeoFigure(figureNumbers[i]);
      const onClick = (evt) => {
        this.props.onSelect(evt, fig);
      }
      const x = i % 4 * this.props.width / 4
      const y = Math.floor(i/4) * this.props.height / 4;
      // <Rect x={-width/2} y={-height/2} width={width} height={height} onClick={onClick} fill="#fff" stroke="gray" strokeWidth={2} />
      figures.push(
        <Group x={x} y={y} key={fig.name} onClick={onClick}>
          <Rect x={-width/2} y={-height/2} width={width} height={height} fill="#fff" />
          <Figure figure={fig} x={0} y={0} selected={fig.name == this.props.selected.name} />
        </Group>
      );
    }
    return (
      <Group x={this.props.x} y={this.props.y}>
        {figures}
      </Group>
    )
  }
}

export default FigureSelectorTable;
