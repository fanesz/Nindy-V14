const { SlashCommandBuilder } = require("@discordjs/builders");
const _donate = require("../../../sharedCode/server-related/_donate");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("donate")
    .setDescription("Generate donatur thank you receipt secara manual")
    .addStringOption((option) =>
      option
        .setName("embedid")
        .setDescription("Message ID dari embed donatur")
        .setRequired(true)
    ),
  run: async (client, interaction) => {
    _donate.run(client, null, null, interaction, null);
  },
};
