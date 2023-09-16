const Discord = require('discord.js')
const db = require('quick.db')
module.exports = {
  name: 'userinfo',
  description: "userinfo command",
  async execute(msg, client) {
    try {

      if (msg.author.bot) return;

      // function getJoinPosition(userid, guildID){
      //     let guilds = client.guilds.cache.get(guildID)
      //     let newarr = []
      //     const memberlist = Object.fromEntries(guilds.members.cache)
      //     let array = Object.keys(memberlist).map(function(key){ return memberlist[key] });
      //     for(i=0;i<=array.length-1;i++){ newarr.push([array[i].id, array[i].joinedAt]) }
      //     newarr.sort((a, b) => { return a[1] - b[1] });
      //     for(i=0;i<=newarr.length-1;i++){ if(newarr[i][0] == userid){ return i+1 } }
      // }
      function getUserCreated(created) {
        if (created == null) { return null };
        let result = ''
        let day = created.getDate()
        let month = created.getMonth()
        let year = created.getFullYear()
        let currentdate = new Date();
        let cday = currentdate.getDate()
        let cmonth = currentdate.getMonth() + 1
        let cyear = currentdate.getFullYear()
        let createddate = `${('0' + (month + 1)).substr(-2)}/${('0' + day).substr(-2)}/${year}, ${('0' + created.getHours()).substr(-2)}:${('0' + created.getMinutes()).substr(-2)}:${created.getSeconds()}`
        if ((cyear - year == 0) && (cmonth - month == 0)) {
          result = cday - day == 0 ? 'today' : `${cday - day} days ago`
        } else if ((cyear - year == 0) && (cmonth - month != 0)) {
          result = `${cmonth - month + 1} months ago`
        } else if ((cyear - year != 0) && (cmonth - month != 0)) {
          result = `${cyear - year} years ${cmonth - month + 1} months ago`
        }
        return [result, createddate]
      }
      function RoleList(role) {
        let result = ''
        for (i in role) { result = result + '<@&' + role[i] + '>, ' }
        result = result.slice(0, -2)
        return result
      }



      const userdb = new db.table('name_tracker')
      const timestamp = (Math.floor((new Date().getTime()) / 1000))

      if (await userdb.get(`${msg.author.id}.username`) == null) {
        userdb.set(`${msg.author.id}.username`, [[msg.author.tag, timestamp]])
      } else {
        let getdata = await userdb.get(`${msg.author.id}.username`)
        if (getdata[getdata.length - 1][0] != msg.author.tag) {
          userdb.push(`${msg.author.id}.username`, [msg.author.tag, timestamp])
        }
      }

      if (msg.content.startsWith('-usernickreset ')) {
        let userid = msg.content.slice(15)
        try {
          await userdb.delete(`${userid}.nickname`)
          msg.reply({ content: "<:nindy_yes:977817511821213757> Successfully reset user's nicknames.", allowedMentions: { repliedUser: false } })
        } catch (err) { msg.reply({ content: '⚠ Something Wrong!', allowedMentions: { repliedUser: false } }); console.log(err); }
        return
      }
      if (msg.content.startsWith('-usernamereset ')) {
        let userid = msg.content.slice(15)
        try {
          await userdb.delete(`${userid}.nickname`)
          msg.reply({ content: "<:nindy_yes:977817511821213757> Successfully reset user's username.", allowedMentions: { repliedUser: false } })
        } catch (err) { msg.reply({ content: '⚠ Something Wrong!', allowedMentions: { repliedUser: false } }); console.log(err); }
        return
      }

      if (!msg.content.startsWith('-user')) return;
      let userid;
      if (msg.content.endsWith('-user')) { userid = msg.author.id }
      else { userid = msg.content.slice(5).trim() }

      let basecache;

      if (userid.includes('#')) {
        await msg.channel.guild.members
          .fetch({ cache: false }).then(members => members
            .find(member => member.user.tag === userid)).then((result) => {
              basecache = result
            })
      } else {
        basecache = await msg.guild.members.cache.get(userid)
      }
      const guildID = '802865003606310953' // nindy 802867983097004034 | ngck 802865003606310953
      const useravatar = basecache.displayAvatarURL({ format: 'png' })
      const usertag = basecache.user.tag
      const usernickname = basecache.displayName
      const usercreated = getUserCreated(basecache.user.createdAt)
      const userguildjoin = getUserCreated(basecache.joinedAt)
      // const userguildjoinposition = getJoinPosition(userid, guildID)
      const userisbot = basecache.bot ? 'yes' : 'no'
      const userboost = getUserCreated(basecache.premiumSince) == null ? 'none' : getUserCreated(basecache.premiumSince)
      const useractivity = basecache.presence?.activities[0]?.name == undefined ? 'none' : basecache.presence?.activities[0]?.name
      // const userrole = RoleList(basecache._roles)


      const userboostembed =
        userboost == 'none' ? `**Boost Since**: none \n` : `**Boost Since**: ${userboost[0]} \n` + `**-> **||${userboost[1]}||` + '\n'





      const getnickname = (await userdb.get(`${userid}.nickname`) == null) ? [[usernickname, 'abc']] : (await userdb.get(`${userid}.nickname`))
      let nicknamelist = ''
      for (let i = 0; i <= getnickname.length - 1; i++) {
        nicknamelist = nicknamelist + getnickname[i][0] + ' → '
      }

      const embednickname = '```' + nicknamelist.slice(0, -3) + '```'


      const getusername = (await userdb.get(`${userid}.username`) == null) ? [[usertag, 'abc']] : (await userdb.get(`${userid}.username`))

      let usernamelist = ''
      try {
        for (let i = 0; i <= getusername.length - 1; i++) {
          if (getusername[i][0].includes('[AFK]')) {
            i = i + 2
          } else if (getusername[i][0] == null) {
            i = i + 1
          } else {
            usernamelist = usernamelist + getusername[i][0] + ' → '
          }
        }
      } catch (err) { }
      const embedusername = '```' + usernamelist.slice(0, -3) + '```'


      const embedinformation =
        '**Bot**: ' + userisbot + '\n' +
        '**userID**: `' + basecache.user.id + '`' + '\n' +
        userboostembed +
        '**Activity**: `' + useractivity + '`'

      const embedjoined =
        `**Discord**: ${userguildjoin[0]}` + '\n' +
        `**-> **||${userguildjoin[1]}||` + '\n' +
        `**Guild**: ${usercreated[0]}` + '\n' +
        `**-> **||${usercreated[1]}||` + '\n' //+
      // `**Join Position**: ${userguildjoinposition}/${basecache.guild.memberCount}`

      const userinfoembed = new Discord.MessageEmbed()
        .setAuthor({ name: usertag, iconURL: useravatar, url: `https://discord.com/users/${userid}` })
        .setThumbnail(useravatar)
        .setColor('#fd46bc')
        .setDescription(`<@${basecache.user.id}>`)
        .addFields(
          { name: 'Information', value: embedinformation, inline: true },
          { name: 'Joined', value: embedjoined, inline: true },
          { name: `Nickname Tracker (current: ${usernickname})`, value: embednickname },
          { name: `Username Tracker (current: ${usertag})`, value: embedusername },
        )
        .setFooter({ text: '-usernickreset (userid) and -usernamereset (userid) to reset nickname/username' })
      msg.reply({ embeds: [userinfoembed], allowedMentions: { repliedUser: false } })






    } catch (err) { msg.reply({ content: '⚠ Invalid userID!', allowedMentions: { repliedUser: false } }); console.log(err) }




  }
}