const _choose = require("../../../sharedCode/_choose");
const _say = require("../../../sharedCode/_say");

module.exports = {
  name: "choose",
  run: async (client, message, args) => {
    _choose.run(client, message, args, null);
  }
};