const Discord = require('discord.js');
const bot = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION" ]});
const axios = require('axios').default;
const config = require('./config.json');

const channel = bot.channels.cache.find(channel => channel.name == "bot-testing");
 
let embed = new Discord.MessageEmbed()
    .setColor('#e42643')
    .setTitle('Raid roles')
    .setDescription('React to this message to get your role!\n\n'
        + `${tobEmoji} for Tob team\n`
        + `${tobHMEmoji} for Tob HM team`);
 
let messageEmbed = channel.send(embed);
messageEmbed.react(tobEmoji);
messageEmbed.react(tobHMEmoji);

bot.once('ready', () =>{
    console.log('reactionRoles is online!');
});

bot.login(process.env.TOKEN);