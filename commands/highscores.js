const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('cross-fetch');
const { MessageEmbed } = require('discord.js');
const { groupID } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('highscores')
		.setDescription('Show highscores of a specific category.')
        .addStringOption(option =>
            option.setName('category')
            .setDescription('Choose a category')
            .setRequired(true)
            .addChoice('Overall', 'overall')
            .addChoice('Attack', 'attack')
            .addChoice('Defence', 'defence')
            .addChoice('Strength', 'strength')
            .addChoice('Hitpoints', 'hitpoints')
            .addChoice('Ranged', 'ranged')
            .addChoice('Prayer', 'prayer')
            .addChoice('Magic', 'magic')
            .addChoice('Cooking', 'cooking')
            .addChoice('Woodcutting', 'woodcutting')
            .addChoice('Fletching', 'fletching')
            .addChoice('Fishing', 'fishing')
            .addChoice('Firemaking', 'firemaking')
            .addChoice('Crafting', 'crafting')
            .addChoice('Smithing', 'smithing')
            .addChoice('Mining', 'mining')
            .addChoice('Herblore', 'herblore')
            .addChoice('Agility', 'agility')
            .addChoice('Thieving', 'thieving')
            .addChoice('Slayer', 'slayer')
            .addChoice('Farming', 'farming')
            .addChoice('Runecrafting', 'runecraft')
            .addChoice('Hunter', 'hunter')
            .addChoice('Construction', 'construction')),
	async execute(interaction) {
        const category = interaction.options.getString('category');
        try {
            fetch(`https://templeosrs.com/api/skill_hiscores.php?group=${groupID}&skill=${category}&count=10`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                let string = "";
                for (let i = 0; i < 10; i++) {
                    string += `**${data.data.players["1"].username}**: `;
                    string += numberWithCommas(data.data.players["1"].xp) + "\n";
                }
                const resultEmbed = new MessageEmbed()
                    .setColor('#ffa500')
                    .setTitle(`${data.data.skill} highscores`)
                    .setURL(`https://templeosrs.com/hiscores/skills.php?skill=${data.data.skill}&group=${groupID}`)
                    .setDescription(string)
                    .setThumbnail('https://pbs.twimg.com/profile_images/856908701659267072/_FlgMC0N_400x400.jpg')
                    .setTimestamp();
                
                interaction.reply({ embeds: [resultEmbed] })
            })
        } catch (error){
            console.log(error);
            interaction.reply(`Oops something went wrong!`);
        }
	}
};