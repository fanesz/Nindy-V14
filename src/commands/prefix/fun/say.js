const _say = require("../../../sharedCode/_say");

module.exports = {
  name: "say",
  aliases: ["sayr"],
  run: async (client, message, args) => {
    _say.run(client, message, args, null);
  }
};