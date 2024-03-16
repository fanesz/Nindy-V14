const { SlashCommandBuilder } = require("@discordjs/builders");
const _embedMaker = require("../../../sharedCode/helper/_embedMaker");
const { ChannelType } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Create an embed and send it to specified channel")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Member total for a team")
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("Title of the embed, auto bolded")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("Main section of the embed")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("color")
        .setDescription(
          "Color of the embed, hex format (Nindy default: fd46bc)"
        )
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("author")
        .setDescription("Smaller than title, and above title")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("authoricon")
        .setDescription("Icon for the author, url format")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("authorurl")
        .setDescription("Clickable link for author, url format")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("thumbnail")
        .setDescription("Small image on the right side of the embed")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("image")
        .setDescription("Big image on the bottom of the embed")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("footer")
        .setDescription("Footer of the embed, below the main section")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("footericon")
        .setDescription("Icon for the footer, url format")
        .setRequired(false)
    ),
  run: async (client, interaction) => {
    _embedMaker.run(client, null, null, interaction);
  },
};
