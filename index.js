const fs = require('node:fs');
const path = require('node:path');
const Database = require("./config/database")
const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { token, error_channel_id } = require('./config.json');
const { isArgumentsObject } = require('node:util/types');
const { stripIndents } = require("common-tags")

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildVoiceStates]});
require("./handler/eventhandler")(client);
client.queue = new Map();

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

//DATABASE:
const db = new Database();

db.connect();


client.once('ready', () => {
	console.log(`Ready on ${client.guilds.cache.size} guilds!`);
});


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	
	await command.execute(interaction, client);
	
});

client.login(token);

process.on("unhandledRejection", (error) => {
	const errorContent = stripIndents`**__Client Error__**
	
	**${error.name}** --- \`${error.message}\`
	
	**Stack**: \`\`\`\n${error.stack}\`\`\``;
  
	console.error("(|-+-|)Unhandled Promise Rejection(|-+-|)", error);
	client.channels.cache
	  .get(error_channel_id)
	  ?.send({ content: errorContent });
  });
  
  process.on("uncaughtException", (error) => {
	const errorContent = stripIndents`**__Client Error__**
	
	**${error.name}** --- \`${error.message}\`
	
	**Stack**: \`\`\`\n${error.stack}\`\`\``;
  
	console.error("(|-+-|)Uncaught Exception(|-+-|)", error);
	client.channels.cache
	  .get(error_channel_id)
	  ?.send({ content: errorContent });
  })
