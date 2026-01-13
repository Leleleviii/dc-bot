const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const UserSettings = require("../models/UserSettings")
const ms = require("ms");
const { MessageEmbed, User } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Claim your daily leafs"),

    async execute(interaction)  {
        
        const embed = new EmbedBuilder()
        .setTitle("Daily")
        .setDescription(":leaves: | You successfully claimed your daily reward of 420 leafs!")
        .setColor("00FFFF")
        .setTimestamp()

        UserSettings.findOne({user_id: interaction.user.id}, (err, settings) => {
                if(err) {
                    console.log(err)
                    return interaction.reply("An unexpected error occured")
                }
                if(!settings)   {
                    settings = new UserSettings({
                        user_id: interaction.user.id,
                        user_leaf: 420,
                        daily_cooldown: Date.now() + ms("24h")
                    })
                    console.log(`Yay! New user "${interaction.user.username}" registered`)
                    
                } else  {
                    const cooldownOver = settings.daily_cooldown
                    
                    if (Date.parse(cooldownOver) < Date.parse(new Date()))  {
                    settings.user_leaf = settings.user_leaf + 420
                    settings.daily_cooldown = Date.now() + ms("24h")
                    } else  {
                        return interaction.reply(`You are currently on cooldown for claiming your daily!`)
                    }
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