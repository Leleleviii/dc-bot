const { SlashCommandBuilder } = require('discord.js');
const { Snake } = require("leaf-utils")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("snake")
        .setDescription("Snake game"),

    async execute(interation)    {
        new Snake({
            message: interation,
            slash_command: true,
            snake: {
                head: '🟢',
                body: '🟩',
                tail: '🟩',
                over: '💀'
            },
            emojis: {
                board: '⬛',
                food: '🍎',
                up: '⬆️',
                right: '➡️',
                down: '⬇️',
                left: '⬅️',
            },
            foods: ['🍎', '🍇', '🍊', '🍕', '🥕', '🥞'],
            stopButton: {
                stopLabel: 'Stop',
                stopStyle: 'DANGER',
            },
            authorOnly: 'Only {{author}} can use these buttons',
        }).startGame().catch((error) => {
            return interation.reply({content: "Sorry. Something went wrong.", ephemeral: true})
        })
    }



}