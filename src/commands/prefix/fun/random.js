const _random = require("../../../sharedCode/fun/_random");

module.exports = {
  name: "random",
  run: async (client, message, args) => {
    _random.run(client, message, args, null);
  }
};