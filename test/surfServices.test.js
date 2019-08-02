const surfServices = require('../services/surfServices.js');

describe('Surf services', () => {
  test('getConditions function exists', () => {
    expect(surfServices.getConditions).toBeDefined();
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
});
