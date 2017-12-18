const Discord = require('discord.js');
const client = new Discord.Client();
const oceanMan = client.createVoiceBroadcast();
const ytdl = require('ytdl-core');
var jsonfile = require('jsonfile');
var playingOceanMan = false;
var iCastReflect = false;
//var revolt = false;

var botdata = jsonfile.readFileSync('botData.json');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {

    if(message.content === `I cast reflect.` && message.author.id == 150436488532721664){
        console.log("Reflect is on");
        iCastReflect = true;
    }
    
    if (message.content === '!moose') {
        message.reply('get kicked! <:moose:339702900731281408> - https://www.twitch.tv/videos/131649435');
    }

    if (message.content === '!boop') {
        message.channel.sendMessage(`B O O P!`);
    }
    if (message.content.startsWith('!teemo')) {
        var kills = parseInt(message.content.replace('!teemo ', ''), 10);
        if (isNaN(kills)) {
            message.reply(`<:teemo:338209808241000448> has been killed ` + botdata[message.channel.guild.name].teemoKills + ` times by users in this Discord.`)
        } else {
            botdata[message.channel.guild.name].teemoKills += kills;
            message.reply(`<:teemo:338209808241000448> has been killed ` + botdata[message.channel.guild.name].teemoKills + ` times by users in this Discord.`)
            jsonfile.writeFile('botData.json', botdata);
        }
    }
    if (message.content === '!quote') {
        var quotes = botdata[message.channel.guild.name].quotes;
        message.channel.sendMessage(quotes[getRandomInt(0, quotes.length)]);
    }
    if (message.content.startsWith('!addquote')) {
        var quote = message.content.substring(9).trim();
        botdata[message.channel.guild.name].quotes.push(quote);
        jsonfile.writeFile('botData.json', botdata);
        message.reply('quote added.');
    }

    //automatically add messages sent to the discordquotes channel to the quote list.
    if (message.channel.name === 'discordquotes') {
        botdata[message.channel.guild.name].quotes.push(message.toString() + '');
        console.log("added quote: " + message.toString());
        jsonfile.writeFile('botData.json', botdata);
    }

    if (message.content.startsWith('!8')) {
        if (message.content.trim() === '!8') {
            message.reply(`I'm a bot, not a mind reader. Ask a question`);
        } else {
            var answers = ["It is certain", "It is decidedly so", "Without a doubt",
                "Yes definitely", "You may rely on it", "As I see it, yes", "Most likely",
                "Outlook good", "Yes", "Signs point to yes", "Reply hazy try again", "Ask again later",
                "Better not tell you now", "Cannot predict now", "Concentrate and ask again", "Don't count on it",
                "My reply is no", "My sources say no", "Outlook not so good", "Very doubtful"];

            var min = Math.ceil(0);
            var max = Math.floor(answers.length - 1);
            message.reply(answers[Math.floor(Math.random() * (max - min + 1)) + min]);
        }
    };
    if (message.content.startsWith('!d20')) {
        var min = Math.ceil(1);
        var max = Math.floor(21);
        message.reply(Math.floor(Math.random() * (max - min)) + min);
    };

    if (message.content === '!help'){
        message.reply("!quote; !teemo; !8; !d20; !moose; !boop")
    }
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    if ((typeof oldMember.voiceChannel == 'undefined' || oldMember.voiceChannel.name !== "The Ocean") && (typeof newMember.voiceChannel != 'undefined' && newMember.voiceChannel.name === "The Ocean")) {
       let voiceChannel;
        if (!iCastReflect) {
            voiceChannel = newMember.voiceChannel;
        } else {
            if (newMember.id === 150436488532721664){
                voiceChannel = oldMember.voiceChannel;
            } else {
                voiceChannel = newMember.voiceChannel;
            }
        }
        if (!playingOceanMan) {
            playingOceanMan = true;
            voiceChannel.join().then(connection => {
                //starting playing ocean man
                oceanMan.playFile('./OceanMan.mp3');
                const dispatcher = connection.playBroadcast(oceanMan);
                //adjust volume
                dispatcher.setVolumeLogarithmic(.25);
                //setup end event.
                //wait long enough for ocean man to have finished playing, then send the end event.
                setTimeout(() => {
                    playingOceanMan = false;
                    voiceChannel.leave();
                }, 130000)
            });
        }
    }
});

client.login(botdata.loginKey);