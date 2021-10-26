const {Client, Intents, MessageEmbed} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],partials: ["CHANNEL"] });
const fetch = require('cross-fetch');

client.once('ready', () =>{    
    const channel = client.channels.cache.find(channel => channel.name == "competition");

    setInterval(async function() {
        try {
            fetch("https://templeosrs.com/api/competition_info.php?id=15002")
            .then(response => response.json())
            .then(data => {
                console.log("Checking TempleOSRS comp");
                const compEmbed = new MessageEmbed()
                    .setColor('#ffa500')
                    .setTitle(`${data.data.info.name}`)
                    .setURL(`https://templeosrs.com/competitions/standings.php?id=${data.data.info.id}`)
                    .setDescription(`**Participants:** ${data.data.info.participant_count}
                        **Event type:** ${data.data.info.skill}
                        **Status:** ${data.data.info.status_text}
                        **Start:** ${data.data.info.start_date}
                        **End:** ${data.data.info.end_date}`)
                    .setThumbnail('https://pbs.twimg.com/profile_images/856908701659267072/_FlgMC0N_400x400.jpg');
                let usernames = "";
                let startEnd = "";
                let gained = "";
                for (let i = 0; i < 10; i++) {
                    usernames += data.data.participants[i].username + "\n";
                    startEnd += data.data.participants[i].start_xp + " --> " + data.data.participants[i].end_xp + "\n";
                    gained += data.data.participants[i].xp_gained + "\n";
                }
                compEmbed.addFields(
                    { name: "Username" , value: usernames, inline: true },
                    { name: "Start / End", value: startEnd, inline: true },
                    { name: "Gained", value: gained, inline: true },
                )
                .setTimestamp();

                channel.bulkDelete(5)
                    .then(channel.send({ embeds: [compEmbed] }))
                    .catch(console.error);
            })
        } catch (error) {
            channel.send('Oops, there was an error fetching the API');
            console.log(error);
        }
    }, 10 * 60 * 1000)
});

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

client.login(process.env.TOKEN);