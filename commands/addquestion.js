const { SlashCommandBuilder } = require('discord.js');
const { Questions } = require('../global.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('addquestion')
        .setDescription('Add a question to knowledge base')
        .addStringOption(option => option.setName('question').setDescription('Question').setRequired(true))
        .addStringOption(option =>
            option.setName('category')
                .setDescription('Category')
                .setRequired(true)
                .addChoices(
                    { name: 'Basics', value: 'basics' },
                    { name: 'Entertainment', value: 'entertainment' },
                    { name: 'Family', value: 'family' },
                    { name: 'Travel', value: 'travel' },
                    { name: 'Values', value: 'values' },
                    { name: 'Work and Hobbies', value: 'work_and_hobbies' },
                )),
        async execute(interaction) {

            const { commandName } = interaction;

            if (commandName === 'addquestion') {
                const question = interaction.options.getString('question');
                const category = interaction.options.getString('category');

                try {
                    const newQuestion = await Questions.create({
                        question: question,
                        category: category,
                        user_id: interaction.user.id,
                    });

                    return interaction.reply(`Question "${newQuestion.question}" added.`);
                }
                catch (error) {
                    console.log(error);
                    if (error.name === 'SequelizeUniqueConstraintError') {
                        return interaction.reply('That question already exists.');
                    }

                    return interaction.reply('Something went wrong with adding a question.');
                }
            }
        },
    };