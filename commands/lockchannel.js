const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("lockchannel")
        .setDescription("Lock the selected or current channel")
        .addChannelOption(option =>
            option.setName("channel").setDescription("leave empty to lock the current channel")),

    async execute(interaction)  {
        const channel = interaction.options.getChannel("channel") || interaction.channel
        const embed = new EmbedBuilder()
        .setTitle(`${channel.name} has been locked!`)
        .setDescription(`Locked by <@${interaction.user.id}>`)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setFooter({text: "Run `/unlockchannel` to unlock it again"})
        .setColor("00FFFF")
        .setTimestamp()

        if (!interaction.member.permissions.has("MANAGE_CHANNELS"))  {
            return interaction.reply({ content: "You dont own required permissions to use this command here!", ephemeral: true})
        }
        channel.permissionOverwrites.edit(
            interaction.guild.id,
            { SendMessages: false},
            `${interaction.user.tag} | command /lock channel`
        )
        return interaction.reply({ embeds: [ embed ]})
    }

}