const { SlashCommandBuilder } = require('@discordjs/builders');
const fetch = require('cross-fetch');
const { MessageEmbed } = require('discord.js');
const { groupID } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('highscores')
		.setDescription('Show highscores of a specific category.')
        .addStringOption(option =>
            option.setName('category')
            .setDescription('Choose a category')
            .setRequired(true)
            .addChoice('Overall', 'overall')
            .addChoice('Attack', 'attack')
            .addChoice('Defence', 'defence')
            .addChoice('Strength', 'strength')
            .addChoice('Hitpoints', 'hitpoints')
            .addChoice('Ranged', 'ranged')
            .addChoice('Prayer', 'prayer')
            .addChoice('Magic', 'magic')
            .addChoice('Cooking', 'cooking')
            .addChoice('Woodcutting', 'woodcutting')
            .addChoice('Fletching', 'fletching')
            .addChoice('Fishing', 'fishing')
            .addChoice('Firemaking', 'firemaking')
            .addChoice('Crafting', 'crafting')
            .addChoice('Smithing', 'smithing')
            .addChoice('Mining', 'mining')
            .addChoice('Herblore', 'herblore')
            .addChoice('Agility', 'agility')
            .addChoice('Thieving', 'thieving')
            .addChoice('Slayer', 'slayer')
            .addChoice('Farming', 'farming')
            .addChoice('Runecrafting', 'runecraft')
            .addChoice('Hunter', 'hunter')
            .addChoice('Construction', 'construction')
            .addChoice('All Clues', 'clueall')
            .addChoice('Beginner Clues', 'cluebeginner')
            .addChoice('Easy Clues', 'clueeasy')
            .addChoice('Medium Clues', 'cluemedium')
            .addChoice('Hard Clues', 'cluehard')
            .addChoice('Elite Clues', 'clueelite')
            .addChoice('Master Clues', 'cluemaster')
            .addChoice('Last man standing', 'lms')
            .addChoice('Abyssal Sire', 'sire')
            .addChoice('Alchemical Hydra', 'hydra')
            .addChoice('Barrows', 'barrows')
            .addChoice('Bryophyta', 'bryophyta')
            .addChoice('Callisto', 'callisto')
            .addChoice('Cerberus', 'cerberus')
            .addChoice('Chambers of Xeric', 'cox')
            .addChoice('Chambers of Xeric Challange mode', 'coxcm')
            .addChoice('Chaos Elemental', 'chaoselemental')
            .addChoice('Chaos Fanatic', 'chaosfanatic')
            .addChoice('Commander Zilyana', 'commanderzilyana')
            .addChoice('Corporeal Beast', 'corporealbeast')
            .addChoice('Crazy Archaeologist', 'crazyarchaeologist')
            .addChoice('Dagannoth Prime', 'prime')
            .addChoice('Dagannoth Rex', 'rexbro')
            .addChoice('Dagannoth Supreme', 'supreme')
            .addChoice('Deranged Archaeologist', 'derangedarchaeologist')
            .addChoice('General Graardor', 'generalgraardor')
            .addChoice('Giant Mole', 'giantmole')
            .addChoice('Grotesque Guardians', 'grotesqueguardians')
            .addChoice('Hespori', 'hespori')
            .addChoice('Kalphite Queen', 'kq')
            .addChoice('King Black Dragon', 'kbd')
            .addChoice('Kraken', 'kraken')
            .addChoice('Kree Arra', 'kreearra')
            .addChoice('Krill Tsutsaroth', 'kriltsutsaroth')
            .addChoice('Mimic', 'mimic')
            .addChoice('Obor', 'obor')
            .addChoice('Sarachnis', 'sarachnis')
            .addChoice('Scorpia', 'scorpia')
            .addChoice('Skotizo', 'skotizo')
            .addChoice('The Gauntlet', 'gauntlet')
            .addChoice('Corrupted Gauntlet', 'gauntlethard')
            .addChoice('Theatre of Blood', 'tob')
            .addChoice('Thermonuclear Smoke Devil', 'smokedevil')
            .addChoice('TzKal-Zuk', 'zuk')
            .addChoice('TzTok-Jad', 'jad')
            .addChoice('Venenatis', 'venenatis')
            .addChoice('Vetion', 'vetion')
            .addChoice('Vorkath', 'vorkath')
            .addChoice('Wintertodt', 'wintertodt')
            .addChoice('Zalcano', 'zalcano')
            .addChoice('Zulrah', 'zulrah')
            .addChoice('Nightmare', 'nightmare')
            .addChoice('Soul Wars Zeal', 'zeal')
            .addChoice('Tempoross', 'tempoross')
            .addChoice('Theatre of Blood Hard Mode', 'tobcm')
            .addChoice('Bounty Hunter - Hunter', 'bhh')
            .addChoice('Bounty Hunter - Rogue', 'bhr')
            .addChoice('Phosanis Nightmare', 'phosanis')),
	async execute(interaction) {
        const category = interaction.options.getString('category');
        try {
            fetch(`https://templeosrs.com/api/skill_hiscores.php?group=${groupID}&skill=${category}&count=10`)
            .then(response => response.json())
            .then(data => {
                let string = "";
                for (var key in data.data.players) {
                    if (data.data.players.hasOwnProperty(key)) {
                        string += `**${data.data.players[key].username}**: `;
                        string += numberWithCommas(data.data.players[key].xp) + "\n";
                    }
                }
                const resultEmbed = new MessageEmbed()
                    .setColor('#ffa500')
                    .setTitle(`${data.data.skill} highscores`)
                    .setURL(`https://templeosrs.com/hiscores/skills.php?skill=${data.data.skill}&group=${groupID}`)
                    .setDescription(string)
                    .setThumbnail('https://pbs.twimg.com/profile_images/856908701659267072/_FlgMC0N_400x400.jpg')
                    .setTimestamp();
                
                interaction.reply({ embeds: [resultEmbed] })
            })
        } catch (error){
            console.log(error);
            interaction.reply(`Oops something went wrong!`);
        }
	}
};

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}