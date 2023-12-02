const _choose = require("../../../sharedCode/fun/_choose");

module.exports = {
  name: "choose",
  run: async (client, message, args) => {
    _choose.run(client, message, args, null);
  }
};