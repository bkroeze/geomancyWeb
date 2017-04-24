import expect from 'expect';
import { reducers } from '../../models/chart-house';
import { Chart } from 'geomancy';

describe('chart-house model', () => {
  describe('reducer', () => {
    it('it should set querent', () => {
      const oldChart = new Chart();
      const state = reducers['SELECT_QUERENT']({chart: oldChart}, { payload: 1});
      const houses = state.chart.getHouses();
      expect(state.chart).toNotBe(oldChart);
      let house;
      for (let i = 0; i < 12; i++) {
        house = houses[i];
        expect(house.figure.name === 'Populus').toBe(true);
        if (i === 1) {
          expect(house.querent).toBe(true);
        } else {
          expect(house.querent).toBe(false);
        }
        expect(house.quesited).toBe(false);
      }
    });

    it('it should set quesited', () => {
      const oldChart = new Chart();
      const state = reducers['SELECT_QUESITED']({chart: oldChart}, { payload: 1});
      const houses = state.chart.getHouses();
      expect(state.chart).toNotBe(oldChart);
      let house;
      for (let i = 0; i < 12; i++) {
        house = houses[i];
        expect(house.figure.name === 'Populus').toBe(true);
        if (i === 1) {
          expect(house.quesited).toBe(true);
        } else {
          expect(house.quesited).toBe(false);
        }
        expect(house.querent).toBe(false);
      }
    });
  });
});
