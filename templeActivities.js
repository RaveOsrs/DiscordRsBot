const {Client, Intents, MessageEmbed} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],partials: ["CHANNEL"] });
const fetch = require('cross-fetch');
const {TOKEN} = require('./config.json');

client.once('ready', () =>{
    console.log('templeActivites is online!');
});

client.on('message', async message =>{
    const channel = client.channels.cache.find(channel => channel.name == "general");
    if (message.author.bot) return;

    const minutesAgo = new Date();
    minutesAgo.setMinutes(minutesAgo.getMinutes() - 5);
    try {
        const file = await fetch("https://templeosrs.com/api/group_achievements.php?id=1386")
            .then(response => response.json())
            .then(data => {
                for (x in data) {
                    for (activity in data[x]) {
                        var posted = new Date(data[x][activity].Date);
                        console.log(posted + " - " + anHourAgo);
                        if (posted > anHourAgo) {
                            console.log(posted + " - " + anHourAgo);
                            switch(data[x][activity].Type) {
                                case "Skill":
                                    console.log("skill");
                                    //embed.setDescription("**"+ data[x][activity].Username+"** Reached "+data[x][activity].Xp + data[x][activity].Skill+"!");
                                    channel.send(`**${data[x][activity].Username}**, Reached ${data[x][activity].Xp} in ${data[x][activity].Skill}!`);
                                    break;
                                case "Pvm":
                                    console.log("pvm");
                                    //embed.setDescription("**"+ data[x][activity].Username+"** Reached "+data[x][activity].Xp + data[x][activity].Skill+" kills!");
                                    channel.send(`**${data[x][activity].Username}**, Reached ${data[x][activity].Xp} ${data[x][activity].Skill} kills!`);
                                    break;
                                default:
                                    channel.send(`Uhh this is not supposed to happen :(`);
                            }
                        }
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

client.login(process.env.TOKEN);