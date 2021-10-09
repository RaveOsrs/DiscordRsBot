const {Client, Intents} = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],partials: ["CHANNEL"] });
const axios = require('axios').default;
const config = require('./config.json');

bot.once('ready', () =>{
    console.log('postRsn is online!');
});

bot.on('ready', () =>{
    const HOUR = 1000 * 60 *60

    bot.setInterval(() => {
        const anHourAgo = Date.now() - HOUR;

        try {
            const response = await fetch("https://templeosrs.com/api/group_achievements.php?id=1386");
            const data = response.json();

            for (activity in data) {
                var posted = new Date(activity.Date);
                if (posted > anHourAgo) {
                    const embed = new MessageEmbed();
                    switch(activity.Type) {
                        case "Skill":
                            embed.setDescription(`**${activity.Username}**, Reached ${numberWithCommas(activity.Xp)} in ${activity.Skill}!`);
                            break;
                        case "Pvm":
                            embed.setDescription(`**${activity.Username}**, Reached ${numberWithCommas(activity.Xp)} ${activity.Skill} kills!`);
                            break;
                    }
                    const channel = bot.channels.cache.find(channel => channel.name == "bot-testing");
                    channel.send(embed);
                }
            }
        } catch (error) {
            message.channel.send('Oops, there was an error fetching the API');
            console.log(error);
        }
    }, HOUR);
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}