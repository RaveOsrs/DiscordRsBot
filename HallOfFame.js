const {Client, Intents} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],partials: ["CHANNEL"] });
const fetch = require('cross-fetch');
const admin = require('firebase-admin');

const DB = admin.database();

client.once('ready', () =>{    
    const channel = client.channels.cache.find(channel => channel.name == "hof-test");

    DB.ref('hof').once('value', function(snapshot) {
        snapshot.forEach(function(child) {
            const firstTime = child.child('1/rsn').val();
            const firstRsn = child.child('1/rsn').val();
            const secondTime = child.child('1/rsn').val();
            const secondRsn = child.child('1/rsn').val();
            const thirdTime = child.child('1/rsn').val();
            const thirdRsn = child.child('1/rsn').val();
            channel.send("**"+child.key+"**" +
                ":first_place: - " + firstTime + " - " + firstRsn +
                ":second_place: - " + secondTime + " - " + secondRsn +
                ":third_place: - " + thirdTime + " - " + thirdRsn);
        })
    })


});

client.login(process.env.TOKEN);