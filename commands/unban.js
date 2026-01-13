
const { EmbedBuilder, Guild, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unban")
        .setDescription("unban a user")
        .addUserOption(option => 
            option.setName("id").setDescription("input the id of a banned user to unban").setRequired(true)),
    async execute(interaction)  {
        const user = interaction.options.getUser("id")
        const embed = new EmbedBuilder()
        .setTitle(`${user.username} is now unbanned!`)
        .setDescription(`Unbanned by ${interaction.user.username}`)
        .setColor("00FFFF")
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()

        if (!interaction.member.permissions.has("BAN_MEMBERS")) { 
            return interaction.reply({ content: "You dont own required perms", ephemeral: true})};

        interaction.guild.members.unban(user)
        await interaction.reply({ embeds: [ embed ]})

    }
}