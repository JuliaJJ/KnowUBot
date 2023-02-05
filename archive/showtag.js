const { SlashCommandBuilder } = require('discord.js');
const { Tags } = require('../global.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('showtag')
        .setDescription('List all tags'),
        async execute(interaction) {

            const { commandName } = interaction;

            if (commandName === 'showtags') {
                const tagList = await Tags.findAll({ attributes: ['name'] });
                const tagString = tagList.map(t => t.name).join(', ') || 'No tags set.';

                return interaction.reply(`List of tags: ${tagString}`);
            }
        },
    };