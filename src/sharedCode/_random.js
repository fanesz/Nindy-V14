const { EmbedBuilder } = require("discord.js");
const config = require("../config");

module.exports = {
  name: "random",
  run: async (client, message, args, interaction) => {
    let targetNumber;



    if (interaction !== null) { // slash
      targetNumber = interaction.options.getString("content");
      client.cmdlog(interaction.user.username, interaction.commandName, [content, ephemeral]);
    } else { // prefix
      targetNumber = args[0] || undefined;
    }

    const commandType = interaction ? interaction : message;

    if (!targetNumber || isNaN(targetNumber) === true || targetNumber < 1) {

      msg.reply('`-random (angka)` - untuk random generator angka 1-(angka)');
      return;
    }

    console.log(commandType);

    const replyMessage = (commandType, message, ephemeral) => {
      if (commandType === interaction) {
        commandType.reply({ content: message, ephemeral: ephemeral });
      } else {
        commandType.channel.send(message);
      }
    }




    const createEmbed = () => {
      const result = Math.floor(Math.random() * args[0]) + 1;
      return embed = new EmbedBuilder()
        .setColor(config.embedColor)
        .setDescription(`Random Number 1 - ${args[0]} = **${result}**`)
    }


  }
};