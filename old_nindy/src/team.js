module.exports = {
  name: 'team',
  description: "team command",
  execute(msg, client) {


    const guildID = '802865003606310953' // nindy 802867983097004034 | ngck 802865003606310953
    const channel = client.guilds.cache.get(guildID).channels.cache.get(msg.member.voice.channelId)
    let listMember;
    try {
      listMember = [...channel.members.keys()]
    } catch (err) { msg.reply({ content: 'Invalid command!, you must in a voice channel!', allowedMentions: { repliedUser: false } }); return; }

    let args =
      (msg.content.slice(6)).length < 1 ? null : msg.content.slice(6)

    if (args == null) { msg.reply({ content: 'Invalid command!, `-team (number)`, untuk random pick user dari voice mu!', allowedMentions: { repliedUser: false } }); return; }
    try {
      args = parseInt(args)
    } catch (err) { msg.reply({ content: 'Invalid command!, `-team (number)`, untuk random pick user dari voice mu!', allowedMentions: { repliedUser: false } }); return; }

    let listMemberName = []

    if (args > listMember.length) { msg.reply({ content: 'Invalid command!, there is only `' + listMember.length + '` user in your voice channel!', allowedMentions: { repliedUser: false } }); return; }

    for (let i = 0; i <= listMember.length - 1; i++) {
      listMemberName.push('<@' + listMember[i] + '>')
    }


    let listMemberNameRandom = new Set()
    while (listMemberNameRandom.size < args) {
      let rand = Math.floor(Math.random() * listMemberName.length)
      if (rand >= 0) { listMemberNameRandom.add(listMemberName[rand]) }
    }
    listMemberNameRandom = [...listMemberNameRandom]


    listMemberNameRandom = listMemberNameRandom.join(', ')
    msg.reply({
      content: listMemberNameRandom,
      allowedMentions: {
        repliedUser: false
      }
    })

  }
}
