import { Chart, ChartSequence } from 'geomancy';
import Logger from "js-logger";
const log = Logger.get("models/chart-shield");

const seq = new ChartSequence();

export default {
  namespace: 'chart-shield',
  state: {
    chart: new Chart(seq),
    field: 0
  },
  reducers: {
    SELECT_FIGURE: function(state, action) {
      seq.set(state.field, action.payload);
      const chart = new Chart(seq);
      return { ...state, chart };
    },
    SELECT_FIELD: function(state, action) {
      return { ... state, field: action.payload };
    }
  },
  effects: {},
  subscriptions: {},
}
