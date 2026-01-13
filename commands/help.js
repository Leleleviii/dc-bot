
const { ActionRowBuilder, StringSelectMenuBuilder, EmbedBuilder, Message, Emoji, SlashCommandBuilder, SelectMenuBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("List with all commands"),
    async execute(interaction, client) {
        const embed = new EmbedBuilder()
        .setColor("00FFFF")
        .setTitle("Help")
        .setDescription("Use the selectmenu to see all categories")
        .setThumbnail(client.user.avatarURL())
        .setTimestamp()
        const row = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("helpselect")
                .setPlaceholder("Categories")
                .setOptions([
                    {
                        label: "Moderation",
                        description: "List with all moderation commands",
                        value: "moderation",
                        emoji: "⚖️"
                    },
                    {
                        label: "Fun",
                        description: "List with all fun commands",
                        value: "fun",
                        emoji: "🥂"
                    },
                    {
                        label: "Utility",
                        description: "List with all utility commands",
                        value: "utility",
                        emoji: "🛠"
                    },
                    {
                        label: "Economy",
                        description: "List with all economy commands",
                        value: "economy",
                        emoji: "💰"
                    },
                ])
        );
        const interactableMessage = await interaction.reply({ embeds: [embed], components: [row], fetchReply: true });

        const filter = (i) => i.user.id === interaction.user.id;
        const collector = interactableMessage.createMessageComponentCollector({
        filter,
        });  

        collector.on("collect", async (i) => {
            
            if (i.customId === "helpselect") {

            if (i.values[0] === "moderation") {
                await i.deferUpdate()

                const moderationembed = new EmbedBuilder()
                .setTitle("Moderation Commands")
                .setDescription("`/ban` ; `/unban` ; `/timeout` ;\n`/lockchannel` ; `/unlockchannel` ; `/kick` ; ...")
                .setThumbnail(client.user.avatarURL())
                .setTimestamp()
                .setColor("00FFFF")

            await interaction.editReply({ embeds: [moderationembed]});
            }   else if (i.values[0] === "fun") {
                await i.deferUpdate()

                const funembed = new EmbedBuilder()
                .setTitle("Fun Commands")
                    .setDescription("`/trippy` ;  `/snake` ; `/flood` ;\n`/meme` ; `/speak`, ...")
                .setThumbnail(client.user.avatarURL())
                .setTimestamp()
                .setColor("00FFFF")

            await interaction.editReply({ embeds: [funembed]});
            }   else if (i.values[0] === "utility") {
                await i.deferUpdate()

                const utilityembed = new EmbedBuilder()
                .setTitle("Utility Commands")
                .setDescription("`/avatar` ; `/steal` ; `/serverinfo` ; \n`/userinfo` ; `/emojiinfo` ; `/embedbuilder`;\n`/timestamp`; ....")
                .setThumbnail(client.user.avatarURL())
                .setTimestamp()
                .setColor("00FFFF")

            await interaction.editReply({ embeds: [utilityembed]})
            }   else if (i.values[0] === "economy") {
                await i.deferUpdate()

                const funembed = new EmbedBuilder()
                .setTitle("Economy Commands")
                .setDescription("`/daily` ; `/balance` ; `/shop` ;\n `/chickenfight` ; `/give` ; ...")
                .setThumbnail(client.user.avatarURL())
                .setTimestamp()
                .setColor("00FFFF")

            await interaction.editReply({ embeds: [funembed]})
            }
        }   
      });
  }
};

        
    
    
    