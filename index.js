const http = require('http');
const TeleBot = require('telebot');
const beachServices = require('./services/beachServices.js');
const surfServices = require('./services/surfServices.js');

const bot = new TeleBot(process.env.TELEGRAM_TOKEN);

bot.on(/^\/playa (.+)$/, (msg, props) => {
  const data = {
    msg: '', 
    beach: props.match[1]
  };

  beachServices.getConditions(data).then((response) => {
    return bot.sendMessage(msg.from.id, response.msg, { replyToMessage: msg.message_id, parseMode: 'html' });
  }).catch((error) => {
    console.log(error);
  });
});

bot.on(/^\/surf (.+)$/, (msg, props) => {
  const data = {
    msg: '', 
    beach: props.match[1]
  };

  beachServices.getConditions(data)
  .then(surfServices.getConditions)
  .then((response) => {
    return bot.sendMessage(msg.from.id, response.msg, { replyToMessage: msg.message_id, parseMode: 'html' });
  }).catch((error) => {
    console.log(error);
  });
});

bot.on('/playas', (msg) => {
  const data = {
    msg: '', 
    beach: null
  };

  beachServices.getConditions(data).then((response) => {
    return bot.sendMessage(msg.from.id, response.msg, { replyToMessage: msg.message_id, parseMode: 'html' });
  }).catch((error) => {
    console.log(error);
  });
});

bot.on('/listado', (msg) => {
  beachServices.getList().then((response) => {
    return bot.sendMessage(msg.from.id, response.msg, { replyToMessage: msg.message_id, parseMode: 'html' });
  }).catch((error) => {
    console.log(error);
  });
});

bot.start();

const PORT = process.env.PORT || 3000;
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('Hello World!');
  res.end();
}).listen(PORT, () => {
  console.log(`Our app is running on port ${ PORT }`);
});
