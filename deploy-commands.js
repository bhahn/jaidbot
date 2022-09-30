const { REST, SlashCommandBuilder, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('2sday').setDescription('Explains how First to 2sday works'),
	new SlashCommandBuilder().setName('2sday_poll').setDescription('Creates a game poll for First to 2sday'),
	new SlashCommandBuilder().setName('2sday_pick').setDescription('Picks a game from the list for First to 2sday')
]
	.map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then((data) => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);