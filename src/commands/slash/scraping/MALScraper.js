const { SlashCommandBuilder } = require("@discordjs/builders");
const _MALScraper = require("../../../sharedCode/scraping/_MALScraper");

module.exports = {
  data: [
    new SlashCommandBuilder()
      .setName("anime")
      .setDescription("Scraping data anime dari MyAnimeList")
      .addStringOption((option) =>
        option
          .setName("title")
          .setDescription("Judul anime yang ingin di cari")
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
  ],

  run: async (client, interaction) => {
    _MALScraper.run(client, null, null, interaction);
  },
};
