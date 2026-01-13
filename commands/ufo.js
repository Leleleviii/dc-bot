
const { MessageEmbed, MessageSelectMenu, Modal, TextInputComponent, SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, StringSelectMenuBuilder, ModalAssertions, ModalBuilder, TextInputBuilder} = require("discord.js");
const UserSettings = require("../models/UserSettings");
const embedbuilder = require("./embedbuilder");


module.exports = {
    data: new SlashCommandBuilder()
        	.setName("ufo")
            .setDescription("Check out your Spaceship"),
    
    async execute(interaction)  {

        const UfoButtonsOn = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel("On")
            .setEmoji("💡")
            .setStyle("Primary")
            .setCustomId("lightonbutton"),

            new ButtonBuilder()
            .setLabel("Upgrade")
            .setStyle("Success")
            .setCustomId("upgradebutton")
        )
        
        const UfoButtonsOff = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel("Off")
            .setEmoji("💡")
            .setStyle("Secondary")
            .setCustomId("lightoffbutton"),

            new ButtonBuilder()
            .setLabel("Upgrade")
            .setStyle("Success")
            .setCustomId("upgradebutton")
        )

        const casiobuttons = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setLabel("Coinflip")
            .setEmoji("🪙")
            .setStyle("Danger")
            .setCustomId("coinflipbutton")
        )
        .addComponents(
            new ButtonBuilder()
            .setLabel("Slots")
            .setEmoji("🎰")
            .setStyle("Danger")
            .setCustomId("slotsbutton")
            .setDisabled(true)
        )

        const PlanetSelect0 = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
            .setPlaceholder("Fly to ...")
            .setCustomId("selectplanet0")
            .addOptions([
                {
                    label: "?",
                    description: "Unlocked on level 5",
                    value: "unclickable",
                    emoji: {
                        "animated" : false,
                        "id" : "1058274687026728981",
                        "name" : "CasinoPlanetMyst"
                    } 
                },
            ])
        )

        const PlanetSelect1 = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
            .setPlaceholder("Fly to ...")
            .setCustomId("selectplanet1")
            .addOptions([
                {
                    label: "Casio",
                    description: "Casino-Planet",
                    value: "casio",
                    emoji: {
                        "animated" : false,
                        "id" : "1058274478930534410",
                        "name" : "CasinoPlanet"
                    }
                },
            ])
        )

        const BetModal = new ModalBuilder()
            .setTitle("Your Bet")
            .setCustomId("betmodal")
        const betamountinput = new TextInputBuilder()
        .setCustomId("betamount")
        .setLabel("Amount")
        .setStyle("Short")
        .setRequired(true)
        
        const betamount = new ActionRowBuilder().addComponents(betamountinput) 

        BetModal.addComponents(betamount)

        //embeds

        const CasioUnlockedEmbed = new EmbedBuilder()
        .setTitle(`Congrats ${interaction.user.username}!`)
        .setDescription("New Planet `Casio` unlocked!")
        .setThumbnail("https://cdn.discordapp.com/attachments/1005909893271785644/1058275551808335972/Untitled5_20221230143531.png")
        .setColor("00FFFF")

        const CasioEmbed = new EmbedBuilder()
        .setTitle("Casio")
        .setDescription("Welcome to Casio the planet of richness.\nGo ahead and try your luck on following games to win *(or lose)* leaves!")
        .setImage("https://cdn.discordapp.com/attachments/1005909893271785644/1058275551808335972/Untitled5_20221230143531.png")
        .setThumbnail("https://cdn.discordapp.com/attachments/806845719243784193/1057273463766794301/Untitled5_20221227202555.png")
        .setColor("00FFFF")
    
        UserSettings.findOne({user_id: interaction.user.id}, async (err, settings) => {
            if(err) {
                console.log(err)
                return interaction.reply("an unexpected error occured!")
            }
            if(!settings)   {
                return interaction.reply("You / the mentioned user arent registered yet. Claim your first daily to continue (`/daily`)")
            } else if(!settings.user_ufo_level) {

                settings.user_ufo_level = 1
                settings.user_ufo_light = "on"

                const UfoEmbed = new EmbedBuilder()
                .setTitle(`${interaction.user.username}´s ufo`)
                .setDescription(`Level: 1\nLights: On\nUpgrade: 1000🍃`)
                .setImage("https://cdn.discordapp.com/attachments/806845719243784193/1057273463355736106/Untitled5_20221227202601.png")
                .setColor("00FFFF")

                interaction.reply({embeds: [UfoEmbed]})

            } else  {
                const UfoEmbedOn = new EmbedBuilder()
                .setTitle(`${interaction.user.username}´s ufo`)
                .setDescription(`Level: ${settings.user_ufo_level}\nLights: On\nUpgrade: ${Math.floor(settings.user_ufo_level * 1000)}🍃`)
                .setImage("https://cdn.discordapp.com/attachments/806845719243784193/1057273463355736106/Untitled5_20221227202601.png")
                .setColor("00FFFF")

                const UfoEmbedOff = new EmbedBuilder()
                .setTitle(`${interaction.user.username}´s ufo`)
                .setDescription(`Level: ${settings.user_ufo_level}\nLights: Off\nUpgrade: ${Math.floor(settings.user_ufo_level * 1000)}🍃`)
                .setImage("https://cdn.discordapp.com/attachments/806845719243784193/1057273463766794301/Untitled5_20221227202555.png")
                .setColor("00FFFF")

                let embed;
                if(settings.user_ufo_light === "on")    {
                    embed = UfoEmbedOn
                } else  {
                    embed = UfoEmbedOff
                }

                let selectmenu;
                if(settings.user_ufo_level < 5) {
                    selectmenu = PlanetSelect0
                } else if (settings.user_ufo_level >= 5) {
                    selectmenu = PlanetSelect1
                }

                const interactableMessage = await interaction.reply({embeds: [embed], components: [UfoButtonsOn, selectmenu],fetchReply: true})

                const filter = (i) => i.user.id === interaction.user.id;
                const collector = interactableMessage.createMessageComponentCollector({
                filter,
                });
        
                collector.on("collect", async (i) =>  {
                    if(i.customId === "lightonbutton")  {
                        await i.deferUpdate()
                        settings.user_ufo_light = "off"
                        i.editReply({embeds: [UfoEmbedOff], components: [UfoButtonsOff, selectmenu]})
                    } else if (i.customId === "lightoffbutton")    {
                        settings.user_ufo_light = "on"
                        await i.deferUpdate()
                        i.editReply({embeds: [UfoEmbedOn], components: [UfoButtonsOn, selectmenu]})
                    } else if (i.customId === "upgradebutton")  {
                        await i.deferUpdate()

                        if(settings.user_leaf >= Math.floor(settings.user_ufo_level * 1000))    {
                            
                            if(settings.user_ufo_level === 4)   {
                                i.followUp({embeds: [CasioUnlockedEmbed], fetchReply: true})
                            }

                            settings.user_leaf = settings.user_leaf - Math.floor(settings.user_ufo_level * 1000)
                            settings.user_ufo_level = settings.user_ufo_level + 1
                        }

                        const UfoEmbedOn2 = new EmbedBuilder()
                        .setTitle(`${interaction.user.username}´s ufo`)
                        .setDescription(`Level: ${settings.user_ufo_level}\nLights: On\nUpgrade: ${Math.floor(settings.user_ufo_level * 1000)}🍃`)
                        .setImage("https://cdn.discordapp.com/attachments/806845719243784193/1057273463355736106/Untitled5_20221227202601.png")
                        .setColor("00FFFF")
                        
                        i.editReply({embeds: [UfoEmbedOn2], components: [UfoButtonsOn, selectmenu]})
                    } else if (i.customId === "selectplanet1")  {
                        if(i.values[0] === "casio") {
                            await i.deferUpdate()

                            i.editReply({embeds: [CasioEmbed], components: [selectmenu, casiobuttons]})
                        }
                    } else if (i.customId === "coinflipbutton") {
                        await i.showModal(BetModal)

                        const submitted = await i.awaitModalSubmit({
                            time: 360000000,
                            filter: i => i.user.id === interaction.user.id,
                          }).catch(error => {
                                console.log(error)
                                return null
                          });

                        if (submitted)  {
                            const cfamount = submitted.fields.getTextInputValue("betamount")

                            if(!isNaN(cfamount))   {
                                if(settings.user_leaf >= cfamount)  {
                                    const cfchance = [0,1,0,1]
                                    const cfresult = cfchance[Math.floor(Math.random() * cfchance.length)]

                                    const cfwinembed = new EmbedBuilder()
                                    .setTitle("Won!")
                                    .setDescription(`:leaves: | You won ${cfamount} leaves`)
                                    .setColor("19FF19")

                                    const cfloseembed = new EmbedBuilder()
                                    .setTitle("Lost!")
                                    .setDescription(`:leaves: | You lost ${cfamount} leaves`)
                                    .setColor("FF0000")

                                    if(cfresult === 0)  {
                                        await submitted.reply({embeds: [cfwinembed]})
                                        settings.user_leaf = settings.user_leaf + Number(cfamount)
                                    } else {
                                        await submitted.reply({embeds: [cfloseembed]})
                                        settings.user_leaf = settings.user_leaf - Number(cfamount)
                                    }

                                } else  {
                                    return submitted.reply("You do not own enough leaves to afford this")
                                }
                            } else {
                                return submitted.reply("Please input a valid number")
                                }
                        }
                    } else if (i.customId === "slotsbutton")    {
                        await i.showModal(BetModal)

                        const submitted = await i.awaitModalSubmit({
                            time: 360000000,
                            filter: i => i.user.id === interaction.user.id,
                          }).catch(error => {
                                console.log(error)
                                return null
                          });

                        if(submitted) {
                            const sltamount = submitted.fields.getTextInputValue("betamount")

                            const emoji1 = "emoji1"
                            const emoji2 = "emoji2"
                            const emoji3 = "emoji3"
                            const emoji4 = "emoji3"

                            const emojis = [emoji1, emoji2, emoji3, emoji4]

                            const obj1 = emojis[Math.floor(Math.random() * emojis.length)]
                            const obj2 = emojis[Math.floor(Math.random() * emojis.length)]
                            const obj3 = emojis[Math.floor(Math.random() * emojis.length)]
                            const obj4 = emojis[Math.floor(Math.random() * emojis.length)]
                            const obj5 = emojis[Math.floor(Math.random() * emojis.length)]
                            const obj6 = emojis[Math.floor(Math.random() * emojis.length)]
                            const obj7 = emojis[Math.floor(Math.random() * emojis.length)]
                            const obj8 = emojis[Math.floor(Math.random() * emojis.length)]
                            const obj9 = emojis[Math.floor(Math.random() * emojis.length)]

                            const winMultiplier = Math.floor(Math.random() * (10 - 2 + 1) + 2);
                        }

                    }
                    settings.save(err =>    {
                        if (err)    {
                            console.log(err)
                            i.reply("An unexpected error occurred")
                        }
                    })
                })
            } 
            settings.save(err =>    {
                if (err)    {
                    console.log(err)
                    return interaction.reply("An unexpected error occurred")
                }
            })
        })



    }
        
}