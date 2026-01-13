const { SlashCommandBuilder } = require('discord.js');
const { ModalBuilder, TextInputBuilder, ActionRowBuilder, EmbedBuilder } = require("discord.js");
const isColor = require("is-color")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("embedbuilder")
        .setDescription("Build ur own embed"),

    async execute(interaction)  {
        const modal = new ModalBuilder()
            .setCustomId("embedbuildermodal")
            .setTitle("Embed Builder")
        const titleinput = new TextInputBuilder()
            .setCustomId("titleinput")
            .setLabel("Title")
            .setStyle("Short")
            .setRequired(false)
        const descriptioninput = new TextInputBuilder()
            .setCustomId("descriptioninput")
            .setLabel("Description")
            .setStyle("Paragraph")
            .setRequired(false)
        const thumbnailinput = new TextInputBuilder()
            .setCustomId("thumbnailinput")
            .setLabel("Thumbnail-URL")
            .setStyle("Paragraph")
            .setRequired(false)
        const imageinput = new TextInputBuilder()
            .setCustomId("imageinput")
            .setLabel("Image-URL")
            .setStyle("Paragraph")
            .setRequired(false)
        const colorinput = new TextInputBuilder()
            .setCustomId("colorinput")
            .setLabel("Color Hexcode")
            .setStyle("Short")
            .setRequired(false)
        
        const title = new ActionRowBuilder().addComponents(titleinput)
        const description = new ActionRowBuilder().addComponents(descriptioninput)
        const thumbnail = new ActionRowBuilder().addComponents(thumbnailinput)
        const image = new ActionRowBuilder().addComponents(imageinput)
        const color = new ActionRowBuilder().addComponents(colorinput);
        
        modal.addComponents(title, description, thumbnail, image, color)

        await interaction.showModal(modal)

        const submitted = await interaction.awaitModalSubmit({
            time: 360000000,
            filter: i => i.user.id === interaction.user.id,
          }).catch(error => {
                console.log(error)
                return null
          });
          
        if (submitted) {
            const imageRegExp = new RegExp(/(http)?s?:?(\/\/[^"']*\.(?:png|jpg|jpeg|gif|png|svg))/, "" )
            
            const vtitle = submitted.fields.getTextInputValue("titleinput") || ""
            const vdescription = submitted.fields.getTextInputValue("descriptioninput") || ""
            const vthumbnail = submitted.fields.getTextInputValue("thumbnailinput").match(imageRegExp) || "none"
            const vimage = submitted.fields.getTextInputValue("imageinput").match(imageRegExp) || "none"
            const vcolor = submitted.fields.getTextInputValue("colorinput")

            let tvcolor;
            if(vcolor.startsWith("#"))  {
                tvcolor = vcolor
            }   else {
                tvcolor = `#${vcolor}`
            }

            if(isColor(tvcolor) === false)  {
                tvcolor = "00FFFF"
            }

            let tvthumbnail;
            if(!vthumbnail) {
                    tvthumbnail = ""
            } else {
                    tvthumbnail = submitted.fields.getTextInputValue("thumbnailinput")
            }

            let tvimage;
            if(!vimage) {
                    tvimage = ""
            } else  {
                    tvimage =  submitted.fields.getTextInputValue("imageinput")
            }
            const embed = new EmbedBuilder()
                .setTitle(`${vtitle}`)
                .setDescription(`${vdescription}`)
                .setThumbnail(`${tvthumbnail}`)
                .setImage(`${tvimage}`)
                .setColor(`${tvcolor}`)

            await submitted.reply({embeds: [embed]}).catch((error) =>   {
                return submitted.reply("something went wrong!")
            }
            )
        }
    }
}