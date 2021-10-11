const {Client, Intents} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],partials: ["CHANNEL"] });

client.once('ready', () =>{
    console.log('RaveBot is online!');
});

postrsnRequire = require('./postRsn.js');
namechangeRequire = require("./changeName.js");
//reactionrolesRequire = require("./reactionRoles.js");
//templeactivitiesRequire = require("./templeActivities.js");

client.login(process.env.TOKEN);
