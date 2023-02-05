const { SlashCommandBuilder } = require('discord.js');
const { Tags } = require('../global.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('taginfo')
        .setDescription('Display tag info')
        .addStringOption(option => option.setName('name').setDescription('The name of the tag.').setRequired(true)),
        async execute(interaction) {

            const { commandName } = interaction;

            if (commandName == 'taginfo') {
                const tagName = interaction.options.getString('name');

                const tag = await Tags.findOne({ where: { name: tagName } });

                if (tag) {
                    return interaction.reply(`${tagName} was created by ${tag.username} at ${tag.createdAt} and has been used ${tag.usage_count} times.`);
                }

                return interaction.reply(`Could not find tag: ${tagName}`);
            }
        },
    };