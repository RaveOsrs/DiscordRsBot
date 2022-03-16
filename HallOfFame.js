const {Client, Intents} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],partials: ["CHANNEL"] });
const fetch = require('cross-fetch');
const admin = require('firebase-admin');

const DB = admin.database();

client.once('ready', () =>{    
    const channel = client.channels.cache.find(channel => channel.name == "hof-test");

    DB.ref('hof').once('value', function(snapshot) {
        snapshot.forEach(function(child) {
            const firstTime = child.ref('1').val().time;
            const firstRsn = child.ref('1').val().rsn;
            const secondTime = child.ref('1').val().time;
            const secondRsn = child.ref('1').val().rsn;
            const thirdTime = child.ref('1').val().time;
            const thirdRsn = child.ref('1').val().rsn;
            message.channel.send("**"+child.key+"**" +
                ":first_place: - " + firstTime + " - " + firstRsn +
                ":second_place: - " + secondTime + " - " + secondRsn +
                ":third_place: - " + thirdTime + " - " + thirdRsn);
        })
    })


});

client.login(process.env.TOKEN);