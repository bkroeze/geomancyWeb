import Logger from 'js-logger';
const log = Logger.get('utils/figure');

export function makeElements (fig) {
  return {fire: fig.fire, air: fig.air, water: fig.water, earth: fig.earth};
}

export function makeSlug (fig) {
  return fig.name.toLowerCase().replace(' ', '-');
}

export function getSeeds (chart) {
  const seeds = [];
  const houses = chart.getHouses();
  for (let ix = 0; ix < 4; ix++) {
    seeds.push(houses[ix].figure.name);
  }
  return seeds;
}

export function makeSeedhash (routeUrl, chart, currentSeed) {
  const houses = chart.getHouses();
  const currUrl = window.location.hash;

  let seeds = [];
  for (let ix = 0; ix < 4; ix++) {
    seeds.push(makeSlug(houses[ix].figure));
  }
  const seedParam = seeds.join(',');
  if (seedParam === currentSeed) {
    log.debug('no change to seeds, returing ' + currUrl);
    return currUrl;
  }

  let work = '#' + routeUrl.replace('(/:seeds)', '/' + seedParam);

  const parts = currUrl.split('?');
  if (parts.length > 1) {
    work += '?' + parts[1];
  }
  log.info('seedhash: ', work);
  return work;
}
