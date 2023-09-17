
module.exports = {
  name: 'nsfwrole',
  description: "nsfw role",
  async execute(msg, client) {

    if (msg.author.bot) return;
    //   if(msg.channelId != '827113811647004713') {
    //     msg.reply({
    //         content: 'Migrasi ke <#827113811647004713> ya, pake command `-nsfw`',
    //         allowedMentions: { repliedUser: false }
    //     });
    //     return;
    //   }

    try {

      const guild = client.guilds.cache.get("802865003606310953"); // nindy 802867983097004034 || ngck 802865003606310953
      const role = guild.roles.cache.get("802892741355896842") // new role 802873577937698826 || Inspector 802892741355896842  
      const member = await guild.members.fetch(msg.author.id)

      async function addRole() {
        try {
          await member.roles.add(role)
        } catch (err) { msg.reply("<:nindy_hump:977817319512367104> i can't manage ur role, sir!") }
      }

      async function removeRole() {
        try {
          await member.roles.remove(role)
        } catch (err) { msg.reply("<:nindy_hump:977817319512367104> i can't manage ur role, sir!") }
      }


      let msgs = (msg.content).toLocaleLowerCase()

      let nsfwDetect = [
        'role nsfw',          // 1
        'nindy nsfw',         // 2
        'minta role nsfw',    // 3
        'request nsfw',       // 4
        'request role nsfw',  // 5
        'req role nsfw',      // 6
        'req nsfw',           // 7
        '-nsfw',              // 8
      ]

      // let nsfwDelete = [
      //   'hapus role nsfw',
      //   'delete role nsfw',
      //   'remove role nsfw',
      // ]

      //only -nsfw
      if (msgs.startsWith('-nsfw') && msg.channelId == '827113811647004713') {
        if (!msg.member.roles.cache.find(r => r.name === 'Inspector')) {
          msg.reply({
            content: '<:nindy_yes:977817511821213757> done, role NSFW **added**!',
            allowedMentions: { repliedUser: false }
          })
          addRole()
          return;
        } else {
          msg.reply({
            content: '<:nindy_yes:977817511821213757> done, role nsfw **removed**!',
            allowedMentions: { repliedUser: false }
          })
          removeRole()
          return;
        }
      }
      //only -nsfw end


      for (i = 0; i <= nsfwDetect.length - 1; i++) {
        if (msg.channelId != '802885132213944320') return;
        if (msgs.includes(nsfwDetect[i]) && msg.channelId != '827113811647004713' && !msg.member.permissions.has("ADMINISTRATOR")) {
          msg.reply({
            content: 'Untuk role NSFW ke <#827113811647004713> ya, pake command `-nsfw`',
            allowedMentions: { repliedUser: false }
          });
          return;
        }
      }

      // for (i = 0; i <= nsfwDetect.length - 1; i++) {
      //   if ((msgs.includes(nsfwDetect[i])) && !(msg.member.roles.cache.find(r => r.name === 'Inspector'))) {
      // if (msgs.includes('delete') || msgs.includes('hapus') || msgs.includes('remove')) {
      //   msg.reply({
      //     content: '<:nindy_ho:977817574500859944> kamu gapunya role nsfw, ku add yah..',
      //     allowedMentions: { repliedUser: false }
      // })
      //   addRole()
      //   return;
      // }
      //     msg.reply('<:nindy_yes:977817511821213757> done, role NSFW **added**!')
      //     addRole()
      //     return;

      //   } 
      //   else if ((msgs.includes(nsfwDetect[i])) && (msg.member.roles.cache.find(r => r.name === 'Inspector'))) {
      //     msg.reply({
      //         content: '<:nindy_ho:977817574500859944> kamu dah punya role **nsfw**!',
      //         allowedMentions: { repliedUser: false }
      //     })
      //     return;
      //   }
      // }



    } catch (err) { }


  }
}