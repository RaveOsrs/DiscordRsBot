/*const {Client, Intents} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],partials: ["CHANNEL"] });
const fetch = require('cross-fetch');
const admin = require('firebase-admin');

const DB = admin.database();

client.once('ready', () =>{    
    const channel = client.channels.cache.find(channel => channel.name == "hof-test");

    DB.ref('hof').once('value', function(snapshot) {
        snapshot.forEach(function(child) {
            const firstTime = child.child('1/time').val();
            const firstRsn = child.child('1/rsn').val();
            const secondTime = child.child('2/time').val();
            const secondRsn = child.child('2/rsn').val();
            const thirdTime = child.child('3/time').val();
            const thirdRsn = child.child('3/rsn').val();
            channel.send("**"+child.key+"**" +
                "\n:first_place: - " + firstTime + " - " + firstRsn +
                "\n:second_place: - " + secondTime + " - " + secondRsn +
                "\n:third_place: - " + thirdTime + " - " + thirdRsn);
        })
    })


});

client.login(process.env.TOKEN);*/