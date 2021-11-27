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
                compID = snapshot.val().currentCompId.toString();
            });
            var url = `https://templeosrs.com/api/competition_info.php?id=${compID}`;
            fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log("Checking TempleOSRS comp");
                const start = new Date(data.data.info.start_date).getTime().toString().slice(0,-3);
                const end = new Date(data.data.info.end_date).getTime().toString().slice(0,-3);

                let string = "";
                for (let i = 0; i < 10; i++) {
                    string += `**${data.data.participants[i].username}**: `;
                    if (data.data.participants[i].xp_gained == null) {
                        string += "\`" + data.data.participants[i].xp_gained + "\`\n";
                    } else {
                        string += "\`" + numberWithCommas(data.data.participants[i].xp_gained) + "\`\n";
                    }
                }
                let times = "";
                switch(data.data.info.status_text) {
                    case "Upcoming":
                        times = `Starting <t:${start}:R>`;
                        break;
                    case "In progress" || "Finished":
                        times = `Ending <t:${end}:R>`;
                        break;
                }
                const compEmbed = new MessageEmbed()
                    .setColor('#ffa500')
                    .setTitle(`${data.data.info.name}`)
                    .setURL(`https://templeosrs.com/competitions/standings.php?id=${data.data.info.id}`)
                    .setDescription(
                        `**Participants:** \`${data.data.info.participant_count}\`
                        **Event type:** \`${data.data.info.skill}\`
                        **Status:** \`${data.data.info.status_text}\`
                        **Start:** <t:${start}>
                        **End:** <t:${end}>

                        :clock1: ${times}
                        
                        ${string}`)
                    .setThumbnail('https://pbs.twimg.com/profile_images/856908701659267072/_FlgMC0N_400x400.jpg')
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