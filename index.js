const request = require('request');
const Telegraf = require('telegraf');
const NGROK_URL = 'http://127.0.0.1:4040/api/tunnels';
const TOKEN = ''
const app = new Telegraf(TOKEN);
app.command('start', ({ from, reply }) => {
  console.log('start', from)
  return reply('Welcome!')
})
app.hears('ngrok URL', (ctx) => {
  // ctx.reply('Hey there!')
  request(NGROK_URL, function (error, response, json) {
    json = JSON.parse(json);
    ctx.reply(json["tunnels"]["0"]["public_url"]);
  });
})
app.startPolling()
