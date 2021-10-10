const discord = require('discord.js');
const bot = new discord.Client();

bot.once('ready', () =>{
    console.log('templeActivites is online!');
});

bot.on('ready', () =>{
    const HOUR = 2000 * 60 *60;

    setInterval(() => {
        const anHourAgo = Date.now() - HOUR;
        console.log('in the interval');
        try {
            const response = fetch("https://templeosrs.com/api/group_achievements.php?id=1386");
            const data = response.json();
            console.log(data);

            for (activity in data) {
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
                    const channel = bot.channels.cache.find(channel => channel.name == "bot-testing");
                    channel.send(embed);
                }
            }
        } catch (error) {
            message.channel.send('Oops, there was an error fetching the API');
            console.log(error);
        }
    }, 60000);
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

bot.login(process.env.TOKEN);