const TeleBot = require('telebot');
const axios = require('axios');
const parser = require('fast-xml-parser');
console.log(process.env.TELEGRAM_TOKEN);
const bot = new TeleBot(process.env.TELEGRAM_TOKEN);

bot.on(/^\/playa (.+)$/, (msg, props) => {
  const beach = props.match[1];

  getBeachState(beach).then((response) => {
    return bot.sendMessage(msg.from.id, response, { replyToMessage: msg.message_id });
  });
});

bot.on('/playas', (msg) => {
  getBeachState(null).then((response) => {
    return bot.sendMessage(msg.from.id, response, { replyToMessage: msg.message_id, parseMode: 'html' });
  });
});

bot.start();

function getBeachState(beach) {
  return new Promise(function (resolve, reject) {
    axios.get('https://www.barcelona.cat/dades/platges/platges.xml')
      .then(function (response) {
          const obj = parser.getTraversalObj(response.data);
          const jsonObj = parser.convertToJson(obj);

          let msg = `Agua: ${jsonObj.EstatActualPlatges.infoMET.temperaturaAigua}º\n`
                    + `Aire: ${jsonObj.EstatActualPlatges.infoMET.temperaturaAmbient}º\n`
                    + `Temperatura mínima: ${jsonObj.EstatActualPlatges.infoMET.temperaturaMinima}º\n`
                    + `Temperatura máxima: ${jsonObj.EstatActualPlatges.infoMET.temperaturaMaxima}º\n`
                    + `UVI: ${uvi(jsonObj.EstatActualPlatges.infoMET.radiacioUltraviolada)}\n`;
          
          jsonObj.EstatActualPlatges.Platges.Platja.forEach(element => {
            if (beach === null) {
              msg += `\n<b>${element.nomPlatja}</b>\n`
            }

            if (element.nomPlatja === beach || beach === null) {
              msg += `Calidad del agua: ${seaQuality(element.qualitatAigua)} ${flag(element.estatBandera)}\n`
                  + `Medusas: ${hasJeallyfish(element.Meduses)}\n`
                  + `Estado del mar: ${seaQuality(element.estatMar)}\n`
                  + `${flagState(element.estatBandera)}\n`;
            }
          });

          resolve(msg);
      });
    });
}

function uvi(state) {
  switch (state) {
    case 0:
      return 'Bajo'
    break;
    case 1:
      return 'Regular'
    break;
    case 2:
      return 'Alto'
    break;
  }
}

function seaQuality(state) {
  switch (state) {
    case 1:
      return 'Bueno'
    break;
    case 2:
      return 'Regular'
    break;
    case 3:
      return 'Malo'
    break;
  }
}

function hasJeallyfish(state) {
  switch (state) {
    case 1:
      return 'No'
    break;
    case 2:
      return 'Sí'
    break;
  }
}

function flagState(state) {
  switch (state) {
    case 1:
      return 'Bandera verde: Permitido bañarse'
    break;
    case 2:
      return 'Bandera amarilla: Bañarse con precaución'
    break;
    case 3:
      return 'Bandera roja: Prohibido bañarse'
    break;
  }
}

function flag(state) {
  switch (state) {
    case 1:
      return '✅'
    break;
    case 2:
      return '⚠️'
    break;
    case 3:
      return '🛑'
    break;
  }
}
