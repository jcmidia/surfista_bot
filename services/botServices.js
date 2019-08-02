const TeleBot = require('telebot');
const beachServices = require('../services/beachServices.js');
const surfServices = require('../services/surfServices.js');

module.exports = class Bot {
  constructor() {
    this.bot = null;
  }

  // Reply the message
  sendMessage(response, msg) {
    this.bot.sendMessage(msg.from.id, response.msg, {
      replyToMessage: msg.message_id,
      parseMode: 'html',
    });
  }

  // Handle promises error
  handleError(error) {
    console.log(error);
  }

  // Get beaches conditions
  getBeachConditions(msg, props) {
    const data = {
      msg: '',
      beach: props.match ? props.match[1] : null,
    };

    beachServices
      .getConditions(data)
      .then(response => this.sendMessage(response, msg))
      .catch(this.handleError);
  }

  // Get a specific beach conditions with surf details
  getSurfConditions(msg, props) {
    const data = {
      msg: '',
      beach: props.match ? props.match[1] : null,
    };

    beachServices
      .getConditions(data)
      .then(surfServices.getConditions)
      .then(response => this.sendMessage(response, msg))
      .catch(this.handleError);
  }

  //  Get all beaches name
  getBeachesList(msg) {
    beachServices
      .getList()
      .then(response => this.sendMessage(response, msg))
      .catch(this.handleError);
  }

  // Init all the bot listenings
  initListening() {
    this.bot.on(/^\/playa (.+)$/, this.getBeachConditions.bind(this));
    this.bot.on(/^\/surf (.+)$/, this.getSurfConditions.bind(this));
    this.bot.on('/playas', this.getBeachConditions.bind(this));
    this.bot.on('/listado', this.getBeachesList.bind(this));
    this.bot.start();
  }

  // Init bot
  init(token) {
    this.bot = new TeleBot(token);
    this.initListening();
  }
};
