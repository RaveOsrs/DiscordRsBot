const {Client, Intents} = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],partials: ["CHANNEL"] });
const fetch = require('cross-fetch');

bot.once('ready', () =>{
    console.log('templeActivites is online!');
});

bot.on('message', async message =>{
    const HOUR = 2000 * 60 *60;
    if (!message.channel.name == "bot-testing") return;
    if (message.author.bot) return;

    const anHourAgo = Date.now() - HOUR;
    try {
        let {file} = await fetch("https://templeosrs.com/api/group_achievements.php?id=1386")
            .then(response => response.json())
            .then(response => {
                for (activity in response) {
                    var posted = new Date(activity.Date);
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
                    }
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

bot.login(process.env.TOKEN);