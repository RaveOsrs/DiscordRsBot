const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');
const fetch = require('cross-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gim')
		.setDescription('Check out the community group ironman stats'),
	async execute(interaction) {
        const date = Date.now();
        const accounts = [
            "GIM Reborn 1",
            "GIM Reborn 2",
            "GIM Reborn 3",
            "GIM Reborn 4",
            "GIM Reborn 5"
        ]
        try {
            let result = {};
            let string = "";
            Promise.all(accounts.map(account =>
                fetch(`https://templeosrs.com/api/player_stats.php?player=${account}&date=${date}`)
                .then(response => response.json())
                .then(data => {
                    result[account] = {
                        total: data.data.Overall_level.toString(),
                        xp: data.data.Overall.toString()
                    }
                    //result += `**${account}** - Total level: ${data.data.Overall_level} (Xp: ${data.data.Overall})\n`;
                })
                .catch(error => console.log(error))
            ))
            .then(function() {
                var sortedResult = Object.keys(result).sort(function(keyA, keyB) {
                    return result[keyB].total - result[keyA].total;
                })
                console.log(sortedResult);
                for(var key in sortedResult) {
                    var i = 0;
                    if (sortedResult.hasOwnProperty(key)) {
                        string += `**${sortedResult[i]}** - Total lvl: ${sortedResult[key][total]} (Xp: ${sortedResult[key].xp})\n`;
                    }
                    i++;
                }
                
                const resultEmbed = new MessageEmbed()
                .setColor('#ffa500')
                .setTitle(`Community GIM Stats`)
                .setDescription(string)
                .setTimestamp();

                interaction.reply({ embeds: [resultEmbed] })
            })

        } catch (error) {
            console.log(error);
            interaction.reply('Oops, Something went wrong!');
        }
	}
};