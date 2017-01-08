import {Figure} from 'geomancy';
import Logger from 'js-logger';
import { makeElements } from '../utils/figure';
const log = Logger.get('figure-finder');

const populus = Figure.byName('populus');

export default {
  namespace: 'figure-finder',
  state: {
    selected: populus,
    elements: makeElements(populus)
  },
  reducers: {
    SELECT: function(state, action) {
      const fig = action.payload;
      return { ...state, selected: fig, elements: makeElements(fig) }
    }
  },
  effects: {},
  subscriptions: {},
}
