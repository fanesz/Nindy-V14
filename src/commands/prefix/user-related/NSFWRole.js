const _NSFWRole = require("../../../sharedCode/_NSFWRole");

module.exports = {
  name: "nsfw",
  aliases: ["nsfwrole", "nfsw"],
  cooldown: 5000,
  run: async (client, message, args) => {
    _NSFWRole.run(client, message, args, null);
  }
};

