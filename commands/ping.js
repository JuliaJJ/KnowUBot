const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with ping notification'),
	async execute(interaction) {
		await interaction.reply({ content: 'I have been pinged!', ephemeral: true });
	},
};
