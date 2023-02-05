const { SlashCommandBuilder } = require('discord.js');
const { Tags } = require('../global.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tag')
        .setDescription('Fetch a tag')
        .addStringOption(option => option.setName('name').setDescription('The name of the tag.').setRequired(true)),
        async execute(interaction) {

            const { commandName } = interaction;

            if (commandName === 'tag') {
                const tagName = interaction.options.getString('name');

                const tag = await Tags.findOne({ where: { name: tagName } });

                if (tag) {
                    tag.increment('usage_count');

                    return interaction.reply(tag.get('description'));
                }

                return interaction.reply(`Could not find tag: ${tagName}`);
            }
        },
    };