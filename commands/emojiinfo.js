const { SlashCommandBuilder, Attachment } = require('discord.js');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js")


module.exports = {
    data: new SlashCommandBuilder()
        .setName("emojiinfo")
        .setDescription("Returns some info about the selected emoji")
        .addStringOption(option => 
            option.setName("emoji").setDescription("input an valid emoji").setRequired(true)),

    async execute(interaction)  {
        const emojiRegExp = new RegExp(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/, "gm");
        const emojiMatches = interaction.options.getString("emoji").match(emojiRegExp);
        
        if (emojiMatches) {
            const emojiID = emojiMatches[0].replace(/(<a:|<:|[a-z]*[0-9]*_*-*:|>)/gmi, "")
            
            let emojiType;
            if (emojiMatches[0].startsWith("<a:")) {
             emojiType = "gif";
            } else emojiType = "png";

            const embed = new EmbedBuilder()
            .setTitle("Emoji Info")
            .setDescription(`ID: ${emojiID}\nType: ${emojiType}`)
            .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp()
            .setImage(`https://cdn.discordapp.com/emojis/${emojiID}.${emojiType}`)
            .setColor("00FFFF")

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                    .setCustomId("stealemoji")
                    .setLabel("Steal")
                    .setStyle("Primary"),
                )
            
            const interactablemessage = await interaction.reply({ embeds: [ embed ], components: [ row ], fetchReply: true })

            const filter = (i) => i.user.id === interaction.user.id;
            const collector = interactablemessage.createMessageComponentCollector({
              filter,
              time: 60000,
            });  
        
            collector.on("collect", async (i) => {
              if (i.customId === "stealemoji") {

                if (!interaction.guild.members.me.permissions.has("MANAGE_EMOJIS_AND_STICKERS"))    {
                    return i.reply({ content: "I dont own perms to use this command here!"})
                }

                if (!interaction.member.permissions.has("MANAGE_EMOJIS_AND_STICKERS"))   {
                    return i.reply({ content: "You dont own required perms to add emojis!", ephemeral: true})
                }
                
                i.guild.emojis.create({ attachment: `https://cdn.discordapp.com/emojis/${emojiID}.${emojiType}`, name: `emoji${interaction.guild.emojis.cache.size}`})
                .then((emoji) => {
                    i.reply({ content: "Successfully added emoji!"})
                })
                .catch((error) =>{
                    return i.reply({ content: "Something went wrong. U might already reached the maximal amount of emojis.", ephemeral: true})
                })
                

                }
              }
           );

        } else return interaction.reply({ content: "please input a valid emoji"});
    }
}