import {
  Figure
} from 'geomancy';
export default {
  namespace: 'figure-explorer',
  state: {
    selected: Figure.byName('populus')
  },
  reducers: {
    select(state, action) {
      try {
        figure = Figure.byName(action.payload);
        return {...state,
          selected: figure
        };
      } catch (e) {
        return state;
      }
    }
  },
  effects: {},
  subscriptions: {}
};
