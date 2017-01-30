import { findClickedBox, inBox } from '../../utils/coords';
import expect from 'expect';

describe('utils/coords', () => {
  describe('findClickedBox', () => {
    it('should only register a hit in the box', () => {
      expect(inBox([0,0], [10, 10], [5, 5])).toExist('5,5 should be inside a 0,0 x 10,10 box');
      expect(inBox[0,0], [10,10], [10,10]).toNotExist('10,10 is on the edge, but out');
    });

    it('should find the correct field', () => {
      const fields = [[0,0], [10,10], [20,20], [30,30]];
      const size = [10,10];

      expect(findClickedBox(fields, size, [-1,-1])).toEqual(-1);
      expect(findClickedBox(fields, size, [1,1])).toEqual(0, '[1,1]');
      expect(findClickedBox(fields, size, [9,9])).toEqual(0, '[9,9]');
      expect(findClickedBox(fields, size, [11,11])).toEqual(1, '[11,11]');
      expect(findClickedBox(fields, size, [21,25])).toEqual(2);
      expect(findClickedBox(fields, size, [30,35])).toEqual(3);

    });
  });
});
