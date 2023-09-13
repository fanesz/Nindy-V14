const { Client, GatewayIntentBits, Collection } = require('discord.js');
const client = new Client({ intents: Object.values(GatewayIntentBits) });
require('dotenv').config();
const fs = require('fs');


// const commandFiles = fs.readdirSync("./src/commands").filter(file => file.endsWith(".js"));
// const slashCommandFiles = fs.readdirSync("./src/slashCommands").filter(file => file.endsWith(".js"));
// const eventFiles = fs.readdirSync("src/events").filter(file => file.endsWith(".js"));

// const slashCommandList = [];

// client.commands = new Collection();
// client.slashCommands = new Collection();
// client.events = new Collection();


// for (const file of commandFiles) {
//   const command = require(`./src/commands/${file}`);
//   client.commands.set(command.name, command);
// }

// // make a reset code for all slash commands
// for (const file of slashCommandFiles) {
//   delete require.cache[require.resolve(`./src/slashCommands/${file}`)];
// }

// for (const file of slashCommandFiles) {
//   const slashCommand = require(`./src/slashCommands/${file}`);
//   console.log(slashCommand);
//   client.slashCommands.set(slashCommand.name, slashCommand);
//   slashCommandList.push(slashCommand.data.toJSON());
// }

// for (const file of eventFiles) {
//   const event = require(`./src/events/${file}`);
//   if (event.once) {
//     client.once(event.name, (...args) => event.execute(...args, slashCommandList));
//   } else {
//     client.on(event.name, (...args) => event.execute(...args, slashCommandList));
//   }
// }


// client.on('interactionCreate', async interaction => {
//   if (!interaction.isCommand()) return;

//   const command = client.slashCommands.get(interaction.commandName);
//   if (!command) return;

//   try {
//     await command.run(interaction);
//   } catch (error) {
//     console.error(error);
//     await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
//   }
// });







client.login(process.env.BOT_TOKEN);