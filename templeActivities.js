const {Client, Intents} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],partials: ["CHANNEL"] });
const fetch = require('cross-fetch');

client.once('ready', () =>{    
    const channel = client.channels.cache.find(channel => channel.name == "bot-stuff");

    const minutesAgo = new Date(); //current date
    minutesAgo.setMinutes(minutesAgo.getMinutes() - 5); //5 minutes ago
    setInterval(async function() {
        try {
            fetch("https://templeosrs.com/api/group_achievements.php?id=1386")
            .then(response => response.json())
            .then(data => {
                for (x in data) {
                    console.log("Checking TempleOSRS");
                    for (activity in data[x]) {
                        var posted = new Date(data[x][activity].Date);
                        console.log(`posted: ${posted} 5 mins ago:${minutesAgo}`);
                        if (posted > minutesAgo) {//if less then 5mins ago
                            console.log(`5mins ago: ${data[x][activity.Type]}`);
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
                        } else { return }
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