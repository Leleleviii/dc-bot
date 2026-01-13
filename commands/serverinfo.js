
const { EmbedBuilder, SlashCommandBuilder} = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('serverinfo')
		.setDescription('Returns server info'),
	async execute(interaction, guild, client) {
		const offlinemember = interaction.guild.members.cache.filter(member => !member.presence).size
		const onlinemember = interaction.guild.members.cache.filter(member => member.presence && member.presence.status).size
		const embed = new EmbedBuilder()
		.setTitle(`Server Info for ${interaction.guild.name}`)
		.setThumbnail(interaction.guild.iconURL({ dynamic: true}))
		.setImage(interaction.guild.bannerURL({ dynamic: true}))
		.setDescription(`\`\`\` ID: ${interaction.guild.id} \`\`\``)
		.addFields(
			{ name: "Members", value: `${interaction.guild.memberCount}`},
			{ name: "Offline", value: `${offlinemember}`},
			{ name: "Online", value: `${onlinemember}`, inline: true},
			{ name: "Emojis", value: `${interaction.guild.emojis.cache.size}`, inline: true}

		)
		.setColor("00FFFF")
		.setTimestamp()

		await interaction.reply({ embeds: [ embed ]})
	},
};