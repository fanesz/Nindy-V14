const _userInfo = require("../../../sharedCode/user-related/_userInfo");

module.exports = {
  name: "user",
  aliases: ["userinfo", "u"],
  cooldown: 5000,
  run: async (client, message, args) => {
    _userInfo.run(client, message, args, null);
  },
};
