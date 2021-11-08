const { SlashCommandBuilder } = require('@discordjs/builders');
const admin = require('firebase-admin');

const DB = admin.database();

let wins = "";
let id = "";
let rsn = "";

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Lookup a profile')
        .addStringOption(option =>
            option.setName('rsn')
            .setDescription('User u want to check.')
            .setRequired(false)),
	async execute(interaction) {
        if (!rsn) {
            rsn = interaction.member.displayName.toLowerCase()
        }
        rsn = interaction.options.getString('rsn');

        DB.ref('users/'+rsn).once('value').then(function(snapshot) {
            wins = snapshot.val().compWins.toString();
            id = snapshot.val().userId.id.toString();
        })
        .then(interaction.reply(`Wins:${wins}, disc ID: ${id})`))
	}
};