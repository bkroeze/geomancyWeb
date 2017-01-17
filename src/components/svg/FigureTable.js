import React from 'react';
import styles from './FigureTable.css';
import { Figures } from 'geomancy';
import Figure from './Figure';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

class FigureTable extends React.Component {
  constructor (props) {
    super(props);
  }

  getRows () {
    const figs = [];
    const rows = [];
    for (let [key, fig] of Object.entries(Figures)) {
      figs.push(fig);
    }

    const col = (ix) => {
      return (
        <TableRowColumn key={'fig' + figs[ix].flags}>
          <div className={styles.figureCell}>
            <svg viewBox='0 0 80 100' width='100' height='100'>
              <Figure figure={figs[ix]} />
            </svg>
            <div className={styles.figureName}>{figs[ix].name}</div>
          </div>
        </TableRowColumn>
      );
    };

    for (let ix = 0; ix < figs.length; ix = ix + 4) {
      rows.push(
        <TableRow key={'figs' + ix + '-' + (ix + 3)} selectable={false}>
          {col(ix)}
          {col(ix + 1)}
          {col(ix + 2)}
          {col(ix + 3)}
        </TableRow>
      );
    }

    return rows;
  }

  render () {
    const rows = this.getRows();
    return (
      <Table className={styles.normal} selectable={false}>
        <TableBody displayRowCheckbox={false}>
          {rows}
        </TableBody>
      </Table>
    );
  }
}

function mapStateToProps (state) {
  return {};
}

export default FigureTable;
