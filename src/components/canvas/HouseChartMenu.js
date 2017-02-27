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

  state = {
    selector: 'menu'
  }

  handleDetailsButton = (evt) => {
    this.setState({selector: 'details'});
  }

  handleFigureSelect = (reactEvt, figure) => {
    if (this.props.house < 4) {
      // only the mothers!
      this.props.onFigureSelect(reactEvt, figure);
    }
  }

  handleFigureButton = (evt) => {
    this.setState({selector: 'figure'});
  }

  componentWillReceiveProps() {
    this.setState({selector: 'menu'});
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
      fontSize: 48,
      x: this.props.x + (this.props.sizes.width/2),
      y: this.props.y + (this.props.sizes.height/2),
      controlX: this.props.sizes.width/8,
      controlY: this.props.sizes.height/8
    };

    const house = this.props.chart.getHouses()[this.props.house];
    const figure = house.figure;
    log.info('Selected figure', figure);
    log.info('state', this.state);

    let body;

    switch (this.state.selector) {
      case 'figure':
        body = (
          <FigureSelectorTable
            x={sizes.controlX}
            y={sizes.controlY}
            height={sizes.height}
            width={sizes.width}
            selected={figure}
            onSelect={this.handleFigureSelect}
            fill={this.props.fill}
          />);
          break;
      case 'menu':
        let changeFig = null;
        if (this.props.house < 4) {
          changeFig = (<Button x={350} y={0} width={300} height={80} fontSize={40}
            name="Change Figure" onClick={this.handleFigureButton}
            />);
        }    

        body = (
          <Group x={75} y={120}>
            <Button x={0} y={0} width={300} height={80} fontSize={40}
              name="House Details" onClick={this.handleDetailsButton}
              />
            {changeFig}
          </Group>
        );
        break;
      case 'details':
        body = (
          <Text
            x={0}
            y={120}
            width={sizes.width-40}
            height={100}
            align='center'
            text='details'
            wrap='word'
            fill='black'
            fontFamily='arial'
            fontStyle='normal'
            fontSize={sizes.fontSize}
            />
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
        {body}
      </Group>
    );
  }
}
