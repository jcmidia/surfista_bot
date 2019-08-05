const TeleBot = require('telebot');
const beachServices = require('../services/beachServices.js');
const surfServices = require('../services/surfServices.js');

module.exports = function Bot() {
  const token = process.env.TELEGRAM_TOKEN;
  let bot = null;

  // Get beaches conditions
  function getBeachConditions(msg, props) {
    const data = {
      msg: '',
      beach: props.match ? props.match[1] : null,
    };

    beachServices
      .getConditions(data)
      .then(response => sendMessage(response, msg))
      .catch(handleError);
  }

  // Get a specific beach conditions with surf details
  function getSurfConditions(msg, props) {
    const data = {
      msg: '',
      beach: props.match ? props.match[1] : null,
    };

    beachServices
      .getConditions(data)
      .then(surfServices.getConditions)
      .then(response => sendMessage(response, msg))
      .catch(handleError);
  }

  //  Get all beaches name
  function getBeachesList(msg) {
    beachServices
      .getList()
      .then(response => sendMessage(response, msg))
      .catch(handleError);
  }

  // Reply the message
  function sendMessage(response, msg) {
    bot.sendMessage(msg.from.id, response.msg, {
      replyToMessage: msg.message_id,
      parseMode: 'html',
    });
  }

  // Handle promises error
  function handleError(error) {
    console.log(error);
  }

  // Init bot
  function init() {
    bot = new TeleBot(token);
    bot.on(/^\/playa (.+)$/, getBeachConditions.bind(this));
    bot.on(/^\/surf (.+)$/, getSurfConditions.bind(this));
    bot.on('/playas', getBeachConditions.bind(this));
    bot.on('/listado', getBeachesList.bind(this));
    bot.start();
  }

  return {
    init: init,
  };
};
