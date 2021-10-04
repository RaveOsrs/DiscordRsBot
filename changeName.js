const {Client, Intents} = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],partials: ["CHANNEL"] });
const axios = require('axios').default;
const config = require('./config.json');

bot.once('ready', () =>{
    console.log('changeName is online!');
});

bot.on('messageCreate', message =>{
    if(message.channel.name == "name-changes") {
        if (message.author.bot) return; //so it doesnt reply to itself

        var OldName = message.member.displayName;
        var NickName = message.content;
        var format = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/;
        var SpecialChars = (format.test(NickName));
        var NameChangeChannel = bot.channels.cache.find(channel => channel.name === "name-changes");

        if(NickName.length > 12 || SpecialChars == true) {
            message.channel.send("This RSN doesn't exist, please type your RSN exactly how it appears in game.");
        }
        else{
            const params = new URLSearchParams()
            params.append('player', NickName)
  
            const config = {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
  
            axios
            .post('https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws', params, config)
            .then(function (response) {
                message.member.setNickname(NickName);
                NameChangeChannel.send('Name changed from **' + OldName + '** to **' + NickName + '**');
            })
            .catch(function (error) {
                message.channel.send("Player **" + NickName + "** doesn't exist, please type your RSN exactly how it appears in game.");
            });
        }
    }
});

bot.login(process.env.TOKEN);
