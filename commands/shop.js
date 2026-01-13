
const { EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, SlashCommandBuilder, SelectMenuBuilder } = require("discord.js");
const { set } = require("mongoose");
const UserSettings = require("../models/UserSettings");
const embedbuilder = require("./embedbuilder");


module.exports = {
    data: new SlashCommandBuilder()
        .setName("shop")
        .setDescription("Browse in the item shop"),

    async execute(interaction)  {

        //alien ids
        const rainbowAlien = "1006573395397320774"
        const greenAlien = "1006572828579090512"
        const aquaAlien = "1006572766570496170"
        const lightblueAlien = "1006572882039668907"
        const darkblueAlien = "1006572801123164160"
        const purpleAlien = "1006573007021555732"
        const lightpurpleAlien = "1006572904294666322"
        const pinkAlien = "1006572976747053056"
        const hubbabubaAlien = "1006572854386642984"
        const redAlien = "1006573040001359983"
        const orangeAlien = "1006572928084754552"
        const yellowAlien = "1006572928084754552"

        //DISPLAY SHOP EMBEDS

        const homeEmbed = new EmbedBuilder()
        .setTitle("**Item Shop**")
        .setDescription("Use the selectmenus to browse in the shop :)")
        .setColor("00FFFF")

        const chickenEmbed = new EmbedBuilder()
        .setTitle("**Item Shop** (Chicken)")
        .setDescription("*Buy a battle chicken*")
        .addFields(
            {name: "Common Chicken", value: "*100 :leaves:*"},
            {name: "Rare Chicken", value: "*250 :leaves:*"},
            {name: "Legendary Chicken", value: "*500 :leaves:*"}
        )
        .setColor("00FFFF")

        const greenAlienEmbed = new EmbedBuilder()
        .setTitle("**Item Shop** (Alien)")
        .setDescription("Use the buttons to view the aliens. If you buy a new alien it will replace your current one, so better be careful...\n\n**Green Alien**\n*-500 :leaves:*")
        .setImage(`https://cdn.discordapp.com/emojis/${greenAlien}.png`)
        .setColor("00FFFF")

        const yellowAlienEmbed = new EmbedBuilder()
        .setTitle("**Item Shop** (Alien)")
        .setDescription("Use the buttons to view the aliens. If you buy a new alien it will replace your current one, so better be careful...\n\n**Yellow Alien**\n*-850 :leaves:*")
        .setImage(`https://cdn.discordapp.com/emojis/${yellowAlien}.png`)
        .setColor("00FFFF")

        const lightblueAlienEmbed = new EmbedBuilder()
        .setTitle("**Item Shop** (Alien)")
        .setDescription("Use the buttons to view the aliens. If you buy a new alien it will replace your current one, so better be careful...\n\n**Lightblue Alien**\n*-1000 :leaves:*")
        .setImage(`https://cdn.discordapp.com/emojis/${lightblueAlien}.png`)
        .setColor("00FFFF")

        const darkblueAlienEmbed = new EmbedBuilder()
        .setTitle("**Item Shop** (Alien)")
        .setDescription("Use the buttons to view the aliens. If you buy a new alien it will replace your current one, so better be careful...\n\n**Darkblue Alien**\n*-1500 :leaves:*")
        .setImage(`https://cdn.discordapp.com/emojis/${darkblueAlien}.png`)
        .setColor("00FFFF")

        const purpleAlienEmbed = new EmbedBuilder()
        .setTitle("**Item Shop** (Alien)")
        .setDescription("Use the buttons to view the aliens. If you buy a new alien it will replace your current one, so better be careful...\n\n**Purple Alien**\n*-2000 :leaves:*")
        .setImage(`https://cdn.discordapp.com/emojis/${purpleAlien}.png`)
        .setColor("00FFFF")

        const lightpurpleAlienEmbed = new EmbedBuilder()
        .setTitle("**Item Shop** (Alien)")
        .setDescription("Use the buttons to view the aliens. If you buy a new alien it will replace your current one, so better be careful...\n\n**Lightpurple Alien**\n*-2500 :leaves:*")
        .setImage(`https://cdn.discordapp.com/emojis/${lightpurpleAlien}.png`)
        .setColor("00FFFF")

        const orangeAlienEmbed = new EmbedBuilder()
        .setTitle("**Item Shop** (Alien)")
        .setDescription("Use the buttons to view the aliens. If you buy a new alien it will replace your current one, so better be careful...\n\n**Orange Alien**\n*-3500 :leaves:*")
        .setImage(`https://cdn.discordapp.com/emojis/${orangeAlien}.png`)
        .setColor("00FFFF")
        
        const pinkAlienEmbed = new EmbedBuilder()
        .setTitle("**Item Shop** (Alien)")
        .setDescription("Use the buttons to view the aliens. If you buy a new alien it will replace your current one, so better be careful...\n\n**Pink Alien**\n*-5000 :leaves:*")
        .setImage(`https://cdn.discordapp.com/emojis/${pinkAlien}.png`)
        .setColor("00FFFF")

        const hubbabubaAlienEmbed = new EmbedBuilder()
        .setTitle("**Item Shop** (Alien)")
        .setDescription("Use the buttons to view the aliens. If you buy a new alien it will replace your current one, so better be careful...\n\n**Hubbabuba Alien**\n*-7500 :leaves:*")
        .setImage(`https://cdn.discordapp.com/emojis/${hubbabubaAlien}.png`)
        .setColor("00FFFF")

        const aquaAlienEmbed = new EmbedBuilder()
        .setTitle("**Item Shop** (Alien)")
        .setDescription("Use the buttons to view the aliens. If you buy a new alien it will replace your current one, so better be careful...\n\n**Aqua Alien**\n*-10000 :leaves:*")
        .setImage(`https://cdn.discordapp.com/emojis/${aquaAlien}.png`)
        .setColor("00FFFF")
        
        const redAlienEmbed = new EmbedBuilder()
        .setTitle("**Item Shop** (Alien)")
        .setDescription("Use the buttons to view the aliens. If you buy a new alien it will replace your current one, so better be careful...\n\n**Red Alien**\n*-25000 :leaves:*")
        .setImage(`https://cdn.discordapp.com/emojis/${redAlien}.png`)
        .setColor("00FFFF")

        const rainbowAlienEmbed = new EmbedBuilder()
        .setTitle("**Item Shop** (Alien)")
        .setDescription("Use the buttons to view the aliens. If you buy a new alien it will replace your current one, so better be careful...\n\n**Rainbow Alien**\n*-50000 :leaves:*")
        .setImage(`https://cdn.discordapp.com/emojis/${rainbowAlien}.png`)
        .setColor("00FFFF")

        //BOUGHT EMBEDS

        const boughtCommonChickenEmbed = new EmbedBuilder()
        .setTitle("Bought Common Chicken")
        .setDescription("You successfully bought a Common Chicken for 100 🍃")
        .setColor("00FFFF")
        
        const boughtRareChickenEmbed = new EmbedBuilder()
        .setTitle("Bought Rare Chicken")
        .setDescription("You successfully bought a Rare Chicken for 250 🍃")
        .setColor("00FFFF")
        
        const boughtLegendaryChickenEmbed = new EmbedBuilder()
        .setTitle("Bought Legendary Chicken")
        .setDescription("You successfully bought a Legendary Chicken for 500 🍃")
        .setColor("00FFFF")
        
        const boughtGreenAlienEmbed = new EmbedBuilder()
        .setTitle("Bought Green Alien")
        .setDescription("You successfully bought a Green Alien for 500 🍃")
        .setColor("00FFFF")

        const boughtYellowAlienEmbed = new EmbedBuilder()
        .setTitle("Bought Yellow Alien")
        .setDescription("You successfully bought a Yellow Alien for 850 🍃")
        .setColor("00FFFF")

        const boughtLightblueAlienEmbed = new EmbedBuilder()
        .setTitle("Bought Lightblue Alien")
        .setDescription("You successfully bought a Lightblue Alien for 1000 🍃")
        .setColor("00FFFF")

        const boughtDarkblueAlienEmbed = new EmbedBuilder()
        .setTitle("Bought Darkblue Alien")
        .setDescription("You successfully bought a Darkblue Alien for 1500 🍃")
        .setColor("00FFFF")

        const boughtPurpleAlienEmbed = new EmbedBuilder()
        .setTitle("Bought Purple Alien")
        .setDescription("You successfully bought a Purple Alien for 2000 🍃")
        .setColor("00FFFF")
        
        const boughtLightpurpleAlienEmbed = new EmbedBuilder()
        .setTitle("Bought Lightpurple Alien")
        .setDescription("You successfully bought a Lightpurple Alien for 2500 🍃")
        .setColor("00FFFF")

        const boughtOrangeAlienEmbed = new EmbedBuilder()
        .setTitle("Bought Orange Alien")
        .setDescription("You successfully bought a Orange Alien for 3500 🍃")
        .setColor("00FFFF")

        const boughtPinkAlienEmbed = new EmbedBuilder()
        .setTitle("Bought Pink Alien")
        .setDescription("You successfully bought a Pink Alien for 5000 🍃")
        .setColor("00FFFF")

        const boughtHubbabubaAlienEmbed = new EmbedBuilder()
        .setTitle("Bought Hubbabuba Alien")
        .setDescription("You successfully bought a Hubbabuba Alien for 7500 🍃")
        .setColor("00FFFF")

        const boughtAquaAlienEmbed = new EmbedBuilder()
        .setTitle("Bought Aqua Alien")
        .setDescription("You successfully bought a Aqua Alien for 10000 🍃")
        .setColor("00FFFF")

        const boughtRainbowAlienEmbed = new EmbedBuilder()
        .setTitle("Bought Rainbow Alien")
        .setDescription("You successfully bought a Rainbow Alien for 50000 🍃")
        .setColor("00FFFF")

        //SELECT MENUS //BUTTONS

        const row1 = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("pageselect")
                .setPlaceholder("Select a Category...")
                .setOptions([
                    {
                        label: "Chicken",
                        description: "Buy a chicken",
                        value: "chickenshop",
                        emoji: "🐔"
                    },
                    {
                        label: "Alien",
                        description: "Buy an alien",
                        value: "alienshop",
                        emoji: "👽"
                    }
                ])
        )

        const row2chicken = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("selectchickenbuy")
                .setPlaceholder("Select a chicken to buy...")
                .addOptions([
                    {
                        label: "Common Chicken",
                        description: "-100 🍃",
                        value: "buycommonchicken"
                    },
                    {
                        label: "Rare Chicken",
                        description: "-250 🍃",
                        value: "buyrarechicken"
                    },
                    {
                        label: "Legendary Chicken",
                        description: "-500 🍃",
                        value: "buylegendarychicken"
                    }
                ])
        )
        
        const AlienButtons1 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setStyle("Primary")
            .setEmoji(greenAlien)
            .setCustomId("greenAlienButton"),

            new ButtonBuilder()
            .setStyle("Primary")
            .setEmoji(yellowAlien)
            .setCustomId("yellowAlienButton"),

            new ButtonBuilder()
            .setStyle("Primary")
            .setEmoji(lightblueAlien)
            .setCustomId("lightblueAlienButton"),

            new ButtonBuilder()
            .setStyle("Primary")
            .setEmoji(darkblueAlien)
            .setCustomId("darkblueAlienButton"),

            new ButtonBuilder()
            .setStyle("Primary")
            .setEmoji(purpleAlien)
            .setCustomId("purpleAlienButton"),

        )

        const AlienButtons2 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setStyle("Primary")
            .setEmoji(lightpurpleAlien)
            .setCustomId("lightpurpleAlienButton"),

            new ButtonBuilder()
            .setStyle("Primary")
            .setEmoji(orangeAlien)
            .setCustomId("orangeAlienButton"),

            new ButtonBuilder()
            .setStyle("Primary")
            .setEmoji(pinkAlien)
            .setCustomId("pinkAlienButton"),

            new ButtonBuilder()
            .setStyle("Primary")
            .setEmoji(hubbabubaAlien)
            .setCustomId("hubbabubaAlienButton"),

            new ButtonBuilder()
            .setStyle("Primary")
            .setEmoji(aquaAlien)
            .setCustomId("aquaAlienButton"),

        )

        const alienButtons3 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
            .setStyle("Primary")
            .setEmoji(rainbowAlien)
            .setCustomId("rainbowAlienButton")
        )

        const row2alien = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("selectalienbuy")
                .setPlaceholder("Select an alien to buy...")
                .addOptions([
                    {
                        label: "Green Alien",
                        description: "-500 🍃",
                        value: "buygreenalien"
                    },
                    {
                        label: "Yellow Alien",
                        description: "-850 🍃",
                        value: "buyyellowalien"
                    },
                    {
                        label: "Lightblue Alien",
                        description: "-1000 🍃",
                        value: "buylightbluealien"
                    },
                    {
                        label: "Darkblue Alien",
                        description: "-1500 🍃",
                        value: "buydarkbluealien"
                    },
                    {
                        label: "Purple Alien",
                        description: "-2000 🍃",
                        value: "buypurplealien"
                    },
                    {
                        label: "Lightpurple Alien",
                        description: "-2500 🍃",
                        value: "buylightpurplealien"
                    },
                    {
                        label: "Orange Alien",
                        description: "-3500 🍃",
                        value: "buyorangealien"
                    },
                    {
                        label: "Pink Alien",
                        description: "-5000 🍃",
                        value: "buypinkalien"
                    },
                    {
                        label: "Hubbabuba Alien",
                        description: "-7500 🍃",
                        value: "buyhubbabubaalien"
                    },
                    {
                        label: "Aqua Alien",
                        description: "-10000 🍃",
                        value: "buyaquaalien"
                    },
                    {
                        label: "Rainbow Alien",
                        description: "-50000 🍃",
                        value: "buyrainbowalien"
                    },
                ])
        )


        const interactableMessage = await interaction.reply({ embeds: [homeEmbed], components: [row1], fetchReply: true})

        const filter = (i) => i.user.id === interaction.user.id;
        const collector = interactableMessage.createMessageComponentCollector({
        filter,
        });

        collector.on("collect", async (i)   =>  {
            if(i.customId == "pageselect")  {
                if(i.values[0] == "chickenshop")    {
                    await i.deferUpdate()
                    await i.editReply({embeds: [chickenEmbed], components: [row2chicken, row1]})
                } else if(i.values[0] ==  "alienshop")  {
                    await i.deferUpdate()
                    await i.editReply({embeds: [greenAlienEmbed], components: [AlienButtons1, AlienButtons2, alienButtons3, row2alien, row1]})
                }
            }  else if(i.customId == "selectchickenbuy")   {
                if(i.values[0] == "buycommonchicken")   {
                    await i.deferUpdate()
                    UserSettings.findOne({user_id: i.user.id}, (err, settings)  =>  {
                        if(err) {
                            console.log(err)
                            return i.followUp("A unexpected error occured!")
                        }
                        if(!settings)   {
                            return i.followUp("You / the mentioned user arent registered yet. Claim your first daily to continue (`/daily`)")
                        } else  {
                            if(settings.user_leaf >= 100)    {
                                settings.user_chicken = "common"
                                settings.user_leaf = settings.user_leaf - 100
                            } else  {
                                return i.followUp("You dont own enough leaf")
                            }
                        }
                        settings.save(err =>   {
                            if(err) {
                                console.log("error")
                                return i.followUp("An unexpected error occured!")
                            }
                            i.editReply({embeds: [boughtCommonChickenEmbed], components: []})
                        })
                    })


                } else if(i.values[0] == "buyrarechicken")  {
                    await i.deferUpdate()
                    UserSettings.findOne({user_id: i.user.id}, (err, settings)  =>  {
                        if(err) {
                            console.log(err)
                            return i.followUp("A unexpected error occured!")
                        }
                        if(!settings)   {
                            return i.followUp("You / the mentioned user arent registered yet. Claim your first daily to continue (`/daily`)")
                        } else  {
                            if(settings.user_leaf >= 250)    {
                                settings.user_chicken = "rare"
                                settings.user_leaf = settings.user_leaf - 250
                            } else  {
                                return i.followUp("You dont own enough leaf")
                            }
                        }
                        settings.save(err =>   {
                            if(err) {
                                console.log("error")
                                return i.followUp("An unexpected error occured!")
                            }
                            i.editReply({embeds: [boughtRareChickenEmbed], components: []})
                        })
                    })
                } else if(i.values[0] == "buylegendarychicken") {
                    await i.deferUpdate()
                    UserSettings.findOne({user_id: i.user.id}, (err, settings)  =>  {
                        if(err) {
                            console.log(err)
                            return i.followUp("A unexpected error occured!")
                        }
                        if(!settings)   {
                            return i.followUp("You / the mentioned user arent registered yet. Claim your first daily to continue (`/daily`)")
                        } else  {
                            if(settings.user_leaf >= 500)    {
                                settings.user_chicken = "legendary"
                                settings.user_leaf = settings.user_leaf - 500
                            } else  {
                                return i.followUp("You dont own enough leaf")
                            }
                        }
                        settings.save(err =>   {
                            if(err) {
                                console.log("error")
                                return i.followUp("An unexpected error occured!")
                            }
                            i.editReply({embeds: [boughtLegendaryChickenEmbed], components: []})
                        })
                    })
                }
            } else if (i.customId == "selectalienbuy")  {
                if(i.values[0]== "buygreenalien")   {
                    await i.deferUpdate()
                    UserSettings.findOne({user_id: i.user.id}, (err, settings)  =>  {
                        if(err) {
                            console.log(err)
                            return i.followUp("A unexpected error occured!")
                        }
                        if(!settings)   {
                            return i.followUp("You arent registered yet. Claim your first daily to continue (`/daily`)")
                        } else  {
                            if(settings.user_leaf >= 500)    {
                                settings.user_alien = greenAlien
                                settings.user_leaf = settings.user_leaf - 500
                            } else  {
                                return i.followUp("You dont own enough leaf")
                            }
                        }
                        settings.save(err =>   {
                            if(err) {
                                console.log("error")
                                return i.followUp("An unexpected error occured!")
                            }
                            i.editReply({embeds: [boughtGreenAlienEmbed], components: []})
                        })
                    })

            }   else if(i.values[0] == "buyyellowalien") {
                await i.deferUpdate()
                UserSettings.findOne({user_id: i.user.id}, (err, settings)  =>  {
                    if(err) {
                        console.log(err)
                        return i.followUp("A unexpected error occured!")
                    }
                    if(!settings)   {
                        return i.followUp("You arent registered yet. Claim your first daily to continue (`/daily`)")
                    } else  {
                        if(settings.user_leaf >= 850)    {
                            settings.user_alien = yellowAlien
                            settings.user_leaf = settings.user_leaf - 850
                        } else  {
                            return i.followUp("You dont own enough leaf")
                        }
                    }
                    settings.save(err =>   {
                        if(err) {
                            console.log("error")
                            return i.followUp("An unexpected error occured!")
                        }
                        i.editReply({embeds: [boughtYellowAlienEmbed], components: []})
                    })
                })
            }   else if(i.values[0] == "buylightbluealien") {
                await i.deferUpdate()
                UserSettings.findOne({user_id: i.user.id}, (err, settings)  =>  {
                    if(err) {
                        console.log(err)
                        return i.followUp("A unexpected error occured!")
                    }
                    if(!settings)   {
                        return i.followUp("You arent registered yet. Claim your first daily to continue (`/daily`)")
                    } else  {
                        if(settings.user_leaf >= 1000)    {
                            settings.user_alien = lightblueAlien
                            settings.user_leaf = settings.user_leaf - 1000
                        } else  {
                            return i.followUp("You dont own enough leaf")
                        }
                    }
                    settings.save(err =>   {
                        if(err) {
                            console.log("error")
                            return i.followUp("An unexpected error occured!")
                        }
                        i.editReply({embeds: [boughtLightblueAlienEmbed], components: []})
                    })
                })
            }   else if(i.values[0] == "buydarkbluealien") {
                await i.deferUpdate()
                UserSettings.findOne({user_id: i.user.id}, (err, settings)  =>  {
                    if(err) {
                        console.log(err)
                        return i.followUp("A unexpected error occured!")
                    }
                    if(!settings)   {
                        return i.followUp("You arent registered yet. Claim your first daily to continue (`/daily`)")
                    } else  {
                        if(settings.user_leaf >= 1500)    {
                            settings.user_alien = darkblueAlien
                            settings.user_leaf = settings.user_leaf - 1500
                        } else  {
                            return i.followUp("You dont own enough leaf")
                        }
                    }
                    settings.save(err =>   {
                        if(err) {
                            console.log("error")
                            return i.followUp("An unexpected error occured!")
                        }
                        i.editReply({embeds: [boughtDarkblueAlienEmbed], components: []})
                    })
                })
            }   else if(i.values[0] == "buypurplealien") {
                await i.deferUpdate()
                UserSettings.findOne({user_id: i.user.id}, (err, settings)  =>  {
                    if(err) {
                        console.log(err)
                        return i.followUp("A unexpected error occured!")
                    }
                    if(!settings)   {
                        return i.followUp("You arent registered yet. Claim your first daily to continue (`/daily`)")
                    } else  {
                        if(settings.user_leaf >= 2000)    {
                            settings.user_alien = purpleAlien
                            settings.user_leaf = settings.user_leaf - 2000
                        } else  {
                            return i.followUp("You dont own enough leaf")
                        }
                    }
                    settings.save(err =>   {
                        if(err) {
                            console.log("error")
                            return i.followUp("An unexpected error occured!")
                        }
                        i.editReply({embeds: [boughtPurpleAlienEmbed], components: []})
                    })
                })
            }   else if(i.values[0] == "buylightpurplealien") {
                await i.deferUpdate()
                UserSettings.findOne({user_id: i.user.id}, (err, settings)  =>  {
                    if(err) {
                        console.log(err)
                        return i.followUp("A unexpected error occured!")
                    }
                    if(!settings)   {
                        return i.followUp("You arent registered yet. Claim your first daily to continue (`/daily`)")
                    } else  {
                        if(settings.user_leaf >= 2500)    {
                            settings.user_alien = lightpurpleAlien
                            settings.user_leaf = settings.user_leaf - 2500
                        } else  {
                            return i.followUp("You dont own enough leaf")
                        }
                    }
                    settings.save(err =>   {
                        if(err) {
                            console.log("error")
                            return i.followUp("An unexpected error occured!")
                        }
                        i.editReply({embeds: [boughtLightpurpleAlienEmbed], components: []})
                    })
                })
            }   else if(i.values[0] == "buyorangealien") {
                await i.deferUpdate()
                UserSettings.findOne({user_id: i.user.id}, (err, settings)  =>  {
                    if(err) {
                        console.log(err)
                        return i.followUp("A unexpected error occured!")
                    }
                    if(!settings)   {
                        return i.followUp("You arent registered yet. Claim your first daily to continue (`/daily`)")
                    } else  {
                        if(settings.user_leaf >= 3500)    {
                            settings.user_alien = orangeAlien
                            settings.user_leaf = settings.user_leaf - 3500
                        } else  {
                            return i.followUp("You dont own enough leaf")
                        }
                    }
                    settings.save(err =>   {
                        if(err) {
                            console.log("error")
                            return i.followUp("An unexpected error occured!")
                        }
                        i.editReply({embeds: [boughtOrangeAlienEmbed], components: []})
                    })
                })
            }   else if(i.values[0] == "buypinkalien") {
                await i.deferUpdate()
                UserSettings.findOne({user_id: i.user.id}, (err, settings)  =>  {
                    if(err) {
                        console.log(err)
                        return i.followUp("A unexpected error occured!")
                    }
                    if(!settings)   {
                        return i.followUp("You arent registered yet. Claim your first daily to continue (`/daily`)")
                    } else  {
                        if(settings.user_leaf >= 5000)    {
                            settings.user_alien = pinkAlien
                            settings.user_leaf = settings.user_leaf - 5000
                        } else  {
                            return i.followUp("You dont own enough leaf")
                        }
                    }
                    settings.save(err =>   {
                        if(err) {
                            console.log("error")
                            return i.followUp("An unexpected error occured!")
                        }
                        i.editReply({embeds: [boughtPinkAlienEmbed], components: []})
                    })
                })
            }   else if(i.values[0] == "buyhubbabubaalien") {
                await i.deferUpdate()
                UserSettings.findOne({user_id: i.user.id}, (err, settings)  =>  {
                    if(err) {
                        console.log(err)
                        return i.followUp("A unexpected error occured!")
                    }
                    if(!settings)   {
                        return i.followUp("You arent registered yet. Claim your first daily to continue (`/daily`)")
                    } else  {
                        if(settings.user_leaf >= 7500)    {
                            settings.user_alien = hubbabubaAlien
                            settings.user_leaf = settings.user_leaf - 7500
                        } else  {
                            return i.followUp("You dont own enough leaf")
                        }
                    }
                    settings.save(err =>   {
                        if(err) {
                            console.log("error")
                            return i.followUp("An unexpected error occured!")
                        }
                        i.editReply({embeds: [boughtHubbabubaAlienEmbed], components: []})
                    })
                })
            }   else if(i.values[0] == "buyaquaalien") {
                await i.deferUpdate()
                UserSettings.findOne({user_id: i.user.id}, (err, settings)  =>  {
                    if(err) {
                        console.log(err)
                        return i.followUp("A unexpected error occured!")
                    }
                    if(!settings)   {
                        return i.followUp("You arent registered yet. Claim your first daily to continue (`/daily`)")
                    } else  {
                        if(settings.user_leaf >= 10000)    {
                            settings.user_alien = aquaAlien
                            settings.user_leaf = settings.user_leaf - 10000
                        } else  {
                            return i.followUp("You dont own enough leaf")
                        }
                    }
                    settings.save(err =>   {
                        if(err) {
                            console.log("error")
                            return i.followUp("An unexpected error occured!")
                        }
                        i.editReply({embeds: [boughtAquaAlienEmbed], components: []})
                    })
                })
            }   else if(i.values[0] == "buyrainbowalien") {
                await i.deferUpdate()
                UserSettings.findOne({user_id: i.user.id}, (err, settings)  =>  {
                    if(err) {
                        console.log(err)
                        return i.followUp("A unexpected error occured!")
                    }
                    if(!settings)   {
                        return i.followUp("You arent registered yet. Claim your first daily to continue (`/daily`)")
                    } else  {
                        if(settings.user_leaf >= 50000)    {
                            settings.user_alien = rainbowAlien
                            settings.user_leaf = settings.user_leaf - 50000
                        } else  {
                            return i.followUp("You dont own enough leaf")
                        }
                    }
                    settings.save(err =>   {
                        if(err) {
                            console.log("error")
                            return i.followUp("An unexpected error occured!")
                        }
                        i.editReply({embeds: [boughtRainbowAlienEmbed], components: []})
                    })
                })
            }
        } else if (i.customId === "greenAlienButton")   {
            await i.deferUpdate()
            i.editReply({embeds: [greenAlienEmbed], components: [AlienButtons1, AlienButtons2, alienButtons3, row2alien, row1]})
        } else if (i.customId === "yellowAlienButton")   {
            await i.deferUpdate()
            i.editReply({embeds: [yellowAlienEmbed], components: [AlienButtons1, AlienButtons2, alienButtons3, row2alien, row1]})
        } else if (i.customId === "lightblueAlienButton")   {
            await i.deferUpdate()
            i.editReply({embeds: [lightblueAlienEmbed], components: [AlienButtons1, AlienButtons2, alienButtons3, row2alien, row1]})
        } else if (i.customId === "darkblueAlienButton")   {
            await i.deferUpdate()
            i.editReply({embeds: [darkblueAlienEmbed], components: [AlienButtons1, AlienButtons2, alienButtons3, row2alien, row1]})
        } else if (i.customId === "purpleAlienButton")   {
            await i.deferUpdate()
            i.editReply({embeds: [purpleAlienEmbed], components: [AlienButtons1, AlienButtons2, alienButtons3, row2alien, row1]})
        } else if (i.customId === "lightpurpleAlienButton")   {
            await i.deferUpdate()
            i.editReply({embeds: [lightpurpleAlienEmbed], components: [AlienButtons1, AlienButtons2, alienButtons3, row2alien, row1]})
        } else if (i.customId === "orangeAlienButton")   {
            await i.deferUpdate()
            i.editReply({embeds: [orangeAlienEmbed], components: [AlienButtons1, AlienButtons2, alienButtons3, row2alien, row1]})
        } else if (i.customId === "pinkAlienButton")   {
            await i.deferUpdate()
            i.editReply({embeds: [pinkAlienEmbed], components: [AlienButtons1, AlienButtons2, alienButtons3, row2alien, row1]})
        } else if (i.customId === "hubbabubaAlienButton")   {
            await i.deferUpdate()
            i.editReply({embeds: [hubbabubaAlienEmbed], components: [AlienButtons1, AlienButtons2, alienButtons3, row2alien, row1]})
        } else if (i.customId === "aquaAlienButton")   {
            await i.deferUpdate()
            i.editReply({embeds: [aquaAlienEmbed], components: [AlienButtons1, AlienButtons2, alienButtons3, row2alien, row1]})
        } else if (i.customId === "rainbowAlienButton")   {
            await i.deferUpdate()
            i.editReply({embeds: [rainbowAlienEmbed], components: [AlienButtons1, AlienButtons2, alienButtons3, row2alien, row1]})
        }})
        
    }
}