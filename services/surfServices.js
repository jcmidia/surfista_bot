const axios = require('axios');
const cheerio = require('cheerio');
const Utils = require('../utils/index.js');

module.exports.getConditions = function(data) {
  return new Promise(function(resolve) {
    axios
      .get('http://es.surf-forecast.com/breaks/' + data.beach)
      .then(function(response) {
        const html = response.data;
        const $ = cheerio.load(html);

        $('.forecast_upcoming table.forecasts').filter(function() {
          const wave = $(this)
            .find('tr:nth-child(3)')
            .children('td:nth-child(2)')
            .find('img')
            .attr('alt');

          const period = $(this)
            .find('tr:nth-child(4)')
            .children('td:nth-child(2)')
            .text()
            .trim();

          const wind = $(this)
            .find('tr:nth-child(5)')
            .children('td:nth-child(2)')
            .find('img')
            .attr('alt');

          const windFormatted = Utils.removeBreakLine(wind);

          data.msg +=
            `Olas (m): ${wave}\n` +
            `Periodo (s): ${period}\n` +
            `Viento (km/h): ${windFormatted}\n`;
        });

        resolve(data);
      })
      .catch(error => {
        if (error.response) console.log(error.response);
        resolve(data);
      });
  });
};
