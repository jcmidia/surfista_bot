const rewire = require('rewire');
const surfServices = require('../services/surfServices.js');
const surfRewire = rewire('../services/surfServices.js');
const validateBeach = surfRewire.__get__('validateBeach');

const beaches = [
  { name: 'santsebastia', url: 'Playade-Sant-Sebastia' },
  { name: 'barceloneta', url: 'Barceloneta' },
  { name: 'bogatell', url: 'Bogatell' },
  { name: 'novamarbella', url: 'Nova-Mar-Bella-Barcelona' },
];

describe('Surf services', () => {
  test('getConditions function exists', () => {
    expect(surfServices.getConditions).toBeDefined();
  });

  test('validate beach', () => {
    expect(validateBeach('Sant Sebastià')).toMatchObject(beaches[0]);
    expect(validateBeach('Barceloneta')).toMatchObject(beaches[1]);
    expect(validateBeach('Nova Mar Bella')).toMatchObject(beaches[3]);
    expect(validateBeach('Marbella')).toBeFalsy();
  });

  test('getConditions returns an object', () => {
    const data = {
      msg: '',
      beach: 'Barceloneta',
    };
    return surfServices.getConditions(data).then(response => {
      expect(typeof response).toBe('object');
      expect(response).toHaveProperty('msg');
      expect(response).toHaveProperty('beach', data.beach);
    });
  });

  test('getConditions return 404 error', () => {
    const data = {
      msg: '',
      beach: 'Marbella',
    };
    return surfServices.getConditions(data).then(response => {
      expect(response.msg).toBe(
        `\nNo fue posible encontrar datos de surf para la playa ${data.beach}`,
      );
    });
  });
});
