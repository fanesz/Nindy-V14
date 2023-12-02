module.exports = {
  name: "choose",
  run: async (client, message, args, interaction) => {
    let fullbintang = '<:full:965501147018305648>'
    let halfbintang = '<:half:965501159584456725>'
    let blankbintang = '<:blank:965502137243140137>'

    const listBintang =
      [blankbintang + blankbintang + blankbintang + blankbintang + blankbintang,
      halfbintang + blankbintang + blankbintang + blankbintang + blankbintang,
      fullbintang + blankbintang + blankbintang + blankbintang + blankbintang,
      fullbintang + halfbintang + blankbintang + blankbintang + blankbintang,
      fullbintang + fullbintang + blankbintang + blankbintang + blankbintang,
      fullbintang + fullbintang + halfbintang + blankbintang + blankbintang,
      fullbintang + fullbintang + fullbintang + blankbintang + blankbintang,
      fullbintang + fullbintang + fullbintang + halfbintang + blankbintang,
      fullbintang + fullbintang + fullbintang + fullbintang + blankbintang,
      fullbintang + fullbintang + fullbintang + fullbintang + halfbintang,
      fullbintang + fullbintang + fullbintang + fullbintang + fullbintang]

    const randomBintang = listBintang[Math.floor(Math.random() * listBintang.length)];

    if (interaction) { // slash
      client.cmdlog(interaction.user.username, interaction.commandName, ['']);
      await interaction.reply(`:drum:`)
      setTimeout(async () => {
        await interaction.editReply(`:drum: :drum:`)
      }, 800)
      setTimeout(async () => {
        await interaction.editReply(`:drum: :drum: :drum:`)
      }, 1700)
      setTimeout(async () => {
        await interaction.editReply(`<:nindy_syap:977817690121076746> Nindy rate kamu ${randomBintang}`)
      }, 2600)

    } else { // prefix
      message.reply({
        content: `:drum:`, allowedMentions: { repliedUser: false }
      }).then(m => {
        setTimeout(() => {
          m.edit({ content: `:drum: :drum:`, allowedMentions: { repliedUser: false } })
        }, 800)
        setTimeout(() => {
          m.edit({ content: `:drum: :drum: :drum:`, allowedMentions: { repliedUser: false } })
        }, 1700)
        setTimeout(() => {
          m.edit({ content: `<:nindy_syap:977817690121076746> Nindy rate kamu  ${randomBintang}`, allowedMentions: { repliedUser: false } });
        }, 2600)

      })
    }

  }
};