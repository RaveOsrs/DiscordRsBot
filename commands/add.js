const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('cross-fetch');
const { groupID, groupKey } = require("../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription('Add a player to TempleOSRS')
        .addStringOption(option =>
            option.setName('rsn')
            .setDescription('RSN of the player u want to add to TempleOSRS')
            .setRequired(true)),
	async execute(interaction) {
        const rsn = interaction.options.getString('rsn');
        try {
            fetch(`https://templeosrs.com/api/add_group_member.php?`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `id=${groupID}&key=${groupKey}&players=${rsn}`
            })
            .then(interaction.reply(`**${rsn}**, Has been added to the TempleOSRS group!`))
        } catch (error) {
            interaction.reply('Oops, there was an error fetching the API');
            console.log(error);
        }
	},
};