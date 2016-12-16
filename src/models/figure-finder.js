import {Figure} from 'geomancy';
import Logger from 'js-logger';
const log = Logger.get('figure-finder');

const populus = Figure.byName('populus');

function makeElements (fig) {
  return {fire: fig.fire, air: fig.air, water: fig.water, earth: fig.earth};
}

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
