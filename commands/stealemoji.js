const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("steal")
        .setDescription("steal a emoji from another server")
        .addStringOption(option =>
            option.setName("emoji").setDescription("input the emojii to steal").setRequired(true))
        .addStringOption(option =>
            option.setName("name").setDescription("input a name for the emoji").setRequired(true)),
    async execute(interaction)  {
        const emojiRegExp = new RegExp(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/, "gm");
        const emojiMatches = interaction.options.getString("emoji").match(emojiRegExp);
        const emojiName = interaction.options.getString("name");
        
        if (!interaction.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS")) { 
            return interaction.reply({ content: "You dont own required perms", ephemeral: true})};


        if (emojiMatches) {
            const emojiID = emojiMatches[0].replace(/(<a:|<:|[a-z]*[0-9]*_*-*:|>)/gmi, "")
            
            let emojiType;
            if (emojiMatches[0].startsWith("<a:")) {
             emojiType = "gif";
            } else emojiType = "png";

            interaction.guild.emojis.create({ attachment: `https://cdn.discordapp.com/emojis/${emojiID}.${emojiType}`, name: emojiName })
                .then((emoji) => {
                    interaction.reply({ content: "Successfully added emoji!"})
                })
                .catch((error) =>{
                    return interaction.reply({ content: "Something went wrong. U might already reached the maximal amount of emojis.", ephemeral: true})
                })

        } else return interaction.reply({ content: "please input a valid emoji / name"});
    }
}