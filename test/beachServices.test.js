const rewire = require('rewire');
const beachServices = require('../services/beachServices.js');
const beachRewire = rewire('../services/beachServices.js');
const validateBeach = beachRewire.__get__('validateBeach');

describe('Beach services', () => {
  test('getConditions function exists', () => {
    expect(beachServices.getConditions).toBeDefined();
  });

  test('getList function exists', () => {
    expect(beachServices.getList).toBeDefined();
  });

  test('validate beach', () => {
    expect(validateBeach('Barceloneta')).toBeTruthy();
    expect(validateBeach('Marbella')).toBeTruthy();
    expect(validateBeach('Montgat')).toBeFalsy();
  });

  test('getConditions returns an object', () => {
    const data = {
      msg: '',
      beach: null,
    };
    return beachServices.getConditions(data).then(response => {
      expect(typeof response).toBe('object');
      expect(response).toHaveProperty('msg');
      expect(response).toHaveProperty('beach', data.beach);
    });
  });

  test('getConditions response contains the expected beach', () => {
    const data = {
      msg: '',
      beach: 'Barceloneta',
    };
    return beachServices.getConditions(data).then(response => {
      expect(response).toMatchObject({
        msg: expect.stringContaining(data.beach),
        beach: data.beach,
      });
    });
  });

  test('resolve getList', () => {
    return beachServices.getList().then(response => {
      expect(typeof response).toBe('object');
    });
  });
});
