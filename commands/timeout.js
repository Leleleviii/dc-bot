
const { EmbedBuilder, SlashCommandBuilder, Embed } = require("discord.js")
const ms = require("ms")
const embedbuilder = require("./embedbuilder")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("timeout")
        .setDescription("Timeout the selected user")
        .addUserOption(option =>
            option.setName("user").setDescription("Select the user to timeout").setRequired(true))
        .addStringOption(option =>
            option.setName("time").setDescription("For how long?").setRequired(true))
        .addStringOption(option =>
            option.setName("reason").setDescription("For what?")),

    async execute(interaction)  {
        const user = interaction.options.getMember("user")
        const time = interaction.options.getString("time")
        const reason = interaction.options.getString("reason")

        const embed = new EmbedBuilder()
        .setColor("00FFFF")
        .setTitle(`${user.user.username} is now Timeouted!`)
        .setDescription(`Time: ${time}\nReason: "${reason}"`)
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .setTimestamp()


        
        if ( isNaN(ms(time)) )
        return interaction.reply({ content: "Please input a valid time", ephemeral: true});

        if (interaction.user.id =! "797895566691794966") { 
            return interaction.reply({ content: "You dont own required perms", ephemeral: true})};
        
        
        user.timeout(ms(time), reason)
        await interaction.reply({ embeds: [ embed ]})

    }
}