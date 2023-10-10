const { replyMessage } = require("../utils/utils");

module.exports = {
  name: "choose",
  run: async (client, message, args, interaction) => {
    const randomItem = (item) => item[Math.floor(Math.random() * item.length)];

    let items;
    if (interaction) { // slash
      const itemString = interaction.options.getString("item");
      client.cmdlog(interaction.user.username, interaction.commandName, [itemString]);
      items = itemString.split(" ");
    } else { // prefix
      items = args;
    };

    replyMessage(interaction || message, `<:nindy_yes:977817511821213757> Nindy pilih **${randomItem(items)}**`, null, false, true);

  }
};