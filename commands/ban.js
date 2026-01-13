const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { MessageEmbed } = require("discord.js");



module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("ban a user")
        .addUserOption(option =>
            option.setName("user").setDescription("select a user to ban").setRequired(true))
        .addStringOption(option =>
            option.setName("reason").setDescription("for what?")),

    async execute(interaction)  {
        const user = interaction.options.getMember("user")
        const reason = interaction.options.getString("reason")

        const embed = new EmbedBuilder()
        .setColor("00FFFF")
        .setTitle(`${user.user.username} is now Banned!`)
        .setDescription(`Reason: "${reason}"`)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()

        if (!user.bannable)
        return interaction.reply({ content: "Something is stopping me from banning them", ephemeral: true });
        

        if (!interaction.member.permissions.has("BAN_MEMBERS")) { 
            return interaction.reply({ content: "You dont own required perms", ephemeral: true})};
        
        if (user.roles.highest.position >= interaction.member.roles.highest.position)
        return interaction.reply({
              content: `You do not have permission to ban ${user.user.tag}.`,
              ephemeral: true
            });
        user.send({ content: `You have been banned in ${interaction.guild.name} for "${reason}"`})
        user.ban({ reason: `${reason}`})
        await interaction.reply({ embeds: [ embed ]})

        
    }
}