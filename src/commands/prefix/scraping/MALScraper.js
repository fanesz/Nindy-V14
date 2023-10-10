const _MALScraper = require("../../../sharedCode/_MALScraper");

module.exports = {
  name: "anime",
  aliases: ["mal"],
  cooldown: 5000,
  run: async (client, message, args) => {
    _MALScraper.run(client, message, args, null);
  }
};