const { Collection } = require("discord.js");
const { readdirSync } = require("node:fs");
const path = require('path');
const dirPath = path.resolve(__dirname, '../commands/slash');

module.exports = {
  run: async (client) => {
    client.slashcommands = new Collection();
    client.slashdatas = [];

    readdirSync(dirPath).forEach(async (dir) => {
      readdirSync(`${dirPath}/${dir}`).forEach(async (file) => {
        const command = await require(`${dirPath}/${dir}/${file}`);
        if(Array.isArray(command.data)){
          for (let i = 0; i < command.data.length; i++) {
            console.log("[load slash command] " + command.data[i].name);
            client.slashdatas.push(command.data[i].toJSON());
            client.slashcommands.set(command.data[i].name, command);
          }
        } else {
          console.log("[load slash command] " + command.data.name);
          client.slashdatas.push(command.data.toJSON());
          client.slashcommands.set(command.data.name, command);
        }
      });
    });
  }
};