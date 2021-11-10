const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const admin = require('firebase-admin');

const DB = admin.database();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Lookup a profile')
        .addStringOption(option =>
            option.setName('rsn')
            .setDescription('User u want to check.')
            .setRequired(true)),
	async execute(interaction) {
        const rsn = interaction.options.getString('rsn');

        try {
            DB.ref('users/'+rsn).once('value').then(function(snapshot) {
                const username = snapshot.val().userId.username;
                const discriminator = snapshot.val().userId.discriminator;
                const joined = new Date(snapshot.val().joined);
                const referrals = snapshot.val().referrals.toString();
                const rank = snapshot.val().progressionRank.toString();
                const wins = snapshot.val().compWins.toString();
                const id = snapshot.val().userId.id.toString();
                const avatar = snapshot.val().userId.avatar.toString();
                let options = { year: 'numeric', month: 'long', day: 'numeric' };
    
                const profileEmbed = new MessageEmbed()
                    .setColor('#ffa500')
                    .setTitle(`${rsn}`)
                    .setAuthor(`${username}#${discriminator}`, `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`)
                    .setDescription(`**Joined:** ${joined.toLocaleDateString('en-US', options)}\n
                        **Referrals:** ${referrals}
                        **Rank:** ${rank}
                        **Competition wins:** ${wins}`)
                    .setTimestamp();
    
                interaction.reply({ embeds: [profileEmbed] })
            })
        } catch (error){
            console.log(error);
            interaction.reply(`Couldn't find clanmate **${rsn}**`);
        }
	}
};