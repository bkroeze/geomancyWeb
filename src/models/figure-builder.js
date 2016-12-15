import {Figure} from 'geomancy';
import Logger from 'js-logger';
const log = Logger.get('figure-builder');

const populus = Figure.byName('populus');

export default {
  namespace: 'figure-builder',
  state: {
    selected: populus,
  },
  reducers: {
    SELECT_FLAG: function(state, action) {
      const elements = { ... state.elements, ...action.payload}
      return { ...state, selected: Figure.byElements(elements), elements }
    }
  },
  effects: {},
  subscriptions: {},
}
