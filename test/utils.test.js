const Util = require('../utils/index.js');

describe('Util lib', () => {
  test('UVI function exists', () => {
    expect(Util.uvi).toBeDefined();
  });

  test('seaQuality function exists', () => {
    expect(Util.seaQuality).toBeDefined();
  });

  test('hasJeallyfish function exists', () => {
    expect(Util.hasJeallyfish).toBeDefined();
  });

  test('flagState function exists', () => {
    expect(Util.flagState).toBeDefined();
  });

  test('moreInfo function exists', () => {
    expect(Util.moreInfo).toBeDefined();
  });

  test('flag function exists', () => {
    expect(Util.flag).toBeDefined();
  });

  test('cleanString function exists', () => {
    expect(Util.cleanString).toBeDefined();
  });

  test('removeBreakLine function exists', () => {
    expect(Util.removeBreakLine).toBeDefined();
  });

  test('UVI returns', () => {
    expect(Util.uvi(1)).not.toBe('Sin información');
    expect(Util.uvi(9)).toBe('Sin información');
  });

  test('removing special characters', () => {
    expect(Util.cleanString(null)).toBe('');
    expect(Util.cleanString('Sant Sebastià')).toBe('santsebastia');
  });

  test('removing break lines', () => {
    const expected = 'lorem lorem lorem';
    const text1 = `lorem lorem 
    lorem`;

    expect(Util.removeBreakLine('lorem lorem \nlorem')).toBe(expected);
    expect(Util.removeBreakLine('lorem lorem \rlorem')).toBe(expected);
    expect(Util.removeBreakLine(text1)).toBe(expected);
    expect(Util.removeBreakLine(undefined)).toBe('');
  });
});
