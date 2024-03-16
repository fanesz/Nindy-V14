const { SlashCommandBuilder } = require("@discordjs/builders");
const _rate = require("../../../sharedCode/fun/_rate");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rate")
    .setDescription("Nindy akan rate kamu!"),
  run: async (client, interaction) => {
    _rate.run(client, null, null, interaction);
  },
};
