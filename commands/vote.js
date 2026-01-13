const { ActionRowBuilder, ButtonBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("vote")
        .setDescription("Vote for 420 :)"),
    async execute(interaction)  {
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel("Vote")
            .setEmoji("🍃")
            .setStyle("Link")
            .setURL("https://top.gg/bot/985093767008780298/vote")
        )

        interaction.reply({content: "Be cool and vote for me :)", components: [row]})
    }
}