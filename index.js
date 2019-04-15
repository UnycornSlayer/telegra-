'use strict';

const TelegramBot = require('node-telegram-bot-api');
var token ='802094022:AAFk2nbs9wiISioCRlETmQl8I6YNt-HlycU';
var bot = new TelegramBot(token, {polling:true});
var request = require('request');
bot.onText(/\/movie (.+)/, function(msg,match) {
    var movie = match[1];
    var chatId = msg.chat.id;
    request(`http://www.omdbapi.com/?apikey=26d05975&t=${movie}`,function(error, response, body){ 
        if(!error && response.statusCode == 200){
            bot.sendMessage(chatId, `_Tou a procurar o filme ${movie} Sarinha 🖤_`, {parse_mode:'Markdown'})
            .then(function(mgs){
                var res = JSON.parse(body);
                bot.sendPhoto(chatId, res.Poster,{caption: 'TITLE: ' + res.Title + '\nYEAR: ' + res.Year + '\nRATED: ' + res.Rated + '\nRELEASED: ' + res.Released + '\nRUNTIME: ' + res.Runtime + '\nGENRE: ' + res.Genre + '\nDIRECTOR: ' + res.Director + '\nACTORS: ' + res.Actors + '\nWEBSITE: ' + res.Website + '\n\nPLOT: ' + res.Plot }, {parse_mode:'Markdown'})
            })
        }
    })
})