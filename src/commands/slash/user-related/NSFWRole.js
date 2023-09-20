const { SlashCommandBuilder } = require("@discordjs/builders");
const _NSFWRole = require("../../../sharedCode/_NSFWRole");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nsfw")
    .setDescription("Add/Remove role NSFW (inspector)"),
  run: async (client, interaction) => {
    _NSFWRole.run(client, null, null, interaction)
  }
};