
const { Permissions, SlashCommandBuilder } = require("discord.js")
const GuildSettings = require("../models/GuildSettings")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setwelcomemessage")
        .setDescription("Choose the welcome message")
        .addStringOption(option =>
            option.setName("message").setDescription("Input a kind message to welcome new members").setRequired(true)),
    async execute(interaction)  {
        const message = interaction.options.getString("message")
        
        if(!interaction.member.permissions.has("Administrator"))  {
            return interaction.reply({content: "You need Administrator permissions to use this command!", ephemeral: true})
        }

        GuildSettings.findOne({guild_id: interaction.guild.id}, (err, settings) =>  {
            if (err)    {
                console.log(err)
                return interaction.reply("An unexpected error occured")
            }
            if (!settings)  {
                settings = new GuildSettings({
                    guild_id: interaction.guild.id,
                    welcome_message: message
                })
            }   else    {
                settings.welcome_message = message;
            }

            settings.save(err =>    {
                if (err)    {
                    console.log(err)
                    return interaction.reply("An unexpected error occurred")
                }

                interaction.reply(`Welcome message has been set to "${message}"!`)
            })
        })
    }
}