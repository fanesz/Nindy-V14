const talkedRecently = new Set();
const config = require("../config.json")
const Discord = require("discord.js");

module.exports = {
  name: 'choose',
  description: "choose command",
  execute(msg) {

    if (talkedRecently.has(msg.author.id)) {
      const cdchoose = new Discord.MessageEmbed()
        .setDescription(`Command on cooldown, wait 1s`)
        .setColor('0099E1')
      msg.reply({ embeds: [cdchoose] });
    } else {

      if (msg.content.endsWith(config.prefix + 'choose')) return;
      if (msg.content.includes(config.prefix + 'choose')) {
        const noprefix = msg.content.slice(7).trim();
        const args = noprefix.split(" ");
        var result = args[Math.floor(Math.random() * args.length)];
        msg.channel.send(`<:nindy_yes:977817511821213757> Nindy pilih **${result}**`)

        talkedRecently.add(msg.author.id);
        setTimeout(() => {
          talkedRecently.delete(msg.author.id);
        }, 1000);
      }
    }
  }



}