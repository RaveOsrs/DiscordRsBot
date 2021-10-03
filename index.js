const { Client, Intents } = require('discord.js');
const token = 'ODk0MjE0MTAxMTA1MDA0NTQ0.YVmvxw.EHVkvyXt_wUNb0vp9flcqbD_Qnw';

const client = new Client({ Intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () =>{
    console.log('RaveBot is online!');
});


client.login(token);