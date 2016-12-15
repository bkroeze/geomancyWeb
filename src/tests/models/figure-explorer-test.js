import expect from 'expect';
import { reducers } from '../../models/figure-explorer';
import { Figure, Figures } from 'geomancy';

describe('example', () => {

  describe('reducer', () => {
    it('it should select and retrieve a Figure', () => {
      const state = reducers['SELECT_FIGURE']({}, { payload: 'via'});
      expect(state.selected).toBeA(Figure, 'Not a Figure: ' + JSON.stringify(state.selected));
      expect(state.selected.toJSON()).toEqual(Figures.via.toJSON());
    });
  })
});
