const {Client, Intents} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],partials: ["CHANNEL"] });
const fetch = require('cross-fetch');

client.once('ready', () =>{    
    const channel = client.channels.cache.find(channel => channel.name == "drops-achievements");

    setInterval(async function() {
        const minutesAgo = new Date(); //current date
        minutesAgo.setMinutes(minutesAgo.getMinutes() - 5); //5 minutes ago

        try {
            fetch("https://templeosrs.com/api/group_achievements.php?id=1386")
            .then(response => response.json())
            .then(data => {
                for (x in data) {
                    console.log("Checking TempleOSRS");
                    for (activity in data[x]) {
                        var posted = new Date(data[x][activity].Date);
                        if (posted > minutesAgo) {//if less then 5mins ago
                            switch(data[x][activity].Type) {
                                case "Skill":
                                    if (data[x][activity].Skill == "Ehp") {
                                        channel.send(`**${data[x][activity].Username}**, Reached ${numberWithCommas(data[x][activity].Xp)}${data[x][activity].Skill}!`);
                                    } else {
                                        channel.send(`**${data[x][activity].Username}**, Reached ${numberWithCommas(data[x][activity].Xp)}xp in ${data[x][activity].Skill}!`);
                                    }
                                    break;
                                case "Pvm":
                                    switch(data[x][activity].Skill) {
                                        case "Clue_all":
                                            channel.send(`**${data[x][activity].Username}**, Reached ${numberWithCommas(data[x][activity].Xp)} Total clues!`);
                                            break;
                                        case "Clue_beginner":
                                            channel.send(`**${data[x][activity].Username}**, Reached ${numberWithCommas(data[x][activity].Xp)} Beginner clues!`);
                                            break;
                                        case "Clue_easy":
                                            channel.send(`**${data[x][activity].Username}**, Reached ${numberWithCommas(data[x][activity].Xp)} Easy clues!`);
                                            break;
                                        case "Clue_medium":
                                            channel.send(`**${data[x][activity].Username}**, Reached ${numberWithCommas(data[x][activity].Xp)} Medium clues!`);
                                            break;
                                        case "Clue_hard":
                                            channel.send(`**${data[x][activity].Username}**, Reached ${numberWithCommas(data[x][activity].Xp)} Hard clues!`);
                                            break;
                                        case "Clue_elite":
                                            channel.send(`**${data[x][activity].Username}**, Reached ${numberWithCommas(data[x][activity].Xp)} Elite clues!`);
                                            break;
                                        case "Clue_master":
                                            channel.send(`**${data[x][activity].Username}**, Reached ${numberWithCommas(data[x][activity].Xp)} Master clues!`);
                                            break;
                                        default:
                                            channel.send(`**${data[x][activity].Username}**, Reached ${numberWithCommas(data[x][activity].Xp)} ${data[x][activity].Skill} kills!`);
                                    }
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
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

client.login(process.env.TOKEN);