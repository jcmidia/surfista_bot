const axios = require('axios');
const parser = require('fast-xml-parser');
const Utils = require('../utils/states.js');

module.exports = {
  getConditions: function (data) {
    return new Promise(function (resolve, reject) {
      axios.get('https://www.barcelona.cat/dades/platges/platges.xml')
        .then(function (response) {
          const obj = parser.getTraversalObj(response.data);
          const jsonObj = parser.convertToJson(obj);

          data.msg += `Agua: ${jsonObj.EstatActualPlatges.infoMET.temperaturaAigua}º\n`
                    + `Aire: ${jsonObj.EstatActualPlatges.infoMET.temperaturaAmbient}º\n`
                    + `Temperatura mínima: ${jsonObj.EstatActualPlatges.infoMET.temperaturaMinima}º\n`
                    + `Temperatura máxima: ${jsonObj.EstatActualPlatges.infoMET.temperaturaMaxima}º\n`
                    + `UVI: ${Utils.uvi(jsonObj.EstatActualPlatges.infoMET.radiacioUltraviolada)}\n`;
          
          jsonObj.EstatActualPlatges.Platges.Platja.forEach(element => {
            if (data.beach === null) {
              data.msg += `\n<b>${element.nomPlatja}</b>\n`
            }

            if (data.beach === null || Utils.formatString(element.nomPlatja) === Utils.formatString(data.beach)) {
              data.msg += `Calidad del agua: ${Utils.seaQuality(element.qualitatAigua)}\n`
                  + `Medusas: ${Utils.hasJeallyfish(element.Meduses)}\n`
                  + `Estado del mar: ${Utils.seaQuality(element.estatMar)}\n`
                  + `${Utils.flagState(element.estatBandera)} ${Utils.flag(element.estatBandera)}\n`
                  + Utils.moreInfo(element.infoAdicional);
            }
          });

          resolve(data);
        }).catch((error) => {
          if (error.response) console.log(error.response);
          resolve(data);
        });
      });
  },

  getList: function () {
    return new Promise(function (resolve, reject) {
      let data = {msg: ''};

      axios.get('https://www.barcelona.cat/dades/platges/platges.xml')
        .then(function (response) {
          const obj = parser.getTraversalObj(response.data);
          const jsonObj = parser.convertToJson(obj);
          
          jsonObj.EstatActualPlatges.Platges.Platja.forEach(element => {
            data.msg += `${element.nomPlatja} ${Utils.flag(element.estatBandera)}\n`
          });

          resolve(data);
        }).catch((error) => {
          if (error.response) console.log(error.response);
          resolve(data);
        });
      });
  }
}
