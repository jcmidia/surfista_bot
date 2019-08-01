const axios = require('axios');
const cheerio = require('cheerio');

module.exports.getConditions = function (data) {
  return new Promise(function (resolve, reject) {
    // const d = new Date();
    // const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    // const date = new Date(utc + (3600000*2));

    axios.get('http://es.surf-forecast.com/breaks/' + data.beach)
      .then(function (response) {

        const html = response.data;
        const $ = cheerio.load(html);

        $('.forecast_upcoming table.forecasts').filter(function(){
            const wave = $(this).find('tr:nth-child(3)').children('td:nth-child(2)').find('img').attr('alt');
            const period = $(this).find('tr:nth-child(4)').children('td:nth-child(2)').text().trim();
            const wind = $(this).find('tr:nth-child(5)').children('td:nth-child(2)').find('img').attr('alt');
            
            data.msg += `Olas (m): ${wave}\n`
                        + `Periodo (s): ${period}\n`
                        + `Viento (km/h): ${wind ? wind.replace(/(\r\n|\n|\r)/gm, "") : null}\n`;
        });

        resolve(data);
      }).catch((error) => {
        console.log(error.response.statusText);
        resolve(data);
      });
    });
}