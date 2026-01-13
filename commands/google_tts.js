const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require("@discordjs/voice");
const { Message } = require("discord.js");
const googleTTS = require("google-tts-api")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("speak")
        .setDescription("Make me speak in a vc")
        .addStringOption(option => 
            option.setName("text").setDescription("What do i say?").setRequired(true)
        ),
    async execute(interaction)  {
        const text = interaction.options.getString("text")
        const voicechannel = interaction.member.voice.channel
        
        if(!voicechannel)   {
            return interaction.reply("Please join a voice channel to use that command")
        }
        if(text.length > 200)   {
            return interaction.reply("Please input less than 200 characters")
        }
        let audioUrl = googleTTS.getAudioUrl(text, {
            lang: "de",
            slow: false,
            host: 'https://translate.google.com',
        })

        let player = createAudioPlayer()
        let recource = createAudioResource(audioUrl)

        let connection = joinVoiceChannel({
            channelId: interaction.member.voice.channel.id,
            guildId: interaction.channel.guild.id,
            adapterCreator: interaction.channel.guild.voiceAdapterCreator,
        });
        await interaction.reply(":)")
        player.play(recource)
        connection.subscribe(player);
        

        player.once(AudioPlayerStatus.Playing, () => {
            player.on(AudioPlayerStatus.Idle, () => {
                connection.disconnect();
            })
        })
    }
}