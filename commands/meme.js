const { SlashCommandBuilder } = require('discord.js');
const { Meme } = require('leaf-utils');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("meme")
        .setDescription("return some memes"),
    async execute(interaction)  {
        await Meme({
            message: interaction,
            slash_command: true,
            footer: true,
            time: 300000,
            label: {
                firstlabel: 'Next Meme',
                secondlabel: 'Stop',
            },
            emojis: {
                firstbutton: '↪️',
                secondbutton: '🛑',
            },
            colors: {
                firstbutton: 'PRIMARY',
                secondbutton: 'DANGER',
            },
            embedColor: 'RANDOM',
            authorOnly: 'Only <@{{author}}> can use these buttons!',
        })
}}