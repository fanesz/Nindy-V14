const _donate = require("../../../sharedCode/_donate");

module.exports = {
  name: "donate",
  aliases: ["donatur"],
  cooldown: 5000,
  run: async (client, message, args) => {
    _donate.run(client, message, args, null, null);
  }
};

