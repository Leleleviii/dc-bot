const Discord = require("discord.js")
const GuildSettings = require("../models/GuildSettings")

exports.run = async (client, member) => {
    const guildsettings = await GuildSettings.findOne({ guild_id: member.guild.id })
    
    if(!guildsettings || !guildsettings.welcome_channel_id) {
        return;
    }

    const embed = new Discord.EmbedBuilder()
        .setTitle(`Welcome ${member.user.username}`)
        .setDescription(guildsettings.welcome_message || "Enjoy your stay")
        .setThumbnail(member.user.displayAvatarURL({dynamic:true}))
        .setColor("00FFFF")
        .setTimestamp()
    

    member.guild.channels.cache.get(guildsettings.welcome_channel_id).send({embeds: [embed]})
}
    