module.exports = {
  name: 'mute',
  description: "mute command",
  async execute(msg, client) {
    if (!msg.member.permissions.has("ADMINISTRATOR")) { msg.reply('lu bukan admin lol'); return; };
    try {

      if (msg.content == '-mute?') {
        msg.reply({
          content: "reply `-mute (seconds)` to mute the target!",
          allowedMentions: { repliedUser: false }
        })
      }

      let timer;
      let msgContent = '';
      if (msg.content.startsWith('-mute')) {
        let args = msg.content.slice('5')
        if (args.includes(' ')) {
          args = args.split(' ')
          if (args[0] == '') { args.shift(); }
          if (isNaN(args[0]) == true) {
            timer = 60;
            args = args.join(' ');
            msgContent = ', kurang kurangin `' + args + '` ngap!';
          } else {
            timer = args[0];
            args.shift();
            if (args.length > 0) {
              args = args.join(' ');
              msgContent = ', kurang kurangin `' + args + '` ngap!'
            }
          }
        } else {
          timer = 60
        }
        if (msg.reference?.messageId) {
          await msg.channel.messages.fetch(msg.reference.messageId).then(async (m) => {

            const guild = await client.guilds.cache.get("802865003606310953"); // Debug 802867983097004034 | NGCK 802865003606310953
            const role = await guild.roles.cache.get("802905885327491114") // Debug 1043736567749017620 | NGCK 802905885327491114
            const member = await guild.members.fetch(m.author.id)
            await member.roles.add(role)
            msg.reply({
              content: `<@${m.author.id}>, muted thengs <:nindy_menggokil:977817690121076746>` + msgContent,
              allowedMentions: { repliedUser: false }
            })
            setTimeout(async () => {
              await member.roles.remove(role)
            }, timer * 1000);

          })
        }

      }




    } catch (err) {
      msg.reply({
        content: ":warning: Something wrong! missing perms or wrong command <:nindy_hump:977817319512367104>",
        allowedMentions: { repliedUser: false }
      })
      console.log(err)
    }
  }
}