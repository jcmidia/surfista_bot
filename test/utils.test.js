const Utils = require('../utils/index.js');
const realDate = Date;

describe('Util functions', () => {
  const switchMethods = ['uvi', 'seaQuality', 'hasJeallyfish'];

  afterAll(() => {
    global.Date = realDate;
  });

  for (let index in switchMethods) {
    const method = switchMethods[index];
    it(method + ' should return as expected', () => {
      expect(Utils[method](1)).not.toBe('Sin información');
      expect(Utils[method]('1')).not.toBe('Sin información');
      expect(Utils[method](999)).toBe('Sin información');
      expect(Utils[method](null)).toBe('Sin información');
      expect(Utils[method](undefined)).toBe('Sin información');
    });
  }

  const switchMethods2 = ['flagState', 'flag', 'forecastEmoji'];
  for (let index in switchMethods2) {
    const method = switchMethods2[index];
    it(method + ' should return as expected', () => {
      expect(Utils[method](1)).not.toBe('');
      expect(Utils[method]('1')).not.toBe('');
      expect(Utils[method](999)).toBe('');
      expect(Utils[method](null)).toBe('');
      expect(Utils[method](undefined)).toBe('');
    });
  }

  test('cleanString removes special characters', () => {
    expect(Utils.cleanString(null)).toBe('');
    expect(Utils.cleanString('Sant Sebastià')).toBe('santsebastia');
  });

  test('removeBreakLine removes break lines', () => {
    const expected = 'lorem lorem lorem';
    const text1 = `lorem lorem 
    lorem`;

    expect(Utils.removeBreakLine('lorem lorem \nlorem')).toBe(expected);
    expect(Utils.removeBreakLine('lorem lorem \rlorem')).toBe(expected);
    expect(Utils.removeBreakLine(text1)).toBe(expected);
    expect(Utils.removeBreakLine(undefined)).toBe('');
  });
});

describe('getForecastEmoji', () => {
  const infoMET = {
    previsioTempsMatiAvui: 1,
    previsioTempsTardaAvui: 2,
  };

  const dateSpy = jest.fn(() => new Date());
  Utils.getSpainDatetime = dateSpy;

  it('calls getSpainDateTime function', () => {
    Utils.getForecastEmoji(infoMET);
    expect(dateSpy).toHaveBeenCalled();
  });

  it('returns the correctly emoji on afternoon', () => {
    dateSpy.mockImplementation(() => new Date(2018, 0, 1, 13));
    expect(Utils.getForecastEmoji(infoMET)).toBe('🌤');
  });

  it('returns the correctly emoji on morning', () => {
    dateSpy.mockImplementation(() => new Date(2018, 0, 1, 5));
    expect(Utils.getForecastEmoji(infoMET)).toBe('☀️');
  });
});

describe('getSpainDate', () => {
  it('should return a valid datetime', () => {
    const spaindatetime = Utils.getSpainDatetime();
    expect(spaindatetime.getHours).toBeDefined();
  });

  it('should convert a different timezone to Spain', () => {
    const DATE_TO_USE = new Date('2019-08-01T10:00:00-04:00'); // New York timezone
    global.Date = jest.fn(() => DATE_TO_USE);

    const spaindatetime = Utils.getSpainDatetime();
    expect(spaindatetime.getHours()).toBe(16);
  });
});
