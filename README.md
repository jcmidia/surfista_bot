# El bot surfista (BCN)

## What is the project?
This is an open source project to build a Telegram's bot that tells you the forecast and state of the beaches in Barcelona's coast. 
It uses 2 different sources of data. The first one is a XML available in the [Ajuntament de Barcelona's website](https://www.barcelona.cat/dades/platges/platges.xml), which is where it gets the state of the beaches like the quality of water, state of the sea, the flag, the forecast, etc. The second one is a scrapping on [Surf Forecast](surf-forecast.com) to get data for surf conditions sush as wind directions, waves and periods.

You can check it out the bot working here: https://t.me/surfista_bot

### Commands availables
- /list: return a list with all the beaches in Barcelona;
- /playas: return a list with all the beachs and its state and forecast;
- /playa: return the state and forecast for a specific beach. Here you should specify which beach you want, ej: /playa Barceloneta;
- /surf: return the state, forecast and surf confitions for a specific beach.

## Tech stack
- Webpack
- Node.js
- Jest

## Installing

1. `npm install`
2. `export TELEGRAM_TOKEN=<TOKEN>`
3. `node index`

You will need to create a bot and use its TOKEN to test it locally. Check this [link](https://core.telegram.org/bots#3-how-do-i-create-a-bot) if you need help to get a Telegram Token.

## Running tests
It uses ES Lint with Prettier and Jest for unit tests.

To run tests, simply run `npm test`. You can also use `npm pretest` to run lint.

##Deployment
It uses a CD pipeline consisting of TravisCI + Heroku automatic deploy once tests pass on master branch.