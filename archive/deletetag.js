const { SlashCommandBuilder } = require('discord.js');
const { Tags } = require('../global.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('deletetag')
        .setDescription('Delete tag')
        .addStringOption(option => option.setName('name').setDescription('The name of the tag.').setRequired(true)),
        async execute(interaction) {

            const { commandName } = interaction;

            if (commandName === 'deletetag') {
                const tagName = interaction.options.getString('name');

                const rowCount = await Tags.destroy({ where: { name: tagName } });

                if (!rowCount) return interaction.reply('That tag doesn\'t exist.');

                return interaction.reply('Tag deleted.');
            }
        },
    };