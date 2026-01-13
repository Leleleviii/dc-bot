const { SlashCommandBuilder } = require('discord.js');
const akinator = require("discord.js-akinator")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("akinator")
        .setDescription("let me guess the character you are looking for"),
    
    async execute(interaction)  {
        akinator(interaction, {
            language: "en",
            childMode: false,
            gameType: "character",
            useButtons: true,
            embedColor: "Aqua"
        });
    }
}