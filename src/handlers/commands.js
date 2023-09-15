const { Collection } = require("discord.js");
const { readdirSync } = require("node:fs");
const path = require('path');
const dirPath = path.resolve(__dirname, '../commands/prefix');

module.exports = {
  run: async (client) => {
    client.commandaliases = new Collection();
    client.commands = new Collection();
    readdirSync(dirPath).forEach(async (dir) => {
      readdirSync(`${dirPath}/${dir}`).forEach(async (file) => {
        const command = await require(`${dirPath}/${dir}/${file}`);
        if (command) {
          console.log("[load command] " + command.name);
          client.commands.set(command.name, command);
          if (command.aliases && Array.isArray(command.aliases)) {
            command.aliases.forEach((alias) => {
              client.commandaliases.set(alias, command.name);
            });
          }
        }
      });
    });

  }
};