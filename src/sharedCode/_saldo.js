module.exports = {
  name: "saldo",
  run: async (client, message, args, interaction) => {
    let content;
    if (interaction) { // slash
      content = interaction.options.getString("content");
      ephemeral = interaction.options.getString("reply") == "true" ? true : false;
      client.cmdlog(interaction.user.username, interaction.commandName, [content, ephemeral]);
    } else { // prefix

      


      
    }



  }
};