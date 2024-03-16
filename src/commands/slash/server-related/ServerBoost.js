const { SlashCommandBuilder } = require("@discordjs/builders");
const _serverBoost = require("../../../sharedCode/server-related/_serverBoost");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("boost")
    .setDescription("Generate thankyou image for server boosters")
    .addStringOption((option) =>
      option.setName("user").setDescription("user ID").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reply")
        .setDescription("Menampilkan/menyembunyikan reply message")
        .setRequired(false)
        .addChoices(
          { name: "Hidden", value: "true" },
          { name: "Show", value: "false" }
        )
    ),
  run: async (client, interaction) => {
    _serverBoost.run(client, null, null, interaction, null);
  },
};
