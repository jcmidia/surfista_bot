const axios = require('axios');
const parser = require('fast-xml-parser');
const Utils = require('../utils/states.js');

module.exports = {
  getConditions: function(data) {
    return new Promise(function(resolve) {
      axios
        .get('https://www.barcelona.cat/dades/platges/platges.xml')
        .then(function(response) {
          const obj = parser.getTraversalObj(response.data);
          const jsonObj = parser.convertToJson(obj);
          const infoMET = jsonObj.EstatActualPlatges.infoMET;

          data.msg +=
            `Agua: ${infoMET.temperaturaAigua}º\n` +
            `Aire: ${infoMET.temperaturaAmbient}º\n` +
            `Temperatura mínima: ${infoMET.temperaturaMinima}º\n` +
            `Temperatura máxima: ${infoMET.temperaturaMaxima}º\n` +
            `UVI: ${Utils.uvi(infoMET.radiacioUltraviolada)}\n`;

          jsonObj.EstatActualPlatges.Platges.Platja.forEach(element => {
            if (data.beach === null) {
              data.msg += `\n<b>${element.nomPlatja}</b>\n`;
            }
            
            const beachNameClean = data.beach ? Utils.formatString(data.beach) : null;
            const nomPlatjaClean = Utils.formatString(element.nomPlatja);
            console.log(nomPlatjaClean);

            if (beachNameClean === null || nomPlatjaClean === beachNameClean) {
              const seaQuality = Utils.seaQuality(element.qualitatAigua);
              const hasJeallyfish = Utils.hasJeallyfish(element.Meduses);
              const seaState = Utils.seaQuality(element.estatMar);
              const flagState = Utils.flagState(element.estatBandera);
              const flagSymbol = Utils.flag(element.estatBandera);
              const additionalInfo = Utils.moreInfo(element.infoAdicional);

              data.msg +=
                `Calidad del agua: ${seaQuality}\n` +
                `Medusas: ${hasJeallyfish}\n` +
                `Estado del mar: ${seaState}\n` +
                `${flagState} ${flagSymbol}\n` +
                additionalInfo;
            }
          });

          resolve(data);
        })
        .catch(error => {
          if (error.response) console.log(error.response);
          resolve(data);
        });
    });
  },

  getList: function() {
    return new Promise(function(resolve) {
      let data = { msg: '' };

      axios
        .get('https://www.barcelona.cat/dades/platges/platges.xml')
        .then(function(response) {
          const obj = parser.getTraversalObj(response.data);
          const jsonObj = parser.convertToJson(obj);

          jsonObj.EstatActualPlatges.Platges.Platja.forEach(element => {
            const flagSymbol = Utils.flag(element.estatBandera);
            data.msg += `${element.nomPlatja} ${flagSymbol}\n`;
          });

          resolve(data);
        })
        .catch(error => {
          if (error.response) console.log(error.response);
          resolve(data);
        });
    });
  },
};
