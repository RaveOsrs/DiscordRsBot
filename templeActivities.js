const {Client, Intents, MessageEmbed} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],partials: ["CHANNEL"] });
const fetch = require('cross-fetch');
const {TOKEN} = require('./config.json');

client.once('ready', () =>{    
    const channel = client.channels.cache.find(channel => channel.name == "general");

    const minutesAgo = new Date();
    minutesAgo.setMinutes(minutesAgo.getMinutes() - 5);
    setInterval(async function() {
        try {
            fetch("https://templeosrs.com/api/group_achievements.php?id=1386")
            .then(response => response.json())
            .then(data => {
                for (x in data) {
                    console.log("Checking TempleOSRS");
                    for (activity in data[x]) {
                        var posted = new Date(data[x][activity].Date);
                        if (posted > minutesAgo) {
                            switch(data[x][activity].Type) {
                                case "Skill":
                                    console.log("skill");
                                    channel.send(`**${data[x][activity].Username}**, Reached ${numberWithCommas(data[x][activity].Xp)}xp in ${data[x][activity].Skill}!`);
                                    break;
                                case "Pvm":
                                    console.log("pvm");
                                    channel.send(`**${data[x][activity].Username}**, Reached ${numberWithCommas(data[x][activity].Xp)} ${data[x][activity].Skill} kills!`);
                                    break;
                                default:
                                    channel.send(`Uhh this is not supposed to happen :(`);
                            }
                        }
                    }
                }
            })
        }catch (error) {
            channel.send('Oops, there was an error fetching the API');
            console.log(error);
        }
    }, 5 * 60 * 1000)
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

client.login(process.env.TOKEN);