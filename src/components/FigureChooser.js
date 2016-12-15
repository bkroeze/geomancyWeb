import React from 'react';
import styles from './FigureChooser.css';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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
      opts.push(
        <MenuItem value={fig.name} primaryText={fig.name} key={'fig:' + fig.flags}/>
      );
    }
    return opts;
  }



  render () {
    const options = this.getFigureOptions();
    const select = (event, index, val) => {
      //log.info('Selected: ', event, index, val);
      log.info('props', val, this.props);
      this.props.select(val);
    };

    return (
      <SelectField floatingLabelText='Choose Geomantic Figure' value={this.props.selected.name} onChange={select}>
        {options}
      </SelectField>
    );
  }
}

export default FigureChooser;
