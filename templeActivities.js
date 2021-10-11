const {Client, Intents} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],partials: ["CHANNEL"] });
const fetch = require('cross-fetch');
const {TOKEN} = require('./config.json');

client.once('ready', () =>{
    console.log('templeActivites is online!');
});

client.on('message', async message =>{
    const HOUR = 2000 * 60 *60;
    if (!message.channel.name == "bot-testing") return;
    if (message.author.bot) return;

    const anHourAgo = Date.now() - HOUR;
    try {
        const file = await fetch("https://templeosrs.com/api/group_achievements.php?id=1386")
            .then(response => response.json())
            .then(data => {
                for (x in data) {
                    for (activity in data[x]) {
                        console.log(data[x][activity]);
                        console.log(data.data.Username);
                        console.log(data[x][activity].Username);
                        console.log(data[activity].Username);
                        console.log(data[x].Username);
                    }
                    console.log("-------");
                    console.log(data[x]);
                    console.log(activity.skill);
                    console.log(activity.xp);
                    /*var posted = new Date(activity.Date);
                    console.log(activity);
                    console.log(posted + " - " + anHourAgo);
                    if (posted > anHourAgo) {
                        const embed = new MessageEmbed();
                        console.log(posted + " - " + anHourAgo);
                        switch(activity.Type) {
                            case "Skill":
                                embed.setDescription(`**${activity.Username}**, Reached ${numberWithCommas(activity.Xp)} in ${activity.Skill}!`);
                                break;
                            case "Pvm":
                                embed.setDescription(`**${activity.Username}**, Reached ${numberWithCommas(activity.Xp)} ${activity.Skill} kills!`);
                                break;
                        }
                        message.channel.send(embed);
                    }*/
                }
            })
        
    } catch (error) {
        message.channel.send('Oops, there was an error fetching the API');
        console.log(error);
    }

});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

client.login(process.env.TOKEN);