const { SlashCommandBuilder } = require('@discordjs/builders');
const admin = require('firebase-admin');

const DB = admin.database();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-referral')
		.setDescription('Person that referred someone.')
        .setDefaultPermission(false)
        .addUserOption(option =>
            option.setName('user')
            .setDescription('Discord of the user')
            .setRequired(true)),
	async execute(interaction) {
        const user = interaction.options.getUser('user');
        let referrals;
        let rsn;
        try {
            await DB.ref('users/'+user.id).once('value').then(function(snapshot) {
                referrals = snapshot.val().referrals;
                rsn = snapshot.val().rsn;
            });
            DB.ref('users/'+user.id+"/referrals").set(referrals + 1);
            interaction.reply(`Referral added for **${rsn}**! New referral amount: ${referrals + 1}`)
        } catch (error) {
            interaction.reply('Oops, there was an error fetching the API');
            console.log(error);
        }
	},
};