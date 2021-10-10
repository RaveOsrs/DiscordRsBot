const {Client, Intents} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],partials: ["CHANNEL", "MESSAGE", "REACTION"] });
const axios = require('axios').default;
const config = require('./config.json');

const channel = client.channels.cache.find(channel => channel.name == "bot-testing");
 
let embed = new Client.MessageEmbed()
    .setColor('#e42643')
    .setTitle('Raid roles')
    .setDescription('React to this message to get your role!\n\n'
        + `${tobEmoji} for Tob team\n`
        + `${tobHMEmoji} for Tob HM team`);
 
let messageEmbed = channel.send(embed);
messageEmbed.react(tobEmoji);
messageEmbed.react(tobHMEmoji);

bclientot.once('ready', () =>{
    console.log('reactionRoles is online!');
});

client.login(process.env.TOKEN);