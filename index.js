const {Client, Intents} = require('discord.js');
const bot = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],partials: ["CHANNEL"] });
const axios = require('axios').default;
const config = require('./config.json');

bot.once('ready', () =>{
    console.log('RaveBot is online!');
});

bot.on('messageCreate', message =>{
    //change below line to channel new users post their names in
      if(message.channel.name == "post-rsn" && message.member.roles.cache.some(role => role.name === "Guest")) {
          var NickName = message.content;
          var format = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/;
          var SpecialChars = (format.test(NickName));
  
          if(NickName.length > 12 || SpecialChars == true) {
              message.channel.send("This RSN is invalid, please type your RSN exactly how it appears in game.");
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
                message.channel.send("Player **" + NickName + "** found.");
  
                            
                //change below to the actual bot channel used for commands
              var Verified = message.member.guild.roles.cache.find(role => role.name === "Verified");
              var Guest = message.member.guild.roles.cache.find(role => role.name === "Guest");
              
              message.member.setNickname(NickName);
              message.member.roles.add(Verified);
              message.member.roles.remove(Guest);            
  
              })
              .catch(function (error) {
                message.channel.send("Player **" + NickName + "** Does not exist, please type your RSN exactly how it appears in game.");
              });
  
          }
      }
  }
  
  );

bot.login(config.TOKEN);