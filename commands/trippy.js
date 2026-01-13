const { SlashCommandBuilder } = require('discord.js');
const deepai = require("deepai")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("trippy")
        .setDescription("Returns the edited image")
        .addAttachmentOption( option => 
            option.setName("image")
                .setDescription("input a image")
                .setRequired(true)),

    async execute(interaction) {   
        interaction.deferReply()
        deepai.setApiKey('35b0e721-3308-445a-a159-2be28647d9ca');
        const action = await interaction.options; 
        var resp = await deepai.callStandardApi("deepdream",{
            image: action.getAttachment("image").url
        })
        interaction.editReply({ content: resp.output_url})
    }
}
