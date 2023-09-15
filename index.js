const { Client, Collection, GatewayIntentBits, Partials } = require("discord.js");
const client = new Client({
  intents: [GatewayIntentBits.AutoModerationConfiguration, GatewayIntentBits.AutoModerationExecution, GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildIntegrations, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildModeration, GatewayIntentBits.GuildPresences, GatewayIntentBits.GuildScheduledEvents, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildWebhooks, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
  partials: [Partials.Message, Partials.Channel, Partials.GuildMember, Partials.Reaction, Partials.GuildScheduledEvent, Partials.User, Partials.ThreadMember],
  shards: "auto"
});

require("dotenv").config();
const { readdirSync } = require("node:fs");

// Utils handler
const utilsHandler = require("./src/utils/utils.js");
utilsHandler.run(client);

// database
const db = require("./database.js");
db.run(client);

client.commandAliases = new Collection();
client.commands = new Collection();
client.slashCommands = new Collection();
client.slashDatas = [];

// Command handler
readdirSync("./src/commands/prefix").forEach(async (dir) => {
  readdirSync(`./src/commands/prefix/${dir}`).forEach(async (file) => {
    const command = await require(`./src/commands/prefix/${dir}/${file}`);
    if (command) {
      client.commands.set(command.name, command);
      if (command.aliases && Array.isArray(command.aliases)) {
        command.aliases.forEach((alias) => {
          client.commandAliases.set(alias, command.name);
        });
      }
    }
  });
});
// const commandHandler = require("./src/handlers/commands.js");
// commandHandler.run(client);


// Slash command handler
readdirSync("./src/commands/slash").forEach(async (dir) => {
  readdirSync(`./src/commands/slash/${dir}`).forEach(async (file) => {
    const command = await require(`./src/commands/slash/${dir}/${file}`);
    client.slashDatas.push(command.data.toJSON());
    client.slashCommands.set(command.data.name, command);
  });
});
// const slashCommandHandler = require("./src/handlers/slashCommands.js");
// slashCommandHandler.run(client);

// Event handler
readdirSync("./src/events").forEach(async (file) => {
  const event = await require(`./src/events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
});
// const eventHandler = require("./src/handlers/events.js");
// eventHandler.run(client);





// Process listeners
process.on("unhandledRejection", (e) => {
  console.log(e);
});
process.on("uncaughtException", (e) => {
  console.log(e);
});
process.on("uncaughtExceptionMonitor", (e) => {
  console.log(e);
});


client.login(process.env.BOT_TOKEN);