const { EmbedBuilder } = require("discord.js");
const config = require("../config");
const { replyMessage } = require("../utils/utils");

module.exports = {
  name: "random",
  run: async (client, message, args, interaction) => {
    let targetNumber;
    if (interaction !== null) { // slash
      targetNumber = interaction.options.getString("number");
      client.cmdlog(interaction.user.username, interaction.commandName, [targetNumber]);
    } else { // prefix
      targetNumber = args[0] || undefined;
    };

    const commandType = interaction || message;

    if (!targetNumber || isNaN(targetNumber) === true || targetNumber < 1) {
      return client.errReply(commandType, '`-random (angka)`')
    };

    const result = Math.floor(Math.random() * targetNumber) + 1;
    const embed = new EmbedBuilder()
      .setColor(config.embedColor)
      .setDescription(`Random Number 1 ~ ${targetNumber} = **${result}**`);

    replyMessage(commandType, '', embed, false, true);

  }
};