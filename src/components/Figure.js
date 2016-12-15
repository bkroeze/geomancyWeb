import React from 'react';
import styles from './Figure.css';

export class Figure extends React.Component {
  constructor (props) {
    super(props);
  }

  makeElementLine (line) {
    const y = line * 23 + 15;
    if (this.props.figure.getLine(line)) {
      return <circle
               key={'line' + line}
               cx='40'
               cy={y}
               r='8'
               stroke='#888888 stroke-width=1'
               fill='black' />;
    }else {
      return <g key={'line' + line}>
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
             </g>;
    }
  }

  render () {
    const lines = [
      this.makeElementLine(0),
      this.makeElementLine(1),
      this.makeElementLine(2),
      this.makeElementLine(3)
    ];
    return (
      <g>
        {lines}
      </g>
    );
  }
};

export default Figure;
