const {Client, Intents} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],partials: ["CHANNEL"] });
const axios = require('axios').default;

client.once('ready', () =>{
    console.log('forumApps is online!');

    const channel = client.channels.cache.find(channel => channel.name == "bot-testing");

    const minutesAgo = new Date();
    minutesAgo.setMinutes(minutesAgo.getMinutes() - 5);
    setInterval(async function() {
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        axios
        .get('https://secure.runescape.com/m=forum/c=W6rAQ5dpf1Y/forums?320,321,475,66231563,goto,999', config)
        .then(function (response) {
            const file = response.data;
            console.log(file);
            channel.send(response);
        })
        .catch(function (error) {
            channel.send("Something went wrong with the axios request.");
        });
    }, 5 * 60 * 1000)
});

client.login(process.env.TOKEN);
