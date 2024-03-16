const { SlashCommandBuilder } = require("@discordjs/builders");
const _userInfo = require("../../../sharedCode/user-related/_userInfo");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Cek info user, history nickname, dan history username")
    .addStringOption((option) =>
      option
        .setName("user")
        .setDescription("Berupa username / user ID")
        .setRequired(true)
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
    _userInfo.run(client, null, null, interaction);
  },
};
