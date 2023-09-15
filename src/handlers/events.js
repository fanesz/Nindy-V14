const { Collection } = require("discord.js");
const { readdirSync } = require("node:fs");
const path = require('path');
const dirPath = path.resolve(__dirname, '../events');

module.exports = {
  run: async (client) => {
    readdirSync(dirPath).forEach(async (file) => {
      const event = await require(`${dirPath}/${file}`);
      console.log("[load event] " + event.name);
      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }
    });
  }
};