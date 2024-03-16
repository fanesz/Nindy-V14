const { SlashCommandBuilder } = require("@discordjs/builders");
const _choose = require("../../../sharedCode/fun/_choose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("choose")
    .setDescription("Nindy akan memilih satu dari random item")
    .addStringOption((option) =>
      option
        .setName("item")
        .setDescription("Item (gunakan spasi untuk pemisah)")
        .setRequired(true)
    ),
  run: async (client, interaction) => {
    _choose.run(client, null, null, interaction);
  },
};
