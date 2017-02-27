import React from 'react';
import { Figure as GeoFigure, Chart } from 'geomancy';
import { Rect, Group, Circle, Text } from 'react-konva';
import FigureSelectorTable from './FigureSelectorTable';
import Button from './Button';
import Logger from 'js-logger';
const log = Logger.get('<HouseChartMenu>');
const T = React.PropTypes;

export default class HouseChartMenu extends React.Component {
  static propTypes = {
    house: T.number.isRequired,
    chart: T.instanceOf(Chart).isRequired,
    x: T.number.isRequired,
    y: T.number.isRequired,
    sizes: T.object.isRequired,
    onFigureSelect: T.func,
    fill: T.string
  }

  static defaultProps = {
    fill: '#ddd'
  }

  handleFigureSelect = (reactEvt, figure) => {
    if (this.props.house < 4) {
      // only the mothers!
      this.props.onFigureSelect(reactEvt, figure);
    }
  }

  render () {
    if (this.props.house < 0) {
      return <Group />;
    }
    const message = "Selected House: " + this.props.house;
    const sizes = {
      width: (this.props.sizes.width),
      height: (this.props.sizes.height),
      strokeWidth: 5,
      fontSize: 32,
      x: this.props.x + (this.props.sizes.width/2),
      y: this.props.y + (this.props.sizes.height/2),
      controlX: this.props.sizes.width/8,
      controlY: this.props.sizes.height/8
    };

    const house = this.props.chart.getHouses()[this.props.house];
    const figure = house.figure;
    log.info('Selected figure', figure);

    let options;

    if (this.props.house < 4) {
      options = (
        <FigureSelectorTable
          x={sizes.controlX}
          y={sizes.controlY}
          height={sizes.height}
          width={sizes.width}
          selected={figure}
          onSelect={this.handleFigureSelect}
          fill={this.props.fill}
        />);
    } else {
      let onClick = (evt) => {
        log.info('Clicked button');
      }
      options = (
        <Button x={117} y={180} width={200} name="House Details" onClick={onClick}/>
      );
    }

    return (
      <Group
        x={sizes.x}
        y={sizes.y}>
        <Rect
          x={0}
          y={0}
          width={sizes.width}
          height={sizes.height}
          fill={this.props.fill}
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
        {options}
      </Group>
    );
  }
}
