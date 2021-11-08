const { SlashCommandBuilder } = require('@discordjs/builders');
const admin = require('firebase-admin');

const DB = admin.database();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('set-comp')
		.setDescription('Set a new competition as active.')
        .addIntegerOption(option =>
            option.setName('id')
            .setDescription('Competition ID')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('key')
            .setDescription('Competition Key')
            .setRequired(true)),
	async execute(interaction) {
        const id = interaction.options.getInteger('id');
        const key = interaction.options.getString('key');

        await DB.ref('config').update({
            currentCompId: id,
            currentCompKey: key
        })
        .then(interaction.reply(`Current competition updated. (ID:${id}, Key: ${key})`))
	}
};