const {Client, Intents, MessageEmbed} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],partials: ["CHANNEL"] });
const fetch = require('cross-fetch');
const admin = require('firebase-admin');

const DB = admin.database();

let compID;

client.once('ready', () =>{    
    const channel = client.channels.cache.find(channel => channel.name == "competition");

    setInterval(async function() {
        try {
            await DB.ref('config').once('value').then(function(snapshot) {
                console.log("Competition ID:" + snapshot.val().currentCompId);
                compID = snapshot.val().currentCompId.toString();
            });
            var url = `https://templeosrs.com/api/competition_info.php?id=${compID}`;
            console.log(url);
            fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("Checking TempleOSRS comp");
                let string = "";
                for (let i = 0; i < 10; i++) {
                    string += `${i+1} ${data.data.participants[i].username} - `;
                    if (data.data.participants[i].xp_gained == null) {
                        string += data.data.participants[i].xp_gained + "\n";
                    } else {
                        string += numberWithCommas(data.data.participants[i].xp_gained) + "\n";
                    }
                }
                const compEmbed = new MessageEmbed()
                    .setColor('#ffa500')
                    .setTitle(`${data.data.info.name}`)
                    .setURL(`https://templeosrs.com/competitions/standings.php?id=${data.data.info.id}`)
                    .setDescription(`**Participants:** ${data.data.info.participant_count}
                        **Event type:** ${data.data.info.skill}
                        **Status:** ${data.data.info.status_text}
                        **Start:** ${data.data.info.start_date}
                        **End:** ${data.data.info.end_date}
                        
                        ${string}`)
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
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

client.login(process.env.TOKEN);