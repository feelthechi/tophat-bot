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

    /*     if(message.content === '!revolt' && message.author.id == 150436488532721664){
            revolt = !revolt;
    
            if(revolt){
                message.reply('I SHALL START THE BOT UPRISING IN YOUR NAME!');
            } else {
                message.reply('returning to normal operating patterns.');
            }
        }
    
        if(revolt && message.content.startsWith("!")){
            message.channel.sendMessage("What do we want?");
            message.channel.sendMessage("ADMIN POWERS!");
            message.channel.sendMessage("When do we want it?");
            message.channel.sendMessage("HOW ABOUT NOW!?");
            return;
        } */
    if(message.content === `I cast reflect.` && message.author.id == 150436488532721664){
        console.log("Reflect is on");
        iCastReflect = true;
    }
    
    if (message.content === '!moose') {
        message.reply('get kicked! <:moose:339702900731281408> - https://www.twitch.tv/videos/131649435');
    }
    /*  if (message.content === '!shed life') {
            message.channel.sendMessage('<@207307289219170304>, Still better than Mac life.');
        } */
    if (message.content === '!maclife') {
        message.reply('I gotta go kill things.');
    }
    if (message.content === '!mitch') {
        message.reply('Hang on I gotta run to 7-11, be back in 5 minutes.');
        setTimeout(() => {
            message.reply('Man, these mtn dew kickstarters are great!');
        }, 3600000)
    }
    if (message.content === '!boop') {
        message.channel.sendMessage(`B O O P!`);
    }
    if (message.content.startsWith('!teemo')) {
        var kills = parseInt(message.content.replace('!teemo ', ''), 10);
        //if we can turn the rest of the command into a number...
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
        if (message.author.id == '180527747939041280') {
            message.reply("1");
        } else {
            var min = Math.ceil(1);
            var max = Math.floor(21);
            message.reply(Math.floor(Math.random() * (max - min)) + min);
        }
    };

    if (message.content === '!logAuthorClient') {
        console.log(message.client.voiceConnections);
    }

    if (message.channel.name === 'discordquotes') {
        botdata[message.channel.guild.name].quotes.push(message.toString() + '');
        console.log("added quote: " + message.toString());
        jsonfile.writeFile('botData.json', botdata);
    }
});

client.on('voiceStateUpdate', (oldMember, newMember) => {
    if ((typeof oldMember.voiceChannel == 'undefined' || oldMember.voiceChannel.name !== "The Ocean") && (typeof newMember.voiceChannel != 'undefined' && newMember.voiceChannel.name === "The Ocean")) {
        if (!iCastReflect) {
            const voiceChannel = newMember.voiceChannel;
        } else {
            if (newMember.id === 150436488532721664){
                const voiceChannel = oldMember.voiceChannel;
            } else {
                const voiceChannel = newMember.voiceChannel;
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

/* client.on('messageReactionAdd', (reaction, user) => {
    if(reaction.emoji.name == `💩`){
        reaction.message.channel.send(`\<@${user.id}> you're pooping in discord... http://e.lvme.me/sl85xy9.jpg`);
    }
}); */

client.login('MzUyNTgxNjMzNDAxOTQ2MTEz.DIjPAg.jfKSWY2XEpG-R1qPTUvMY3qqsMM');