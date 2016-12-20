import React from 'react';
import styles from './Figure.css';
import Logger from 'js-logger';
const log = Logger.get('<Figure>');

export class Figure extends React.Component {
  constructor (props) {
    super(props);
    log.info('Props', props);
    let {viewBox} = props;
    if (!viewBox) {
      viewBox = [0, 0, 200, 150];
    }
    this.viewBox = viewBox;
    log.info('ViewBox', this.viewBox);
  }

  makeElementLine (line) {
    const y = line * 23 + 15;
    if (this.props.figure.getLine(line)) {
      return (<circle
                key={'line' + line}
                cx='40'
                cy={y}
                r='8'
                stroke='#888888 stroke-width=1'
                fill='black' />);
    }else {
      return (<g key={'line' + line}>
                <circle
                  cx='15'
                  cy={y}
                  r='8'
                  stroke='#888888 stroke-width=1'
                  fill='black' />
                <circle
                  cx='65'
                  cy={y}
                  r='8'
                  stroke='#888888 stroke-width=1'
                  fill='black' />
              </g>);
    }
  }

  render () {
    const lines = [
      this.makeElementLine(0),
      this.makeElementLine(1),
      this.makeElementLine(2),
      this.makeElementLine(3)
    ];
    let [vX, vY, maxX, maxY] = this.viewBox;
    let scaleX = (maxX - vX) / 200 / 4;
    let scaleY = (maxY - vY) / 150 / 4;
    let {x, y} = this.props;
    if (!x) x = 0;
    if (!y) y = 0;
    x = x * scaleX;
    y = y * scaleY;
    log.info('pos', x, y, maxX, maxY, scaleX, scaleY);
    const translate = `translate(${x},${y}) scale(${scaleX} ${scaleY})`;
    return (
      <g transform={translate}>
        {lines}
      </g>
    );
  }
};

export default Figure;
