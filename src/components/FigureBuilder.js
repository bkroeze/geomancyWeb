import React from 'react';
import { Figure } from 'geomancy';
import styles from './FigureBuilder.less';
import Toggle from 'material-ui/Toggle';
import Logger from 'js-logger';
const log = Logger.get('FigureBuilder');

class FigureBuilder extends React.Component {

  makeToggleSelect (elt) {
    return (evt, val) => {
      log.info('Toggle select: ', elt, val);
      const elements = this.props.elements;
      elements[elt.toLowerCase()] = val;
      this.props.onSelect(Figure.byElements(elements));
    };
  }

  makeToggle (elt) {
    const key = elt.toLowerCase();
    // console.log('makeToggle', elt, this.state)
    return (
      <Toggle
        className={styles.toggle}
        label={elt}
        key={key}
        toggled={this.props.elements[key]}
        onToggle={this.makeToggleSelect(key)} />
    );
  }

  render () {
    const toggles = ['Fire', 'Air', 'Water', 'Earth'].map(elt => {
      return this.makeToggle(elt);});

    return (
      <div className={styles.builderSelect}>
        {toggles}
      </div>
    );
  }
}

export default FigureBuilder;
