const { SlashCommandBuilder } = require('discord.js');
const { Tags } = require('../global.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addtag')
        .setDescription('Add a tag')
        .addStringOption(option => option.setName('name').setDescription('The name of the tag.').setRequired(true))
        .addStringOption(option => option.setName('description').setDescription('Tag description').setRequired(true)),
        async execute(interaction) {

            const { commandName } = interaction;

            if (commandName === 'addtag') {
                const tagName = interaction.options.getString('name');
                const tagDescription = interaction.options.getString('description');

                try {
                    const tag = await Tags.create({
                        name: tagName,
                        description: tagDescription,
                        username: interaction.user.username,
                    });

                    return interaction.reply(`Tag ${tag.name} added.`);
                }
                catch (error) {
                    if (error.name === 'SequelizeUniqueConstraintError') {
                        return interaction.reply('That tag already exists.');
                    }

                    return interaction.reply('Something went wrong with adding a tag.');
                }
            }
        },
    };