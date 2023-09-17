const { ChannelType, Collection, Events } = require("discord.js")
const config = require("../config.js")
const ms = require("ms")
const cooldown = new Collection()

module.exports = {
  name: Events.MessageCreate,
  once: false,
  execute: async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === ChannelType.DM) return;

    const client = message.client;
    const prefix = config.prefix

    const registerCommands = true;
    const autoDeleteAmariBotMessage = true;

    if (registerCommands) {
      if (!message.content.startsWith(prefix)) return;
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();
      if (cmd.length == 0) return;
      let command = client.commands.get(cmd)
      if (!command) command = client.commands.get(client.commandaliases.get(cmd));
      if (command) {
        if (command.cooldown) {
          if (cooldown.has(`${command.name}${message.author.id}`)) return message.reply({ content: `Command on Cooldown \`${ms(cooldown.get(`${command.name}${message.author.id}`) - Date.now(), { long: true }).replace("minutes", `menit`).replace("seconds", `detik`).replace("second", `detik`).replace("ms", `ms`)}\` coba lagi nanti.` }).then(msg => setTimeout(() => msg.delete(), cooldown.get(`${command.name}${message.author.id}`) - Date.now()))
          command.run(client, message, args)
          cooldown.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
          setTimeout(() => {
            cooldown.delete(`${command.name}${message.author.id}`)
          }, command.cooldown);
        } else {
          command.run(client, message, args)
        }
      }
    }

    if (autoDeleteAmariBotMessage) {
      const ignoreChannel = [
        '802865004239126541',  // #admin-chat
        '802877962575806484',  // #admin-commands
        '981498267948941342',  // #staff-chat
        '1077907820973928459', // #staff-commands
        '827113811647004713',  // #bot-commands

      ]
      if (message.author.id == '339254240012664832' && ignoreChannel.indexOf(message.channel.id) == -1) {
        setTimeout(() => {
          message.delete();
        }, 3000)
      }
    }


  }
};