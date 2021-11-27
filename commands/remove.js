const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('cross-fetch');
const { groupID, groupKey } = require("../config.json");

module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove')
		.setDescription('Remove a player from TempleOSRS')
        //.setDefaultPermission(false)
        .addStringOption(option =>
            option.setName('rsn')
            .setDescription('RSN of the player u want to remove from TempleOSRS')
            .setRequired(true)),
	async execute(interaction) {
        const rsn = interaction.options.getString('rsn');
        try {
            fetch(`https://templeosrs.com/api/remove_group_member.php?`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `id=${groupID}&key=${groupKey}&players=${rsn}`
            })
            .then(interaction.reply(`**${rsn}**, Has been removed from the TempleOSRS group!`))
        } catch (error) {
            interaction.reply('Oops, there was an error fetching the API');
            console.log(error);
        }
	},
};