const {Client, Intents, MessageEmbed} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],partials: ["CHANNEL"] });
const fetch = require('cross-fetch');
const {TOKEN} = require('./config.json');

client.once('ready', () =>{
    console.log('templeActivites is online!');
});

client.on('message', async message =>{
    if (!message.channel.name == "bot-testing") return;
    if (message.author.bot) return;

    const anHourAgo = new Date();
    anHourAgo.setHours(anHourAgo.getHours() - 78);
    try {
        const file = await fetch("https://templeosrs.com/api/group_achievements.php?id=1386")
            .then(response => response.json())
            .then(data => {
                for (x in data) {
                    for (activity in data[x]) {
                        console.log(data[x][activity].Username);
                        console.log(data[x][activity].Date);
                        console.log(data[x][activity].Skill);
                        console.log(data[x][activity].Xp);
                        console.log(data[x][activity].Type);

                        var posted = new Date(data[x][activity].Date);
                        console.log(posted + " - " + anHourAgo);
                        if (posted > anHourAgo) {
                            const embed = new MessageEmbed();
                            console.log(posted + " - " + anHourAgo);
                            switch(data[x][activity].Type) {
                                case "Skill":
                                    embed.setDescription(`**${data[x][activity].Username}**, Reached ${numberWithCommas(data[x][activity].Xp)} in ${data[x][activity].Skill}!`);
                                    break;
                                case "Pvm":
                                    embed.setDescription(`**${data[x][activity].Username}**, Reached ${numberWithCommas(data[x][activity].Xp)} ${data[x][activity].Skill} kills!`);
                                    break;
                            }
                            message.channel.send(embed);
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