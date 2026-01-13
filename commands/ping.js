
const { ActionRowBuilder, ButtonBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setCustomId("ping")
            .setLabel("Ping!")
            .setStyle("Primary"),
        );
        const interactableMessage = await interaction.reply({ content: `Pong!`, components: [row], fetchReply: true});

        const filter = (i) => i.user.id === interaction.user.id;
    const collector = interactableMessage.createMessageComponentCollector({
      filter,
      time: 60000,
    });  

    collector.on("collect", async (i) => {
      if (i.customId === "ping") {
        return i.reply({content: `🏓Latency is ${Date.now() - i.message.createdTimestamp}ms. API Latency is ${Math.round(i.client.ws.ping)}ms`, fetchReply: true});
      }
   });
    },
}; 