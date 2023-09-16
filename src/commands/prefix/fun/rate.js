const _rate = require("../../../sharedCode/_rate");

module.exports = {
  name: "rate",
  aliases: ["rating"],
  run: async (client, message, args) => {
    _rate.run(client, message, args, null);
  }
};