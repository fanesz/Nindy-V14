const { SlashCommandBuilder } = require("@discordjs/builders");
const Database = require("../../../../database.js");


module.exports = {

  run: async (client, interaction) => {
    // const userInfo = new Database('name_tracker');

    // const util = new Utils(client);
    // const allMember = await util.getAllMember();
    // console.log(allMember);
    // const data = client.guilds.cache.get("802867983097004034").members.cache.map(m => ({ name: m.user.username, value: m.user.id }))


    interaction.reply(`user... 🏓`)
  },
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Get Information of the user")
    .addStringOption(option =>
      option.setName("user")
        .setDescription("test")
        .setRequired(true)
        .setChoices(
          { name: "test", value: "test"}
        ))
};