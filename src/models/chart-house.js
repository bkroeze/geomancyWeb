import { Chart, ChartSequence, Figure } from 'geomancy';
import Logger from 'js-logger';
const log = Logger.get('models/chart-house');

const seq = new ChartSequence();

export default {
  namespace: 'chart-house',
  state: {
    chart: new Chart(seq),
    house: -1
  },
  reducers: {
    SELECT_FIGURE: function (state, action) {
      seq.set(state.house, action.payload);
      const chart = new Chart(seq);
      return { ...state, chart };
    },
    SELECT_HOUSE: function (state, action) {
      let house = action.payload;
      // toggle
      if (state.house === house) {
        house = -1;
      }
      return { ...state, house };
    },
    SELECT_SEEDS: function (state, action) {
      const seeds = action.payload;
      let figure;
      for (let ix = 0; ix < seeds.length; ix++) {
        figure = Figure.byName(seeds[ix]);
        if (figure) {
          seq.set(ix, figure);
        }
      }
      const chart = new Chart(seq);
      return { ...state, chart };
    }
  },
  effects: {},
  subscriptions: {}
};
