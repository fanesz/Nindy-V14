const { SlashCommandBuilder } = require("@discordjs/builders");
const _NSFWRole = require("../../../sharedCode/user-related/_NSFWRole");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nsfw")
    .setDescription("Add/Remove role NSFW (inspector)")
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
    _NSFWRole.run(client, null, null, interaction);
  },
};
