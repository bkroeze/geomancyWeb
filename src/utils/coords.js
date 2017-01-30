/**
 * Find the nearest box clicked in an SVG coordinate system.
 *
 * Params: (where 'field' == [x,y] coords)
 *  field coords: [field0, ...]
 *  size of box: [x, y]
 *  click coords: [x, y]
 *
 * Returns index of field clicked.
 */
export function findClickedBox(fields, size, coords) {
  for (let ix=0; ix<fields.length; ix++) {
    if (inBox(fields[ix], size, coords)) {
      // console.log('Hit', fields[ix], size, coords);
      return ix;
    }
    // console.log('miss', fields[ix], size, coords);
  }
  return -1;
}

export function inBox(box, size, hit) {
  const [x, y] = hit,
    [minX, minY] = box,
    maxX = minX + size[0],
    maxY = minY + size[1];

  //console.log([x, y], [minX, minY], [maxX, maxY]);

  return (minX <= x && x < maxX && minY <= y && y <= maxY);
}
