import React from 'react';
import { connect } from 'dva';
import { Chart } from 'geomancy';
import styles from './ChartShield.css';
import ShieldChart from '../components/ShieldChart';
import Logger from "js-logger";
const log = Logger.get("<ChartShield>");

class ChartShield extends React.Component {
  eventToSvgCoords (e) {
    var pt = this.svg.createSVGPoint();
    pt.x = e.clientX;
    pt.y = e.clientY;
    pt = pt.matrixTransform(this.svg.getScreenCTM().inverse());
    const coords = [pt.x, pt.y];
    log.info('ChartShield click: ', coords);
    return coords;
  }

  render () {
    const chart = new Chart();
    const onClick = (e) => {
      console.log('clicked shield', e);
      let coords = this.eventToSvgCoords(e);
      this.shieldChart.handleClick(coords);
    };

    return (
      <div className={styles.normal}
        onClick={onClick}
        >
        <svg
          viewBox='0 0 1000 750'
          width='400'
          height='305'
          ref={(ref) => { this.svg = ref; }}
          eventToSvgCoords={this.eventToSvgCoords}
          style={{pointerEvents: 'none'}}>
          <ShieldChart viewBox={[0, 0, 1000, 750]} chart={chart} ref={(ref) => { this.shieldChart = ref; }} />
        </svg>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {};
}

export default connect(mapStateToProps)(ChartShield);
