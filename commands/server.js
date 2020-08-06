module.exports = {
  name: 'server',
  description: 'gives insight on the server',
  guildOnly: true,
  execute(msg, args) {
	msg.channel.send(`We are so lucky to have ${msg.guild.memberCount} total members!`);
  },
};