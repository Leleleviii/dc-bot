const { SlashCommandBuilder } = require('discord.js');
const { EmbedBuilder, User } = require("discord.js");
const UserSettings = require("../models/UserSettings");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("give")
        .setDescription("Give some leaf to the selected user")
        .addUserOption(option =>
            option.setName("user").setDescription("Choose a user").setRequired(true))
        .addIntegerOption(option =>
            option.setName("amount").setDescription("how much leaf u want to give?").setRequired(true)),
    async execute(interaction)  {
        const user = interaction.options.getUser("user")
        const amount = interaction.options.getInteger("amount")

        const embed = new EmbedBuilder()
        .setTitle("Done")
        .setDescription(`:leaves: | You successfully gave ${amount} leaf to ${user.username}`)
        .setColor("00FFFF")
        .setThumbnail(interaction.user.displayAvatarURL({dynamic:true}))
        .setTimestamp()

        const selectedUserSettings = await UserSettings.findOne({user_id: user.id})
        const usingUserSettings = await UserSettings.findOne({user_id: interaction.user.id})

        if(!usingUserSettings)  {
            return interaction.reply("You arent registered yet. Claim your first daily to continue... (`/daily`)")
        } else if(usingUserSettings.user_leaf < amount)  {
            return interaction.reply("You dont own this amount...")
        }

        if(!selectedUserSettings)   {
            return interaction.reply("The selected user isnt registered yet")
        }

        UserSettings.findOne({user_id: interaction.user.id}, (err, settings) => {
            if(err) {
                console.log(err)
                return interaction.reply("An unexpected error occured")
            }
            if(!settings)   {
                return interaction.reply("You arent registered yet. Run `/daily` to continue")
                
            } else  {
                settings.user_leaf = settings.user_leaf - amount
            }
            settings.save(err =>    {
                if (err)    {
                    console.log(err)
                    return interaction.reply("An unexpected error occurred")
                }
            })
        } )

        UserSettings.findOne({user_id: user.id}, (err, settings) => {
            if(err) {
                console.log(err)
                return interaction.reply("An unexpected error occured")
            }
            if(!settings)   {
                return interaction.reply("The selected user isnt registered yet.")
                
            } else  {
                settings.user_leaf = settings.user_leaf + amount
            }
            settings.save(err =>    {
                if (err)    {
                    console.log(err)
                    return interaction.reply("An unexpected error occurred")
                }

                interaction.reply({ embeds: [embed]})
            })
        } )

    }
}