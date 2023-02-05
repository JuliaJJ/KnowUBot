const { SlashCommandBuilder } = require('discord.js');
const { Tags } = require('../global.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('edittag')
        .setDescription('Edit a tag')
        .addStringOption(option => option.setName('name').setDescription('The name of the tag.').setRequired(true))
        .addStringOption(option => option.setName('description').setDescription('Tag description').setRequired(true)),
        async execute(interaction) {

            const { commandName } = interaction;

            if (commandName === 'edittag') {
                const tagName = interaction.options.getString('name');
                const tagDescription = interaction.options.getString('description');

                const affectedRows = await Tags.update({ description: tagDescription }, { where: { name: tagName } });

                if (affectedRows > 0) {
                    return interaction.reply(`Tag ${tagName} was edited.`);
                }

                return interaction.reply(`Could not find a tag: ${tagName}.`);
            }
        },
    };