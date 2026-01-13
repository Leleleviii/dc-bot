const { SlashCommandBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder } = require('discord.js');
const { MessageEmbed, MessageActionRow, MessageButton, User } = require("discord.js");
const UserSettings = require("../models/UserSettings");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("chickenfight")
        .setDescription("Let your chicken fight"),
    
    async execute(interaction)  {
        const fightButton = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel("Fight!")
            .setCustomId("chickenfight")
            .setStyle("Danger")
            .setEmoji("⚔️")
        )

        const startEmbed = new EmbedBuilder()
        .setTitle("Chicken Fights")
        .setDescription("⚔️ | Do you want your chicken to fight?!\n\n*300 :leaves: reward if your chicken wins...*")
        .setColor("00FFFF")
        .setThumbnail(interaction.user.displayAvatarURL({dynamic:true}))

        const interactableMessage = await interaction.reply({embeds: [startEmbed], components: [fightButton], fetchReply: true})

        const filter = (i) => i.user.id === interaction.user.id;
        const collector = interactableMessage.createMessageComponentCollector({
          filter,
          time: 60000,
        });

        collector.on("collect", async (i) => {
            if(i.customId === "chickenfight")   {
                
                UserSettings.findOne({user_id: i.user.id}, (err, settings) => {
                    if(err) {
                        console.log(err)
                        return i.reply({content: "An unexpected error occurred!", fetchReply:true})
                    }
                    if(!settings)   {
                        return i.reply({content:"You arent registered yet. Claim your first daily to continue (`/daily`)", fetchReply:true})
                    } else {
                        if(settings.user_chicken === "common")  {
                            const commonChance = [0,0,0,1,1,1,1,1,1,1]
                            const commonRandom = commonChance[Math.floor(Math.random() * commonChance.length)]

                            if(commonRandom === 0)  {
                                const commonWinEmbed = new EmbedBuilder()
                                .setTitle("Won!")
                                .setDescription("🐔 | The reward of 300 leafs got delivered to your balance")
                                .setColor("00FFFF")
                                .setThumbnail(i.user.displayAvatarURL({dynamic:true}))

                                settings.user_leaf = settings.user_leaf + 300
                                i.reply({embeds: [commonWinEmbed], fetchReply:true})
                    } else {
                        const commonLoseEmbed = new EmbedBuilder()
                        .setTitle("Lost!")
                        .setDescription("🪦 | Your chicken unfortunately died...")
                        .setColor("00FFFF")
                        .setThumbnail(i.user.displayAvatarURL({dynamic:true}))

                        settings.user_chicken = "none"
                        i.reply({embeds: [commonLoseEmbed], fetchReply:true})
                    }
                } else if(settings.user_chicken === "rare") {
                    const rareChance = [0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1]
                    const rareRandom = rareChance[Math.floor(Math.random() * rareChance.length)]

                    if(rareRandom === 0)  {
                        const rareWinEmbed = new EmbedBuilder()
                        .setTitle("Won!")
                        .setDescription("🐔 | The reward of 300 leafs got delivered to your balance")
                        .setColor("00FFFF")
                        .setThumbnail(i.user.displayAvatarURL({dynamic:true}))

                        settings.user_leaf = settings.user_leaf + 300
                        i.reply({embeds: [rareWinEmbed], fetchReply:true})
                    } else {
                        const rareLoseEmbed = new EmbedBuilder()
                        .setTitle("Lost!")
                        .setDescription("🪦 | Your chicken unfortunately died...")
                        .setColor("00FFFF")
                        .setThumbnail(i.user.displayAvatarURL({dynamic:true}))

                        settings.user_chicken = "none"
                        i.reply({embeds: [rareLoseEmbed], fetchReply:true})
                    }
                    
                } else if(settings.user_chicken === "legendary") {
                        const legendaryChance = [0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1]
                        const legendaryRandom = legendaryChance[Math.floor(Math.random() * legendaryChance.length)]

                        if(legendaryRandom === 0)   {
                            const legendaryWinEmbed = new EmbedBuilder()
                        .setTitle("Won!")
                        .setDescription("🐔 | The reward of 300 leafs got delivered to your balance")
                        .setColor("00FFFF")
                        .setThumbnail(i.user.displayAvatarURL({dynamic:true}))

                        settings.user_leaf = settings.user_leaf + 300
                        i.reply({embeds: [legendaryWinEmbed]})
                        } else {
                        const legendaryLoseEmbed = new EmbedBuilder()
                        .setTitle("Lost!")
                        .setDescription("🪦 | Your chicken unfortunately died...")
                        .setColor("00FFFF")
                        .setThumbnail(i.user.displayAvatarURL({dynamic:true}))

                        settings.user_chicken = "none"
                        i.reply({embeds: [legendaryLoseEmbed], fetchReply:true})
                        }
                } else {
                    return i.reply({content: "You arent the owner of a chicken yet. Buy one in the shop (`/shop`)"})
                }
            }
            settings.save(err =>    {
                if (err)    {
                    console.log(err)
                    return i.reply({content:"An unexpected error occurred", fetchReply:true})
                }
            })
        })
        
    }
    
})
    }
}

            
        

