
const { Permissions, SlashCommandBuilder } = require("discord.js")
const GuildSettings = require("../models/GuildSettings")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("setwelcomechannel")
        .setDescription("Choose the welcome channel")
        .addChannelOption(option =>
            option.setName("channel").setDescription("leave empty to clear channel")),
    async execute(interaction)  {
        const channel = interaction.options.getChannel("channel")?.id || ""
        
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
                    welcome_channel_id: channel
                })
            }   else    {
                settings.welcome_channel_id = channel;
            }

            settings.save(err =>    {
                if (err)    {
                    console.log(err)
                    return interaction.reply("An unexpected error occurred")
                }

                interaction.reply(`Welcome channel has been set to <#${channel}>!`)
            })
        })
    }
}