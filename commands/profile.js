const { SlashCommandBuilder } = require('@discordjs/builders');
const admin = require('firebase-admin');

const DB = admin.database();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Lookup a profile')
        .addStringOption(option =>
            option.setName('rsn')
            .setDescription('User u want to check.')
            .setRequired(false)),
	async execute(interaction) {
        let rsn;
        if (!rsn) {
            rsn = interaction.member.displayName.toLowerCase()
        }
        rsn = interaction.options.getString('rsn');

        DB.ref('users/'+rsn).once('value').then(function(snapshot) {
            const wins = snapshot.val().compWins.toString();
            const id = snapshot.val().userId.id.toString();
            interaction.reply(`Wins:${wins}, disc ID: ${id})`)
        })
	}
};