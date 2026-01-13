
const { EmbedBuilder, SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("unlockchannel")
        .setDescription("Unlock the selected or current channel")
        .addChannelOption(option =>
            option.setName("channel").setDescription("leave empty to unlock the current channel")),

    async execute(interaction)  {
        const channel = interaction.options.getChannel("channel") || interaction.channel
        const embed = new EmbedBuilder()
        .setTitle(`${channel.name} has been unlocked!`)
        .setDescription(`Unlocked by <@${interaction.user.id}>`)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
        .setFooter({text: "Run `/lockchannel` to lock it again"})
        .setColor("00FFFF")
        .setTimestamp()

        if (!interaction.member.permissions.has("MANAGE_CHANNELS"))  {
            return interaction.reply({ content: "You dont own required permissions to use this command here!", ephemeral: true})
        }
        channel.permissionOverwrites.edit(
            interaction.guild.id,
            { SendMessages: true},
            `${interaction.user.tag} | command /unlockchannel`
        )
        return interaction.reply({ embeds: [ embed ]})
    }

}