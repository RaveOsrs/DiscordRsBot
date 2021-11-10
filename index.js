const fs = require("fs");
const {Client, Collection, Intents} = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],partials: ["CHANNEL"] });
var admin = require("firebase-admin");

var serviceAccount = require("./firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://rebornosrs-fb66f-default-rtdb.europe-west1.firebasedatabase.app"
});

const DB = admin.database();

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

client.once('ready', async () =>{
    console.log('RaveBot is online!');

	const Guilds = client.guilds.cache.map((guild) => guild); //Get guild info
	const all_fetchedCommands = await Guilds[0].commands.fetch();
	const addCommand = all_fetchedCommands.find(command => command.name === 'add');
	console.log(addCommand);
	const addCommandId = addCommand.permissions.commandId;

	const fullPermissions = [
		{
			id: addCommandId,
			permissions: [{
				id: '896434353394032651', //captiain role
				type: 'ROLE',
				permission: true,
			}],
		},
		{
			id: addCommandId,
			permissions: [{
				id: '894156856983969822', //leader role
				type: 'ROLE',
				permission: true,
			}]
		}
	];

	await Guilds[0].commands.permissions.set({ fullPermissions });
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

postrsnRequire = require('./postRsn.js');
namechangeRequire = require("./changeName.js");
//reactionrolesRequire = require("./reactionRoles.js");
templeactivitiesRequire = require("./templeActivities.js");
//forumappsRequire = require("./forumApps.js");
competitionRequire = require("./competition.js");

client.login(process.env.TOKEN);
