const _serverBoost = require("../../../sharedCode/server-related/_serverBoost");

module.exports = {
  name: "boost",
  aliases: ["boost", "nitro"],
  cooldown: 5000,
  run: async (client, message, args) => {
    _serverBoost.run(client, message, args, null, null);
  },
};
