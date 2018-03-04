#!/usr/bin/env node
const request = require('request');
const Telegraf = require('telegraf');
const NGROK_URL = 'http://127.0.0.1:4040/api/tunnels';
const TOKEN = require('./config.json').token; 
const app = new Telegraf(TOKEN);
app.command('start', ({ from, reply }) => {
  console.log('start', from)
  return reply('Welcome!')
})
app.hears('ngrok URL', (ctx) => {
  request(NGROK_URL, function (error, response, json) {
    json = JSON.parse(json);
    let tunnels = [];
    if(Array.isArray(json.tunnels)){
      tunnels = json.tunnels.map(e => e.name + " : " + e.public_url);
    }
      ctx.reply(tunnels);
  });
})
app.startPolling()
