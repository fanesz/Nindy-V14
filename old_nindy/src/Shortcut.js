module.exports = {
  name: 'shortcut',
  description: "shortcut command",
  async execute(msg, client) {

    if (msg.author.bot || !msg.member.permissions.has("ADMINISTRATOR")) return;

    const guildID = '802865003606310953'; // debug 802867983097004034 | ngck 802865003606310953
    const guild = client.guilds.cache.get(guildID);
    const foto1 = 'https://media.discordapp.net/attachments/1050283609405280319/1050294078694232084/Server_Shortcut_-_Title.png?width=1440&height=180'
    const foto2 = 'https://media.discordapp.net/attachments/1050283609405280319/1050294078371274772/Server_Shortcut_-_Gaming.png?width=1440&height=180'
    const foto3 = 'https://media.discordapp.net/attachments/1050283609405280319/1050294079013011506/Server_Shortcut_-_Hobby.png?width=1440&height=180'
    const foto4 = 'https://media.discordapp.net/attachments/1050283609405280319/1054257725674098799/Server_Shortcut_-_Sports.png?width=965&height=121'


    const listCategory = ['802865004239126540', '841338953159934052', '815489189612486727', '1054255719152631828']//ngck
    //   const listCategory = ['1050287983795896390', '1050287997691633725', '1050288009238556793']//debug

    const channelList = [];

    for (let i = 0; i < listCategory.length; i++) {

      let Category = await guild.channels.fetch(listCategory[i])
      let tempChannel = [];
      Category.children.forEach(Channels => {
        if (Channels.type == "GUILD_TEXT") {
          tempChannel.push([`<#${Channels.id}>`, Channels.position])
        }
      });
      tempChannel.sort(function(a, b) { return a[1] - b[1]; })
      let idChannel = [];
      tempChannel.forEach(e => {
        idChannel.push(e[0])
      });
      channelList.push(idChannel.join(' '))
    }

    //   console.log(channelList);

    await msg.channel.send(foto1)
    await msg.channel.send("💬 **General Discussion:**\n" + channelList[0])
    await msg.channel.send(foto2)
    await msg.channel.send("🎮 **Gaming Discussion:**\n" + channelList[1])
    await msg.channel.send(foto3)
    await msg.channel.send("🎭 **Hobby Discussion:**\n" + channelList[2])
    await msg.channel.send(foto4)
    await msg.channel.send("⚽ **Sports Discussion:**\n" + channelList[3])



  }
}