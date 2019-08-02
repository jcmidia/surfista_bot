const TeleBot = require('telebot');
const beachServices = require('../services/beachServices.js');
const surfServices = require('../services/surfServices.js');

module.exports = class Bot {
  constructor() {
    this.bot = null;
  }

  sendMessage(response, msg) {
    this.bot.sendMessage(msg.from.id, response.msg, {
      replyToMessage: msg.message_id,
      parseMode: 'html',
    });
  }

  getBeachConditions(msg, props) {
    const data = {
      msg: '',
      beach: props.match ? props.match[1] : null,
    };

    beachServices
      .getConditions(data)
      .then(response => {
        return this.sendMessage(response, msg);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getSurfConditions(msg, props) {
    const data = {
      msg: '',
      beach: props.match ? props.match[1] : null,
    };

    beachServices
      .getConditions(data)
      .then(surfServices.getConditions)
      .then(response => {
        return this.sendMessage(response, msg);
      })
      .catch(error => {
        console.log(error);
      });
  }

  getBeachesList(msg) {
    beachServices
      .getList()
      .then(response => {
        return this.sendMessage(response, msg);
      })
      .catch(error => {
        console.log(error);
      });
  }

  initListening() {
    this.bot.on(/^\/playa (.+)$/, this.getBeachConditions.bind(this));
    this.bot.on(/^\/surf (.+)$/, this.getSurfConditions.bind(this));
    this.bot.on('/playas', this.getBeachConditions.bind(this));
    this.bot.on('/listado', this.getBeachesList.bind(this));
    this.bot.start();
  }

  init(token) {
    this.bot = new TeleBot(token);
    this.initListening();
  }
};
