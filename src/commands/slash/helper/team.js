const { SlashCommandBuilder } = require("@discordjs/builders");
const _team = require("../../../sharedCode/helper/_team");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("team")
    .setDescription("Choose a random user from joined voice channel")
    .addStringOption(option =>
      option.setName("member")
        .setDescription("Member total for a team")
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName("exclude")
        .setDescription("Excluding member")
        .setRequired(false)
    ),
  run: async (client, interaction) => {
    _team.run(client, null, null, interaction)
  }
};