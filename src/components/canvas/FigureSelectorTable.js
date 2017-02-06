import React from 'react';
import Logger from 'js-logger';
import { Figure as GeoFigure } from 'geomancy';
import Figure from './Figure';
import { Group, Path } from 'react-konva';
import { isRightClick, cancelEvent } from '../../utils/mouse';
const log = Logger.get('<FigureSelectorTable>');
const T = React.PropTypes;

class FigureSelectorTable extends React.Component {
  static propTypes = {
    onSelect: T.func.isRequired,
    x: T.number.isRequired,
    y: T.number.isRequired,
    selected: T.instanceOf(GeoFigure),
    width: T.number.isRequied,
    height: T.number.isRequired
  }

  static defaultProps = {
    selected: null
  }

  render () {
    const figures = [];
    let x, y, fig;
    const figureNumbers = [0,1,10,11,100,101,110,111,1000,1001,1010,1011,1100,1101,1110,1111];
    for (let i=0; i<16; i++) {
      fig = new GeoFigure(figureNumbers[i]);
      x = i % 4 * this.props.width / 4
      y = Math.floor(i/4) * this.props.height / 4;
      figures.push(<Figure figure={fig} x={x} y={y} selected={fig.name == this.props.selected.name} />);
    }
    return (
      <Group x={this.props.x} y={this.props.y}>
        {figures}
      </Group>
    )
  }
}

export default FigureSelectorTable;
