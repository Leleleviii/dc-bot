
const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const ms = require("ms")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("timestamp")
        .setDescription("create timestamps to copy")
        .addStringOption(option =>
            option.setName("time").setDescription("input the time").setRequired(true)),
    
    async execute(interaction)  {
        const time = interaction.options.getString("time")
        
        if(isNaN(ms(time))) {
            return interaction.reply({ content: "please input a valid time!"})
        }
        const tsF = `<t:${Math.floor((Date.now() + ms(time)) / 1000)}:F>`
        const tsf = `<t:${Math.floor((Date.now() + ms(time)) / 1000)}:f>`
        const tsD = `<t:${Math.floor((Date.now() + ms(time)) / 1000)}:D>`
        const tsd = `<t:${Math.floor((Date.now() + ms(time)) / 1000)}:d>`
        const tsT = `<t:${Math.floor((Date.now() + ms(time)) / 1000)}:T>`
        const tst = `<t:${Math.floor((Date.now() + ms(time)) / 1000)}:t>`
        const tsR = `<t:${Math.floor((Date.now() + ms(time)) / 1000)}:R>`

        const embed = new EmbedBuilder()
        .setTitle("Timestamps")
        .setDescription(`${tsF} | \`${tsF}\`\n${tsf} | \`${tsf}\`\n${tsD} | \`${tsD}\`\n${tsd} | \`${tsd}\`\n${tsT} | \`${tsT}\`\n${tst} | \`${tst}\`\n${tsR} | \`${tsR}\``)
        .setColor("00FFFF")

        await interaction.reply({embeds: [embed]})
    } 
}