module.exports = {
  name: 'say',
  description: "say command",
  async execute(msg) {
    try {

      if (msg.content.includes('@everyone')) {
        await msg.delete();
        await msg.channel.send('<:nindy_hump:977817319512367104> DILARANG TAG @EVERYONE!!! NAKAL YA'); return;
      } else if (msg.content.includes('@here')) {
        await msg.delete();
        await msg.channel.send('<:nindy_hump:977817319512367104> DILARANG TAG @HERE!!! NAKAL YA'); return;
      };


      if (msg.content.startsWith('-sayr ')) {

        let msgsplit = (msg.content.replace('-sayr ', '')).split(' ')

        let msgid = msgsplit[0]
        msgsplit = msgsplit.join(' ').replace(msgid, '')
        let msgcontent = msgsplit

        await msg.channel.messages.fetch(msgid).then((m) => {
          m.reply({
            content: msgcontent,
            allowedMentions: {
              repliedUser: false
            }
          })
        })
        await msg.delete()


      } else {


        let SayMessage = msg.content.slice(4).trim();
        await msg.delete();
        await msg.channel.send(SayMessage)

      }

    } catch (err) { console.log('Error say.js') }

  }
}