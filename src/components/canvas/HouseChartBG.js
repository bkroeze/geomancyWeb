import React from 'react';
import styles from './HouseChartBG.css';

function HouseChart (props) {
  // transform='matrix(1.0166983,0,0,1.1046738,-5.5509863,-27.515956)

  let [x, y, maxX, maxY] = props.viewBox;

  const scaleX = ((maxX - x) / 200);
  const scaleY = ((maxY - y) / 150);
  x = (-261 + x) * scaleX;
  y = (-184 + y) * scaleY;

  const transform = `translate(${x} ${y}) scale(${scaleX} ${scaleY})`;

  return (
    <g transform={transform}>
      <path id='path3796' d='m 262.49031,185.27009 194.68502,0 0,90.16614 c 0.38628,44.15734 -85.65374,26.58427 -97.34252,44.0181 l 0,0 c -11.68878,-17.67049 -97.06935,-0.0222 -97.3425,-44.72808 z'
        style={{fill: 'none',stroke: '#000000','strokeWidth': 1.63303113,'strokeLinecap': 'butt','strokeLinejoin': 'round','strokeMiterlimit': 4,'strokeDasharray': 'none','strokeOpacity': 1}} />
      <path id='path3798' d='m 262.50778,229.96205 194.47643,-0.25101 -0.27314,-0.50202' style={{fill: 'none',stroke: '#000000','strokeWidth': 1.63303113,'strokeLinecap': 'butt','strokeLinejoin': 'miter','strokeMiterlimit': 4,'strokeDasharray': 'none','strokeOpacity': 1}} />
      <path id='path3802' d='m 262.23462,274.64222 195.02273,0' style={{fill: 'none',stroke: '#000000','strokeWidth': 1.63303113,'strokeLinecap': 'butt','strokeLinejoin': 'miter','strokeMiterlimit': 4,'strokeDasharray': 'none','strokeOpacity': 1}} />
      <path id='path3804' d='m 384.05555,185.78391 0,43.67612 0.54628,0' style={{fill: 'none',stroke: '#000000','strokeWidth': 1.63303113,'strokeLinecap': 'butt','strokeLinejoin': 'miter','strokeMiterlimit': 4,'strokeDasharray': 'none','strokeOpacity': 1}} />
      <path id='path3806' d='m 408.63824,185.28189 0,44.17814 0.27315,0' style={{fill: 'none',stroke: '#000000','strokeWidth': 1.63303113,'strokeLinecap': 'butt','strokeLinejoin': 'miter','strokeMiterlimit': 4,'strokeDasharray': 'none','strokeOpacity': 1}} />
      <path id='path3808' d='m 433.22094,185.28189 0,43.92713 -0.27314,0' style={{fill: 'none',stroke: '#000000','strokeWidth': 1.63303113,'strokeLinecap': 'butt','strokeLinejoin': 'miter','strokeMiterlimit': 4,'strokeDasharray': 'none','strokeOpacity': 1}} />
      <path id='path3810' d='m 335.70961,185.28189 0,43.92713 0.2731,0' style={{fill: 'none',stroke: '#000000','strokeWidth': 1.63303113,'strokeLinecap': 'butt','strokeLinejoin': 'miter','strokeMiterlimit': 4,'strokeDasharray': 'none','strokeOpacity': 1}} />
      <path id='path3812' d='m 311.40005,185.28189 0,44.17814 -0.27315,0 0,0.25101' style={{fill: 'none',stroke: '#000000','strokeWidth': 1.63303113,'strokeLinecap': 'butt','strokeLinejoin': 'miter','strokeMiterlimit': 4,'strokeDasharray': 'none','strokeOpacity': 1}} />
      <path id='path3814' d='m 287.09049,185.28189 0,44.17814 0,0 0,0.25101' style={{fill: 'none',stroke: '#000000','strokeWidth': 1.63303113,'strokeLinecap': 'butt','strokeLinejoin': 'miter','strokeMiterlimit': 4,'strokeDasharray': 'none','strokeOpacity': 1}} />
      <path id='path3816' d='m 311.40005,230.21307 0,44.17814' style={{fill: 'none',stroke: '#000000','strokeWidth': 1.63303113,'strokeLinecap': 'butt','strokeLinejoin': 'miter','strokeMiterlimit': 4,'strokeDasharray': 'none','strokeOpacity': 1}} />
      <path id='path3818' d='m 408.63824,229.46003 0,44.93118' style={{fill: 'none',stroke: '#000000','strokeWidth': 1.63303113,'strokeLinecap': 'butt','strokeLinejoin': 'miter','strokeMiterlimit': 4,'strokeDasharray': 'none','strokeOpacity': 1}} />
      <path id='path3820' d='m 360.01911,185.28189 0,89.10932 -48.48251,33.63563' style={{fill: 'none',stroke: '#000000','strokeWidth': 1.63303113,'strokeLinecap': 'butt','strokeLinejoin': 'miter','strokeMiterlimit': 4,'strokeDasharray': 'none','strokeOpacity': 1}} />
      <path id='path3822' d='m 360.01911,274.39121 48.61913,33.63562' style={{fill: 'none',stroke: '#000000','strokeWidth': 1.63303113,'strokeLinecap': 'butt','strokeLinejoin': 'miter','strokeMiterlimit': 4,'strokeDasharray': 'none','strokeOpacity': 1}} />
    </g>
  );
}

export default HouseChart;
