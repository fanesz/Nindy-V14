const { Events, InteractionType } = require("discord.js");

module.exports = {
  name: Events.InteractionCreate,
  once: false,
  execute: async (interaction) => {
    let client = interaction.client;
    if (interaction.type === InteractionType.ApplicationCommand) {
      if (interaction.user.bot) return;
      try {
        const command = client.slashcommands.get(interaction.commandName);
        if (!command) return;
        command.run(client, interaction);
      } catch (error) {
        console.error(error);

        if (error instanceof CommandError) {
          interaction.reply({ content: `⚠ ${error.message}`, ephemeral: true });
        } else {
          interaction.reply({
            content: "⚠ Something went wrong!",
            ephemeral: true,
          });
        }
      }
    }
  },
};
