const { SlashCommandBuilder } = require("@discordjs/builders");
const _random = require("../../../sharedCode/_random");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("random")
    .setDescription("Nindy akan generate random angka 1 - (angka)")
    .addStringOption(option =>
      option.setName("number")
        .setDescription("Range angka yang ingin dipilih")
        .setRequired(true)
    ),
  run: async (client, interaction) => {
    _random.run(client, null, null, interaction)
  }
};