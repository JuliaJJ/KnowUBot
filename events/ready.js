const { Events } = require('discord.js');
const { Questions, Answers } = require('../global.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
        Questions.sync();
		Answers.sync();
		console.log(`Ready! Logged in as ${client.user.tag}`);

//		client.guilds.cache.map((guild) => {
//			if (! guild.channels.cache.find(channel => channel.name === config.channel.name)) {
//				console.log(`Could not find channel name in: "${guild.name}", creating...`);
//
//				guild.channels.create({
//					name: config.channel.name,
//					type: ChannelType.GuildText,
//					topic: `Core channel for the "getting to know you" bot.`,
//					reason: 'Adding core functionality to bot.'
//				})
//				.then((channel) => {
//					console.log(`Created "#${channel.name}" successfully in "${guild.name}"`);
//	              	return channel;
//            	})
//				.then((channel) => channel.send("Hello there, let's get to know each other."))
//				.catch((err) => console.error(err));
//			}
//		}


//		if (!guild.channels.cache.find(channel => channel.name === 'getting-to-know-u')) {
//			guild.channels.create({ name: 'getting-to-know-u', reason: 'Interacting with Know U Bot' })
//				.then(console.log)
//				.catch(console.error);
//		}
//		else {
//			console.log('The channel already exists in this guild.');
//			return;
//		}
//
	},
};