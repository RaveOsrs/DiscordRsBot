const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const admin = require('firebase-admin');

const DB = admin.database();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('top-referrals')
		.setDescription('Top 10 referrals'),
	async execute(interaction) {
        try {
            DB.ref('users').orderByChild('referrals').limitToFirst(10).once('value').then(function(snapshot) {
                let result;

                snapshot.forEach((childSnapshot) => {
                    if (snapshot.val().referrals == 1) {
                        result += `**${childSnapshot.val().rsn}** - ${childSnapshot.val().referrals} referral\n`;
                    } else {
                        result += `**${childSnapshot.val().rsn}** - ${childSnapshot.val().referrals} referrals\n`;
                    }
                })
    
                const resultEmbed = new MessageEmbed()
                    .setColor('#ffa500')
                    .setTitle(`Top Referrals`)
                    .setDescription(result)
                    .setTimestamp();
    
                interaction.reply({ embeds: [resultEmbed] })
            })
        } catch (error){
            console.log(error);
            interaction.reply(`Oops something went wrong!`);
        }
	}
};