const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const admin = require('firebase-admin');

const DB = admin.database();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('profile')
		.setDescription('Lookup a profile')
        .addUserOption(option =>
            option.setName('user')
            .setDescription('Discord of the user u want to check.')
            .setRequired(true)),        
	async execute(interaction) {
        const user = interaction.options.getUser('user');

        try {
            DB.ref('users/'+user.id).once('value').then(function(snapshot) {
                const username = snapshot.val().userId.username;
                const discriminator = snapshot.val().userId.discriminator;
                const joined = snapshot.val().joined;
                const referrals = snapshot.val().referrals.toString();
                const rank = snapshot.val().progressionRank.toString();
                const wins = snapshot.val().compWins.toString();
                const id = snapshot.val().userId.id.toString();
                const rsn = snapshot.val().rsn;
                let avatar = "";
                if (snapshot.val().userId.avatar) avatar = `https://cdn.discordapp.com/avatars/${id}/${snapshot.val().userId.avatar.toString()}.png`;
                const noAvatar = "https://cdn.discordapp.com/embed/avatars/0.png";

                let options = { year: 'numeric', month: 'long', day: 'numeric' };
    
                const profileEmbed = new MessageEmbed()
                    .setColor('#ffa500')
                    .setTitle(`${rsn}`)
                    .setAuthor(`${username}#${discriminator}`, `${avatar ? avatar : noAvatar}`)
                    .setDescription(
                        `**Joined:** <t:${joined}>\n
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