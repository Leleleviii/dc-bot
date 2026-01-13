
const { EmbedBuilder, User, SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('userinfo')
		.setDescription('Returns user info')
		.addUserOption(option => 
			option.setName("target").setDescription("Input a user / ID").setRequired(false)),
	async execute(interaction, client) {
		const user = interaction.guild.members.cache.get(interaction.options.getUser("target")?.id || interaction.user.id) || interaction.options.getUser("target")
		const forcedUser = await new User(client, { id: user?.id || interaction.user.id }).fetch();
		
		const userembed = new EmbedBuilder()
		.setColor("00FFFF")
		.setTitle(`**${user.user?.tag || user.tag}**´s profile`)
		.setThumbnail(user.user?.displayAvatarURL({ dynamic: true })|| user.displayAvatarURL({ dynamic: true}))
		.setDescription(`\`\`\` ID: ${user.user?.id || user.id} \`\`\``)
		.addFields(
			{ name: "**Joined discord**", value: `<t:${Math.ceil((user.user?.createdTimestamp || user.createdTimestamp) / 1000)}>`},
			{ name: "**Status**", value: `${user.presence ? user.presence.status : "Could not find status"}` },
			
		)
		.setImage(forcedUser.bannerURL({ dynamic: true, size: 2048 }))
		.setTimestamp()

		return interaction.reply({ embeds: [userembed] })
	}
};