const {Client, Intents} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],partials: ["CHANNEL"] });
const axios = require('axios').default;
const admin = require('firebase-admin');
const fetch = require('cross-fetch');
const { groupID, groupKey } = require("./config.json");

const DB = admin.database();

client.once('ready', () =>{
    console.log('changeName is online!');
});

client.on('messageCreate', message =>{
    if(message.channel.name == "name-changes") {
        if (message.author.bot) return; //so it doesnt reply to itself

        var OldName = message.member.displayName;
        var senderId = message.author.id;
        var NickName = message.content;
        var format = /[!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?]+/;
        var SpecialChars = (format.test(NickName));
        var NameChangeChannel = client.channels.cache.find(channel => channel.name === "name-changes");

        if(NickName.length > 12 || SpecialChars == true) {
            message.channel.send("This RSN doesn't exist, please type your RSN exactly how it appears in game.");
        }
        else{       
            const params = new URLSearchParams()
            params.append('player', NickName)
  
            const config = {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
  
            axios
            .post('https://secure.runescape.com/m=hiscore_oldschool/index_lite.ws', params, config)
            .then(async function (response) {
                await DB.ref('users/'+senderId).once('value').then(function(snapshot) {
                    if (!snapshot.exists()) return;
                    DB.ref('users/'+senderId+"/rsn").set(NickName); //change name in database
                });
                await fetch(`https://templeosrs.com/api/remove_group_member.php?`, { //remove old name from templeosrs
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: `id=${groupID}&key=${groupKey}&players=${OldName}`
                })
                await fetch(`https://templeosrs.com/api/add_group_member.php?`, { //add new name to templeosrs
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    body: `id=${groupID}&key=${groupKey}&players=${NickName}`
                })
                message.member.setNickname(NickName); //change discord nickname
                NameChangeChannel.send('Name changed from **' + OldName + '** to **' + NickName + '**');
            })
            .catch(function (error) {
                console.log(error);
                message.channel.send("Player **" + NickName + "** doesn't exist, please type your RSN exactly how it appears in game.");
            });
        }
    }
});

client.login(process.env.TOKEN);
