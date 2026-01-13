const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { MessageEmbed } = require("discord.js");
const UserSettings = require("../models/UserSettings");
const embedbuilder = require('./embedbuilder');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("balance")
        .setDescription("Returns your/choosen users inventory")
        .addUserOption(option =>
            option.setName("user").setDescription("leave empty to see your own balance")),

    async execute(interaction)      {
        const user = interaction.options.getUser("user") || interaction.user
        UserSettings.findOne({user_id: user.id}, (err, settings) => {
            if(err) {
                console.log(err)
                return interaction.reply("An unexpected error occured")
            }
            if(!settings)   {
                return interaction.reply("You / the mentioned user arent registered yet. Claim your first daily to continue (`/daily`)")
            } else  {
                const embed = new EmbedBuilder()
                .setTitle(`${user.username}s balance`)
                .setColor("00FFFF")
                .setThumbnail(user.displayAvatarURL({dynamic:true}))
                .setDescription(`:leaves: | Proud owner of ${settings.user_leaf} leafs\n\n🐓 | Chicken: ${settings.user_chicken || "none"} `)

                return  interaction.reply({ embeds: [embed]})
            }
            
               
            
        } )

    }
}