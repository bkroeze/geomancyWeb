import React from 'react';
import styles from './Figure.css';
import Logger from 'js-logger';
const log = Logger.get('<Figure>');

export class Figure extends React.Component {
  constructor (props) {
    super(props);
    // log.info('Props', props)
    this.scale = this.props.scale || 1;
  // log.info('ViewBox', this.viewBox)
  }

  makeElementLine (line) {
    const y = line * 23 + 15;
    const fill = this.props.selected ? 'red' : 'black';

    if (this.props.figure.getLine(line)) {
      return (<circle
                key={'line' + line}
                cx='40'
                cy={y}
                r='8'
                stroke='#888888 stroke-width=1'
                fill={fill} />);
    } else {
      return (<g key={'line' + line}>
                <circle
                  cx='15'
                  cy={y}
                  r='8'
                  stroke='#888888 stroke-width=1'
                  fill={fill} />
                <circle
                  cx='65'
                  cy={y}
                  r='8'
                  stroke='#888888 stroke-width=1'
                  fill={fill} />
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
    let {x, y} = this.props;
    if (!x) x = 0;
    if (!y) y = 0;
    x = x * this.scale;
    y = y * this.scale;
    const translate = `translate(${x},${y}) scale(${this.props.scale})`;
    return (
      <g transform={translate} className={styles.figure}>
        {lines}
        <rect
          className={styles.button}
          ref={e => this.hitBox = e}
          x={0}
          y={0}
          width={90}
          height={150} />
      </g>
    );
  }
};

export default Figure;
