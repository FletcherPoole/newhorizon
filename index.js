const fs = require('fs');
const Discord = require('discord.js');
const { prefix} = require('./config.json');


const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// tells you that the bot has loaded up
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
	
	if (msg.content === 'you suck') {
		msg.channel.send('no u');
	}
	
	if (msg.content === 'sucks to suck') {
		msg.channel.send('it does');
	}

  
  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();
  console.info(`Called command: ${command}`);

  if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(msg, args);
	} catch (error) {
		console.error(error);
		msg.reply('there was an error trying to execute that command!');
	}
	
  if (command.content === 'server') {
	  client.commands.get('server').execute(msg, args);
  }
});




client.login(process.env.token);