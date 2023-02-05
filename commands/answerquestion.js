const { SlashCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');
const { Answers, Questions } = require('../global.js');
const Sequelize = require('sequelize');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('answerquestion')
        .setDescription('Answer question knowledge base'),

        async execute(interaction) {

            const { commandName } = interaction;

            if (commandName === 'answerquestion') {

                const randomRow = await Questions.findOne({ order: Sequelize.literal('rand()') });
                const question = randomRow.get('question');
                const nonce = Date.now();

                const modal = new ModalBuilder()
                    .setCustomId(`answerQuestion-${nonce}`)
                    .setTitle('Answer a Question');

                const answerInput = new TextInputBuilder()
                    .setCustomId('answerInput')
                    .setLabel(question)
                    .setStyle(TextInputStyle.Short);

                const actionRow = new ActionRowBuilder().addComponents(answerInput);

                modal.addComponents(actionRow);

                await interaction.showModal(modal);

                const filter = i => {
 //                   i.deferUpdate();
                    if (i.customId !== `answerQuestion-${nonce}`) return false;
                    if (i.user.id !== interaction.user.id) return false;
                    return true;
                };

                try {
                    const answer = await interaction.awaitModalSubmit({ filter, time: 60000 });
                    const newAnswer = await Answers.create({
                        question: question,
                        answer: answer.fields.getTextInputValue('answerInput'),
                        user_id: interaction.user.id,
                    });

                    return answer.reply(`Your answer, "${newAnswer.question}", has been added.`);
                }
                catch (error) {
                    console.log(error);
                    if (error.name === 'SequelizeUniqueConstraintError') {
                        return interaction.reply('That answer already exists.');
                    }
                    if (error.code === 'InteractionCollectorError') {
                        interaction.followUp({ content: 'Modal not submitted.', ephemeral: true });
                    }

                    return interaction.reply('Something went wrong with adding an answer.');
                }
            }
        },
    };