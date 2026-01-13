const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require('discord.js');
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const UserSettings = require("../models/UserSettings");
const ms = require("ms")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("alien")
        .setDescription("Your alien")
        .addSubcommand(subcommand =>
            subcommand
                .setName("base")
                .setDescription("Visit your alien"))

        .addSubcommand(subcommand =>
            subcommand
                .setName("feed")
                .setDescription("Feed your alien with some weed"))

        .addSubcommand(subcommand =>
            subcommand
                .setName("play")
                .setDescription("Play with your alien"))
        
        .addSubcommand(subcommand =>
            subcommand
                .setName("name")
                .setDescription("Give your alien a name")
                .addStringOption(option =>
                    option.setName("name").setDescription("Input a name for your alien").setRequired(true))),
        
    async execute(interaction)  {

        
        if(interaction.options.getSubcommand() === "base")  {

            UserSettings.findOne({user_id: interaction.user.id}, (err, settings) => {
                if(err) {
                    console.log(err)
                    return interaction.reply("An unexpected error occured")
                }
                if(!settings)   {
                    return interaction.reply("You / the mentioned user arent registered yet. Claim your first daily to continue (`/daily`)")
                } else  {

                    if(!settings.user_alien)    {
                        return interaction.reply("You arent the owner of an alien yet")
                    } else {
                        let stats;
                        if(settings.user_alien_stats_high === 30) {
                            stats = "<a:alienBarFull1:1009167640733962251><a:alienBarFull2:1009167895982510121><a:alienBarFull2:1009167895982510121><a:alienBarFull2:1009167895982510121><a:alienBarFull2:1009167895982510121><a:alienBarFull3:1009168141546438686>"
                        } else if (settings.user_alien_stats_high >= 25)  {
                            stats = "<a:alienBarFull1:1009167640733962251><a:alienBarFull2:1009167895982510121><a:alienBarFull2:1009167895982510121><a:alienBarFull2:1009167895982510121><a:alienBarHalf2:1009168264317898753><:alienBar3:1009168038907613255>"
                        } else if (settings.user_alien_stats_high >= 20)  {
                            stats = "<a:alienBarFull1:1009167640733962251><a:alienBarFull2:1009167895982510121><a:alienBarFull2:1009167895982510121><a:alienBarHalf2:1009168264317898753><:alienBar2:1009167764562387094><:alienBar3:1009168038907613255>"
                        } else if (settings.user_alien_stats_high >= 15)  {
                            stats = "<a:alienBarFull1:1009167640733962251><a:alienBarFull2:1009167895982510121><a:alienBarHalf2:1009168264317898753><:alienBar2:1009167764562387094><:alienBar2:1009167764562387094><:alienBar3:1009168038907613255>"
                        } else if (settings.user_alien_stats_high >= 10)  {
                            stats = "<a:alienBarFull1:1009167640733962251><a:alienBarHalf2:1009168264317898753><:alienBar2:1009167764562387094><:alienBar2:1009167764562387094><:alienBar2:1009167764562387094><:alienBar3:1009168038907613255>"
                        } else if (settings.user_alien_stats_high >= 5)   {
                            stats = "<a:alienBarAlmostempty1:1009168459155898388><:alienBar2:1009167764562387094><:alienBar2:1009167764562387094><:alienBar2:1009167764562387094><:alienBar2:1009167764562387094><:alienBar3:1009168038907613255>"
                        } else if (settings.user_alien_stats_high >= 0)   {
                            stats = "<:alienBar1:1009167462035624056><:alienBar2:1009167764562387094><:alienBar2:1009167764562387094><:alienBar2:1009167764562387094><:alienBar2:1009167764562387094><:alienBar3:1009168038907613255>"
                        }

                        const homeEmbed = new EmbedBuilder()
                        .setTitle(`${interaction.user.username}s Alien`)
                        .setDescription(`Name: ${settings.user_alien_name || ""}\nHigh - ${stats}`)
                        .setColor("00FFFF")
                        .setImage(`https://cdn.discordapp.com/emojis/${settings.user_alien}.png`)
    
                        return  interaction.reply({ embeds: [homeEmbed]})
                        }
                }
                
                   
                
            } )
            
        } else if (interaction.options.getSubcommand() === "feed")  {
            UserSettings.findOne({user_id: interaction.user.id}, async(err, settings) => {
                if(err) {
                    console.log(err)
                    return interaction.reply("An unexpected error occured")
                }
                if(!settings.user_alien)    {
                    return interaction.reply("You arent the owner of an alien yet. Buy one in the shop (`/shop`)")
                }
                if(!settings)   {
                    return interaction.reply("You arent registered yet. Claim you first daily to continue (`/daily`)") 
                } else {
                    const row = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setLabel("Feed")
                        .setEmoji("🍃")
                        .setStyle("Primary")
                        .setCustomId("feedalienbutton")
                    )

                    const feedEmbed = new EmbedBuilder()
                    .setTitle("Feed your alien")
                    .setThumbnail(`https://cdn.discordapp.com/emojis/${settings.user_alien}.png`)
                    .setDescription("Fill up your aliens high scale for **150** :leaves:")
                    .setColor("00FFFF")
                    .setTimestamp()

                    const interactableMessage = await interaction.reply({embeds: [feedEmbed], components: [row], fetchReply: true})

                    const filter = (i) => i.user.id === interaction.user.id;
                    const collector = interactableMessage.createMessageComponentCollector({
                    filter,
                    time: 60000,
                    });
                    
                    collector.on("collect", async (i) => {
                        if(i.customId === "feedalienbutton")    {
                            
                            const feedDoneEmbed = new EmbedBuilder()
                            .setTitle("Yummy!")
                            .setDescription("💨 | Your alien is high enough to play again!")
                            .setThumbnail(`https://cdn.discordapp.com/emojis/${settings.user_alien}.png`)
                            .setColor("00FFFF")
                            .setTimestamp()

                            settings.user_alien_stats_high = 30
                            settings.user_leaf = settings.user_leaf - 150

                            interaction.editReply({embeds: [feedDoneEmbed], components: []})

                            settings.save(err =>    {
                                if (err)    {
                                    console.log(err)
                                    return i.reply({content:"An unexpected error occurred", fetchReply:true})
                                }
                            })
                        }
                    })
                }
            })

        } else if (interaction.options.getSubcommand() === "play")  {

            UserSettings.findOne({user_id: interaction.user.id}, (err, settings) => {
                if(err) {
                    console.log(err)
                    return interaction.reply("An unexpected error occured")
                }
                if(!settings.user_alien)    {
                    return interaction.reply("You arent the owner of an alien yet. Buy one in the shop (`/shop`)")
                }
                if(!settings)   {
                    return interaction.reply("You arent registered yet. Claim you first daily to continue (`/daily`)") 
                }
                if(settings)    {

                    if(settings.user_alien_stats_high === 0)    {
                        return interaction.reply("Your alien is not high enough to play...\nFeed your alien again to continue (`/alien feed`)")
                    }

                    const playEmbed = new EmbedBuilder()
                    .setTitle("You played with your alien!")
                    .setDescription("*+50 :leaves:*")
                    .setThumbnail(`https://cdn.discordapp.com/emojis/${settings.user_alien}.png`)
                    .setColor("00FFFF")
                    .setTimestamp()
                    if(!settings.play_cooldown) {
                        settings.user_leaf = settings.user_leaf + 50
                        settings.user_alien_stats_high = settings.user_alien_stats_high - 2
                        settings.play_cooldown = Date.now() + ms("10m")

                        interaction.reply({embeds: [playEmbed]})
                    } else {
                        const cooldownOver = settings.play_cooldown
                    
                        if (Date.parse(cooldownOver) < Date.parse(new Date()))  {
                        settings.user_leaf = settings.user_leaf + 50
                        settings.user_alien_stats_high = settings.user_alien_stats_high - 2
                        settings.play_cooldown = Date.now() + ms("10m")

                        interaction.reply({ embeds: [playEmbed]})
                        } else  {
                            return interaction.reply(`You can play with your alien every 10 minutes! You are currently on cooldown.`)
                        }
                    }
                }
                settings.save(err =>    {
                    if (err)    {
                        console.log(err)
                        return interaction.reply("An unexpected error occurred")
                    }
                    
                    
                })
            } )
        } else if (interaction.options.getSubcommand() === "name")  {
            const alienName = interaction.options.getString("name")

            if(alienName.length > 20) {
                return interaction.reply("Please provide a name with max. 20 characters")
            }

            UserSettings.findOne({user_id: interaction.user.id}, (err, settings) => {
                if(err) {
                    console.log(err)
                    return interaction.reply("An unexpected error occurred")
                }
                if(!settings.user_alien)    {
                    return interaction.reply("You arent the owner of an alien yet. Buy one in the shop (`/shop`)")
                }
                if(!settings)   {
                    return interaction.reply("You arent registered yet. Claim you first daily to continue (`/daily`)") 
                } else {
                    settings.user_alien_name = alienName
                    interaction.reply(`Your aliens name is now "${alienName}"!`)
                }
                settings.save(err =>    {
                    if (err)    {
                        console.log(err)
                        return interaction.reply("An unexpected error occurred")
                    }})
            })
        }
    }
        
        
}