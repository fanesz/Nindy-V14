// // make a slash command that reply ping with pong!!
// module.exports = {
//   name: 'ping',
//   description: 'Replies with Pong 2',
//   async execute(interaction) {
//     await interaction.reply('Pong!');
//   } 
// }

const { EmbedBuilder, PermissionsBitField } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pong!3"),
  run: async(interaction) => {
    await interaction.deferReply();
    interaction.reply(`Pong 🏓`)
  }
};