const http = require('http');
const Bot = require('./services/botServices.js');

const bot = new Bot();
bot.init(process.env.TELEGRAM_TOKEN);

const PORT = process.env.PORT || 3000;
http
  .createServer(function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello World!');
    res.end();
  })
  .listen(PORT, () => {
    console.log(`Our app is running on port ${PORT}`);
  });
