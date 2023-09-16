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

// Command handler
const commandHandler = require("./src/handlers/commands.js");
commandHandler.run(client);

// Slash command handler
const slashCommandHandler = require("./src/handlers/slashCommands.js");
slashCommandHandler.run(client);

// Event handler
const eventHandler = require("./src/handlers/events.js");
const Trakteer = require("./src/classes/Trakteer.js");
const config = require("./src/config.js");
eventHandler.run(client);



const trakteer = new Trakteer({
  'trakteer-id-session': config.sessionID,
  'XSRF-TOKEN': config.XSRFToken,
})

trakteer.get();






// Process listeners
process.on("unhandledRejection", (e) => {
  client.errlog(e);
});
process.on("uncaughtException", (e) => {
  client.errlog(e);
});
process.on("uncaughtExceptionMonitor", (e) => {
  client.errlog(e);
});


client.login(process.env.BOT_TOKEN);