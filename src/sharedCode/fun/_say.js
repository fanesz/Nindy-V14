module.exports = {
  name: "say",
  run: async (client, message, args, interaction) => {
    if (interaction !== null) {
      // slash
      const command = interaction.commandName;
      const targetID = interaction.options.getString("target");
      const content = interaction.options.getString("message");
      client.cmdlog(interaction.user.username, interaction.commandName, [
        content,
      ]);

      if (command === "sayr") {
        await interaction.reply({
          content: ":white_check_mark:",
          ephemeral: true,
        });
        await interaction.channel.messages.fetch(targetID).then((m) => {
          m.reply({
            content: content,
            allowedMentions: {
              repliedUser: false,
            },
          });
        });
        setTimeout(async () => {
          await interaction.deleteReply();
        }, 100);
      } else {
        await interaction.reply({
          content: ":white_check_mark:",
          ephemeral: true,
        });
        setTimeout(async () => {
          await interaction.deleteReply();
        }, 100);
        await interaction.channel.send(content);
      }
    } else {
      // prefix
      const content = args.join(" ");
      if (content.length === 0) return;
      if (content.includes("@everyone") || content.includes("@here")) {
        return await message.delete();
      }
      if (message.content.startsWith("-sayr ")) {
        await message.channel.messages
          .fetch(message.reference.messageId)
          .then((m) => {
            m.reply({
              content: content,
              allowedMentions: {
                repliedUser: false,
              },
            });
          });
        await message.delete();
      } else {
        await message.delete();
        await message.channel.send(content);
      }
    }
  },
};
