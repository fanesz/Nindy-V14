module.exports = {
  name: "choose",
  run: async (client, message, args, interaction) => {
    const randomItem = (item) => item[Math.floor(Math.random() * item.length)];

    if (interaction !== null) { // slash
      const item = interaction.options.getString("item").split(' ');
      client.cmdlog(interaction.user.username, interaction.commandName, [item.join(' ')]);
      interaction.reply(`<:nindy_yes:977817511821213757> Nindy pilih **${randomItem(item)}**`)
    } else { // prefix
      message.reply({
        content: `<:nindy_yes:977817511821213757> Nindy pilih **${randomItem(args)}**`, allowedMentions: { repliedUser: false }
      })
    }

  }
};