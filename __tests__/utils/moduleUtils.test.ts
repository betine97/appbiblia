import { calculateProgressSegments, getSegmentRotation } from '../../utils/moduleUtils';

describe('moduleUtils', () => {
  describe('calculateProgressSegments', () => {
    it('should return all false segments for 0% progress', () => {
      const result = calculateProgressSegments(0);
      expect(result).toEqual({
        segment1: false,
        segment2: false,
        segment3: false,
        segment4: false,
      });
    });

    it('should return first segment true for 25% progress', () => {
      const result = calculateProgressSegments(25);
      expect(result).toEqual({
        segment1: true,
        segment2: false,
        segment3: false,
        segment4: false,
      });
    });

    it('should return first two segments true for 50% progress', () => {
      const result = calculateProgressSegments(50);
      expect(result).toEqual({
        segment1: true,
        segment2: true,
        segment3: false,
        segment4: false,
      });
    });

    it('should return first three segments true for 75% progress', () => {
      const result = calculateProgressSegments(75);
      expect(result).toEqual({
        segment1: true,
        segment2: true,
        segment3: true,
        segment4: false,
      });
    });

    it('should return all segments true for 100% progress', () => {
      const result = calculateProgressSegments(100);
      expect(result).toEqual({
        segment1: true,
        segment2: true,
        segment3: true,
        segment4: true,
      });
    });
  });

  describe('getSegmentRotation', () => {
    it('should return correct rotation for each segment', () => {
      expect(getSegmentRotation(0)).toBe(0);   // Superior direita
      expect(getSegmentRotation(1)).toBe(90);  // Inferior direita
      expect(getSegmentRotation(2)).toBe(180); // Inferior esquerda
      expect(getSegmentRotation(3)).toBe(270); // Superior esquerda
    });

    it('should return 0 for invalid segment index', () => {
      expect(getSegmentRotation(4)).toBe(0);
      expect(getSegmentRotation(-1)).toBe(0);
    });
  });
});