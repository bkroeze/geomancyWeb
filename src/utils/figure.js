import Logger from 'js-logger';
const log = Logger.get('utils/figure');

export function makeElements (fig) {
  return {fire: fig.fire, air: fig.air, water: fig.water, earth: fig.earth};
};

export function makeSlug (fig) {
  return fig.name.toLowerCase().replace(' ', '-');
};

export function makeSeedhash (chart) {
  const houses = chart.getHouses();
  let seeds = [];
  for (let ix = 0; ix < 4; ix++) {
    seeds.push(makeSlug(houses[ix].figure));
  }
  const seedParam = seeds.join(',');
  let parts = window.location.hash.split('/');
  log.info('parts', parts);
  const lastParts = parts.pop().split('?'); // [currentSeed, queryString]

  const currSeed = lastParts[0];
  let qry = '';
  if (lastParts[1]) {
    qry = '?' + lastParts[1];
  }

  if (currSeed != seedParam) {
    parts.push(seedParam + qry);
    log.info('Setting history', currSeed, seedParam, parts.join('/'));
    window.history.pushState({}, 'Chart', parts.join('/'));
  }
};
