const {Client, Intents} = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],partials: ["CHANNEL", "MESSAGE", "REACTION"] });
const axios = require('axios').default;
const config = require('./config.json');

const channel = bot.channels.cache.find(channel => channel.name == "bot-testing");

const tob = message.guild.roles.cache.find(role => role.name === "tob");
const tobHM = message.guild.roles.cache.find(role => role.name === "tob-hm");
 
const tobEmoji = 'tob';
const tobHMEmoji = 'tob-hm';
 
let embed = new Discord.MessageEmbed()
    .setColor('#e42643')
    .setTitle('Raid roles')
    .setDescription('React to this message to get your role!\n\n'
        + `${tobEmoji} for Tob team\n`
        + `${tobHMEmoji} for Tob HM team`);
 
let messageEmbed = message.channel.send(embed);
messageEmbed.react(tobEmoji);
messageEmbed.react(tobHMEmoji);

bot.once('ready', () =>{
    console.log('reactionRoles is online!');
});

bot.on('messageReactionAdd', async (reaction, user) => {
    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;

    if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name === tobEmoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(tob);
        }
        if (reaction.emoji.name === tobHMEmoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.add(tobHM);
        }
    } else {
        return;
    }

});

bot.on('messageReactionRemove', async (reaction, user) => {

    if (reaction.message.partial) await reaction.message.fetch();
    if (reaction.partial) await reaction.fetch();
    if (user.bot) return;
    if (!reaction.message.guild) return;


    if (reaction.message.channel.id == channel) {
        if (reaction.emoji.name === tobEmoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.remove(tob);
        }
        if (reaction.emoji.name === tobHMEmoji) {
            await reaction.message.guild.members.cache.get(user.id).roles.remove(tobHM);
        }
    } else {
        return;
    }
});

bot.login(process.env.TOKEN);