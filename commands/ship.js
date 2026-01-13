
const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("ship")
        .setDescription("Ship two users <3")
        .addUserOption(option =>
            option.setName("user1").setDescription("Select the first user").setRequired(true))
        .addUserOption(option =>
            option.setName("user2").setDescription("Select the second user").setRequired(true)),

    async execute(interaction)  {
        const user1 = interaction.options.getUser("user1")
        const user2 = interaction.options.getUser("user2")

        const embed = new EmbedBuilder()
        .setTitle(`💕 ${Math.floor(Math.random() * 101)}% 💕 `)
        .setDescription(`*${user1.username} x ${user2.username}*`)
        .setThumbnail(user2.displayAvatarURL({ dynamic: true }))
        .setImage(user1.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor("00FFFF")

        interaction.reply({embeds: [embed]})
    }
}