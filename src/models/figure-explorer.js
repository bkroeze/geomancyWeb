import {Figure} from 'geomancy';
import Logger from 'js-logger';
const log = Logger.get('figure-explorer');

export default {
  namespace: 'figure-explorer',
  state: {
    selected: Figure.byName('populus')
  },
  reducers: {
    SELECT_FIGURE: function(state, action) {
      try {
        const figure = Figure.byName(action.payload);
        return {...state,
          selected: figure
        };
      } catch (e) {
        log.error(e);
        return state;
      }
    }
  },
  effects: {},
  subscriptions: {}
};
