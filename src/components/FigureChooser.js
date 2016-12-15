import React from 'react';
import styles from './FigureChooser.css';
import Select from 'react-select';
import { Figures } from 'geomancy';
import Logger from 'js-logger';
const log = Logger.get('<FigureChooser>');

class FigureChooser extends React.Component {
  constructor (props) {
    super(props);
  }

  getFigureOptions () {
    const opts = [];
    for (let [key, fig] of Object.entries(Figures)) {
      opts.push({label: fig.name, value: fig.name});
    }
    log.debug('opts', opts);
    return opts;
  }

  select (val) {
    log.info('Selected: ', val, this, this.props);
    this.props.select(val);
  }

  render () {
    const select = (val) => {
      this.select(val.value);
    };
    return (
      <Select
        name='form-field-name'
        value={this.props.selected.name}
        options={this.getFigureOptions()}
        onChange={select} />
    );
  }
}

export default FigureChooser;
