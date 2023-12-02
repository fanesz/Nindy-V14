const { SlashCommandBuilder } = require("@discordjs/builders");
const _say = require("../../../sharedCode/fun/_say");

module.exports = {
  data: [
    new SlashCommandBuilder()
    .setName("say")
    .setDescription("Membuat Nindy mengirimkan pesan")
    .addStringOption(option =>
      option.setName("message")
        .setDescription("Pesan yang ingin disampaikan")
        .setRequired(true)
    ),
    new SlashCommandBuilder()
    .setName("sayr")
    .setDescription("Membuat Nindy reply sebuah pesan")
    .addStringOption(option =>
      option.setName("target")
        .setDescription("Message ID yang ingin di reply")
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName("message")
        .setDescription("Pesan yang ingin disampaikan")
        .setRequired(true)
    )
  ],
  run: async (client, interaction) => {
    _say.run(client, null, null, interaction)
  }
};