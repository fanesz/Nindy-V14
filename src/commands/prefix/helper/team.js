const _team = require("../../../sharedCode/helper/_team");

module.exports = {
  name: "team",
  aliases: ["teams"],
  cooldown: 5000,
  run: async (client, message, args) => {
    _team.run(client, message, args, null);
  }
};