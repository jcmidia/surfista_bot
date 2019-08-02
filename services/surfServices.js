const axios = require('axios');
const cheerio = require('cheerio');
const Utils = require('../utils/index.js');

const beaches = [
  { name: 'santsebastia', url: 'Playade-Sant-Sebastia' },
  { name: 'barceloneta', url: 'Barceloneta' },
  { name: 'bogatell', url: 'Bogatell' },
  { name: 'novamarbella', url: 'Nova-Mar-Bella-Barcelona' },
];

module.exports.getConditions = function(data) {
  return new Promise(function(resolve) {
    const beachValidated = validateBeach(data.beach);

    if (!beachValidated) {
      data.msg += `\nNo fue posible encontrar datos de surf para la playa ${data.beach}`;
      resolve(data);
    } else {
      axios
        .get('http://es.surf-forecast.com/breaks/' + beachValidated.url)
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
          if (error.response) console.log(error.response.statusText);
          data.msg += `\nNo fue posible encontrar datos de surf para la playa ${data.beach}`;
          resolve(data);
        });
    }
  });
};

function validateBeach(beach) {
  return beaches.find(el => Utils.cleanString(beach) === el.name);
}
