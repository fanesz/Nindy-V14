const config = require("../config");

module.exports = {
  name: "nsfw",
  run: async (client, message, args, interaction) => {

    const NSFWRoleID = '802892741355896842' // debug 1043736549814194196 | ntc 802892741355896842

    const commandType = interaction ? interaction : message
    if (commandType.guildId !== config.guildID) return;
    let replyMessage;

    if (commandType.member.roles.cache.find(r => r.id === NSFWRoleID) === undefined) {
      await commandType.member.roles.add(NSFWRoleID);
      replyMessage = '<:nindy_yes:977817511821213757> done, role NSFW **added**!';
    } else {
      await commandType.member.roles.remove(NSFWRoleID);
      replyMessage = '<:nindy_yes:977817511821213757> done, role NSFW **removed**!';
    }

    if (interaction !== null) { // slash
      client.cmdlog(interaction.user.username, interaction.commandName, []);
      interaction.reply({ content: replyMessage, ephemeral: true });
    } else { // prefix
      message.reply({
        content: replyMessage, allowedMentions: { repliedUser: false }
      })
    }

  }
};