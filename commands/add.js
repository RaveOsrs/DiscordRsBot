const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('cross-fetch');
const { groupID, groupKey } = require("../config.json");
const admin = require('firebase-admin');

const DB = admin.database();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add')
		.setDescription('Add a player to the clan.')
        .setDefaultPermission(false)
        .addUserOption(option =>
            option.setName('user')
            .setDescription('Discord of the user')
            .setRequired(true))
        .addStringOption(option =>
            option.setName('rsn')
            .setDescription('RSN')
            .setRequired(true)),
	async execute(interaction) {
        const rsn = interaction.options.getString('rsn');
        const user = interaction.options.getUser('user');
        const date = Date.now();
        try {
            await DB.ref('users/'+user.id).once('value').then(function(snapshot) {
                if (!snapshot.exists()) {
                    await DB.ref('users/'+user.id).set({
                        userId: user,
                        rsn: rsn,
                        alts: "",
                        compWins: 0,
                        joined: date,
                        progressionRank: 0,
                        referrals: 0,
                    });
                }
            });
            fetch(`https://templeosrs.com/api/add_group_member.php?`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `id=${groupID}&key=${groupKey}&players=${rsn}`
            })
            .then(interaction.reply(`**${rsn}**, Has been added!`))
        } catch (error) {
            interaction.reply('Oops, there was an error fetching the API');
            console.log(error);
        }
	},
};