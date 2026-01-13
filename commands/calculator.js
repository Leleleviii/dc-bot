const { SlashCommandBuilder } = require('discord.js');
const { evaluate } = require("mathjs");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("calculator")
        .setDescription("Solve ur maths with me")
        .addStringOption(option =>
            option.setName("input").setDescription("input the maths").setRequired(true)),
    
    async execute(interaction)  {
        const rechnung = interaction.options.getString("input")
    
        try {
            solution = evaluate(rechnung)
        } catch (error) {
            return interaction.reply("I werent able to calculate this one")
        }

        return interaction.reply(`${rechnung}\`\`\` ${solution} \`\`\``)

    }
}