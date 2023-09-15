const { Collection } = require("discord.js");
const { readdirSync } = require("node:fs");
const path = require('path');
const dirPath = path.resolve(__dirname, '../commands/slash');

module.exports = {
  run: async (client) => {
    // client.slashCommands = new Collection();
    // client.slashDatas = [];

    readdirSync(dirPath).forEach(async (dir) => {
      readdirSync(`${dirPath}/${dir}`).forEach(async (file) => {
        const command = await require(`${dirPath}/${dir}/${file}`);
        console.log("[load slash command] " + command.data.name);
        client.slashDatas.push(command.data.toJSON());
        client.slashCommands.set(command.data.name, command);
      });
    });
  }
};