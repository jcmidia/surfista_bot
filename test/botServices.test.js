const Bot = require('../services/botServices.js');
const bot = new Bot();

describe('Bot', () => {
  it('inits correctly', () => {
    expect(bot.init).toBeDefined();
  });

  test('if private methods and variables are acesible', () => {
    expect(bot.token).not.toBeDefined();
    expect(bot.getBeachesList).not.toBeDefined();
  });
});
