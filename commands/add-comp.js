const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('cross-fetch');
const admin = require('firebase-admin');

const DB = admin.database();

module.exports = {
	data: new SlashCommandBuilder()
		.setName('add-comp')
		.setDescription('Add a competition.')
        .setDefaultPermission(false)
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

        try {
            fetch(`https://templeosrs.com/api/competition_info.php?id=${id}`)
            .then(response => response.json())
            .then(data => {
                if(data.data.info.name) {
                    await DB.ref('competitions/'+id).once('value').then(function(snapshot) {
                        if (!snapshot.exists()) {
                            DB.ref('competitions/'+id).set({
                                id: id,
                                key: key,
                                name: data.data.info.name,
                            });
                        }
                    });
                } else {
                    interaction.reply(`Cant find competition with id: ${id}`);
                    return;
                }
            })
            .then(interaction.reply(`${data.data.info.name} has been added.`))
            
        } catch (error) {
            interaction.reply('Oops, there was an error fetching the API');
            console.log(error);
        }
	},
};