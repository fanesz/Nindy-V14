const config = require("../../config");
const { replyMessage } = require("../../utils/utils");

module.exports = {
  name: "nsfw",
  run: async (client, message, args, interaction) => {

    const NSFWRoleID = config.nsfw_RoleID;

    const commandType = interaction || message;
    if (commandType.guildId !== config.guildID) return;
    let messageContent;
    let ephemeral;

    if (commandType.member.roles.cache.find(r => r.id === NSFWRoleID) === undefined) {
      await commandType.member.roles.add(NSFWRoleID);
      messageContent = '<:nindy_yes:977817511821213757> done, role NSFW **added**!';
    } else {
      await commandType.member.roles.remove(NSFWRoleID);
      messageContent = '<:nindy_yes:977817511821213757> done, role NSFW **removed**!';
    }

    if (interaction) {
      ephemeral = interaction.options.getString("reply") == "true" ? true : false;
      client.cmdlog(interaction.user.username, interaction.commandName, [ephemeral]);
    }
    replyMessage(commandType, messageContent, null, ephemeral, true);
  }
};