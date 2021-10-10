const {Client, Intents} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],partials: ["CHANNEL"] });
const axios = require('axios').default;
const config = require('./config.json');

client.once('ready', () =>{
    console.log('postRsn is online!');
});

client.on('messageCreate', message =>{
    //change below line to channel new users post their names in
    if(message.channel.name == "post-rsn" && message.member.roles.cache.some(role => role.name === "Guest")) {
        var NickName = message.content;
        var format = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/;
        var SpecialChars = (format.test(NickName));
  
        if(NickName.length > 12 || SpecialChars == true) {
                message.channel.send("This RSN doesn't exist, please type your RSN exactly how it appears in game.");
        }
        else {
            const params = new URLSearchParams()
            params.append('player', NickName)
  
            const config = {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
  
            axios
            .post('https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws', params, config)
            .then(function (response) {
                const file = response.data;
                message.channel.send("Welcome **" + NickName + "**!");
  
                            
                //change below to the actual bot channel used for commands
                var Verified = message.member.guild.roles.cache.find(role => role.name === "Verified");
                var Guest = message.member.guild.roles.cache.find(role => role.name === "Guest");
              
                message.member.setNickname(NickName);
                message.member.roles.add(Verified);
                message.member.roles.remove(Guest);            
  
            })
            .catch(function (error) {
                message.channel.send("Player **" + NickName + "** doesn't exist, please type your RSN exactly how it appears in game.");
            });
        }
    }
    if(message.channel.name == "post-rsn" && message.member.roles.cache.some(role => role.name === "Guest")) {

    }
}
);

client.login(process.env.TOKEN);
