const _embedMaker = require("../../../sharedCode/helper/_embedMaker");

module.exports = {
  name: "embed",
  aliases: ["embeds"],
  cooldown: 5000,
  run: async (client, message, args) => {
    _embedMaker.run(client, message, args, null);
  }
};