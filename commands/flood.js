const { SlashCommandBuilder } = require('discord.js');
const { Flood } = require("leaf-utils");
const { execute } = require("./serverinfo");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("flood")
        .setDescription("flood game")
        .addIntegerOption(option => option.setName("difficulty").setDescription("Choose the difficulty").addChoices(
            {
                name: "easy",
                value: 7
            },
            {
                name: "medium",
                value: 9
            },
            {
                name: "hard",
                value: 11
            },
            {
                name: "impossible",
                value: 13
            }
        )),
    async execute(interaction, client, args) {

            await Flood({
                message: interaction,
                slash_command: true,
                time: 300000,
                difficulty: interaction.options.getInteger('difficulty'),
                embed: {
                    title: 'Flood',
                    color: '#FFAE0E'
                },
                emojis: {
                    redsquare: '🟥',
                    bluesquare: '🟦',
                    yellowsquare: '🟨',
                    greensquare: '🟩',
                    purplesquare: '🟪',
                    style: 'SECONDARY',
                },
                authorOnly: 'Only <@{{author}}> can use these buttons!',
            })
        },
    
    }