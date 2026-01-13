
const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("kick")
        .setDescription("Kick someone from this server")
        .addUserOption(option =>
            option.setName("user").setDescription("input a user to kick").setRequired(true))
        .addStringOption(option =>
            option.setName("reason").setDescription("for what?")),
    async execute(interaction)  {
        const user = interaction.options.getMember("user")
        const reason = interaction.options.getString("reason") || "No reason provided!"
        
        const embed = new EmbedBuilder()
        .setColor("00FFFF")
        .setTitle(`${user.user.username} is now kicked!`)
        .setDescription(`Reason: "${reason}"\nKicked by ${interaction.user.username}`)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()

        if (!user.kickable)
            return interaction.reply({ content: "Something is stopping me from kicking them", ephemeral: true });

        if (!interaction.member.permissions.has("KICK_MEMBERS")) { 
            return interaction.reply({ content: "You dont own required perms", ephemeral: true})};
        
        if (user.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({
              content: `You do not have permission to kick ${user.user.tag}.`,
              ephemeral: true
            });
        user.send({ content: `You have been kicked from ${interaction.guild.name} for "${reason}"`})
        user.kick({ reason: `${reason}`})
        await interaction.reply({ embeds: [ embed ]})
    }
}