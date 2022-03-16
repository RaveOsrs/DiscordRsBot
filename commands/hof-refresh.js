const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const admin = require('firebase-admin');

const DB = admin.database();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('hof-refresh')
		.setDescription('refresh the hof'),
	async execute(interaction) {
		const channel = client.channels.cache.find(channel => channel.name == "hof-test");

        DB.ref('hof').once('value', function(snapshot) {
            snapshot.forEach(function(child) {
                const firstTime = child.child('1/time').val();
                const firstRsn = child.child('1/rsn').val();
                const secondTime = child.child('2/time').val();
                const secondRsn = child.child('2/rsn').val();
                const thirdTime = child.child('3/time').val();
                const thirdRsn = child.child('3/rsn').val();
                channel.send("**"+child.key+"**" +
                    "\n:first_place: - " + firstTime + " - " + firstRsn +
                    "\n:second_place: - " + secondTime + " - " + secondRsn +
                    "\n:third_place: - " + thirdTime + " - " + thirdRsn);
            })
        })
	},
};