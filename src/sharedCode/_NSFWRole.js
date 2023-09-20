module.exports = {
  name: "nsfw",
  run: async (client, message, args, interaction) => {

    const NSFWRoleID = '802892741355896842' // debug 1043736549814194196 | ntc 802892741355896842
    
    const setRole = async(user) => {
      if(user.member.roles.cache.find(r => r.id === NSFWRoleID) === undefined) {
        await user.member.roles.add(NSFWRoleID);
        return '<:nindy_yes:977817511821213757> done, role NSFW **added**!'
      } else {
        await user.member.roles.remove(NSFWRoleID);
        return '<:nindy_yes:977817511821213757> done, role NSFW **removed**!'
      }
    }

    if (interaction !== null) { // slash
      client.cmdlog(interaction.user.username, interaction.commandName, []);
      const replyMessage = await setRole(interaction);
      interaction.reply({ content: replyMessage, ephemeral: true });
    } else { // prefix
      const replyMessage = await setRole(message);
      message.reply({
        content: replyMessage, allowedMentions: { repliedUser: false }
      })
    }

  }
};