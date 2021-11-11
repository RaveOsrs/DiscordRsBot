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
            let result = "";
            for (i = 0;i < accounts.length;i++) {
                fetch(`https://templeosrs.com/api/player_stats.php?player=${accounts[i]}&date=${date}`)
                .then(response => response.json())
                .then(data => {
                    result += `${accounts[i]} - **Total level:** ${data.data.Overall_level} (Xp: ${data.data.Overall})\n`;
                })
            }
            const resultEmbed = new MessageEmbed()
            .setColor('#ffa500')
            .setTitle(`Community GIM Stats`)
            .setDescription(result)
            .setTimestamp();

            interaction.reply({ embeds: [resultEmbed] })

        } catch (error) {
            console.log(error);
            interaction.reply('Oops, Something went wrong!');
        }
	}
};