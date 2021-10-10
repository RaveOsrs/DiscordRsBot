const {Client, Intents} = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],partials: ["CHANNEL"] });
module.exports = client;

bot.once('ready', () =>{
    console.log('RaveBot is online!');
});

postrsnRequire = require('./postRsn.js');
namechangeRequire = require("./changeName.js");
//reactionrolesRequire = require("./reactionRoles.js");
templeactivitiesRequire = require("./templeActivities.js");

bot.login(process.env.TOKEN);
