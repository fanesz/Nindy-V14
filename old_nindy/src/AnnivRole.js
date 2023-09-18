module.exports = {
  name: 'annivRole',
  description: "annivRole command",
  async execute(msg, client) {

    //join role folks
    try {

      if (!msg.member.roles.cache.find(r => r.name === 'Folks')) {
        if (!msg.author.bot || !msg.member.permissions.has("ADMINISTRATOR")) {
          const guild = client.guilds.cache.get("802865003606310953");
          const role = guild.roles.cache.get("940237965689503774")
          const member = await guild.members.fetch(msg.author.id)
          await member.roles.add(role)
        }
      }
    } catch (err) { }
    //join role folks end


    try {
      if (msg.guildId != '802865003606310953') return; // debug 802867983097004034 | ngck 802865003606310953

      function isValid(created) {
        if (created == null) { return null };

        let year = created.getFullYear()
        let currentdate = new Date();
        let cyear = currentdate.getFullYear()
        return cyear - year;
      }


      function getDateDiff(timestamp1) {
        if (timestamp1 == undefined) { return; }
        let date1 = timestamp1;
        let date2 = new Date();
        let years = date2.getFullYear() - date1.getFullYear();
        let months = date2.getMonth() - date1.getMonth();
        let days = date2.getDate() - date1.getDate();
        if (days < 0) {
          months--;
          days += new Date(date2.getFullYear(), date2.getMonth(), 0).getDate();
        }
        if (months < 0) {
          years--;
          months += 12;
        }
        return [years, months, days];
      }


      const guildID = '802865003606310953'; // debug 802867983097004034 | ngck 802865003606310953
      const roleID1year = '1049592266521583617'; // debug 1049590864042803220 | ngck 1049592266521583617
      const roleID2year = '1050298205952286760'; // debug 1049590864042803220 | ngck 1050298205952286760

      const userYear = getDateDiff(await msg.guild.members.cache.get(msg.author.id)?.joinedAt)

      // console.log(userYear);
      // console.log(await msg.guild.members.cache.get(msg.author.id)?.joinedAt);

      // console.log(getDateDiff(await msg.guild.members.cache.get(msg.author.id)?.joinedAt));

      if (msg.channelId == '802919702422355969'
        || msg.channelId == '802868478683906079'
        || msg.author.bot
        || userYear[0] == 0) return;



      const guild = client.guilds.cache.get(guildID);
      const role1year = guild.roles.cache.get(roleID1year);
      const role2year = guild.roles.cache.get(roleID2year);
      const member = await guild.members.fetch(msg.author.id);


      let replyMsg1Year = [
        `**Thank you for your 1 Year Service** <@${msg.author.id}> 🎉 <:nindy_yes:977817511821213757>\n_(Received 1 Year Operation Badge, Check out your profile!)_`,
        `**Your hard work and perseverance have paid off. Congratulations** <@${msg.author.id}> 🧤\n_(Received 1 Year Operation Badge, Check out your profile!)_`,
        `**You did it <@${msg.author.id}>! We knew you could!, take this 1 Year Operation Badge as a Token of Appreciation** :identification_card:\n_(Received 1 Year Operation Badge, Check out your profile!)_`,
      ]

      let replyMsg2Year = [
        `**Thank you sir for your wonderfull 2 Year of Service** <@${msg.author.id}> 🎉 <:nindy_yes:977817511821213757>\n_(Received 2 Year Operation Badge, Check out your profile!)_`,
        `**Nindy know your hard work in this 2 year of Service. Congratulations** <@${msg.author.id}> 🧤\n_(Received 2 Year Operation Badge, Check out your profile!)_`,
        `**Well done <@${msg.author.id}>! We knew you could!, take this 2 Year Operation Badge as a Token of Appreciation** :identification_card:\n_(Received 2 Year Operation Badge, Check out your profile!)_`,
      ]

      if (userYear[0] == 1) {
        if (await msg.member.roles.cache.find(r => r.id == roleID1year)) { return }
        else {
          await member.roles.add(role1year)
          await msg.reply(
            replyMsg1Year[Math.floor(Math.random() * replyMsg1Year.length)]
          )
        }

      } else if (userYear[0] == 2) {
        if (await msg.member.roles.cache.find(r => r.id == roleID2year)) { return }
        else {
          await member.roles.remove(role1year)
          await member.roles.add(role2year)
          await msg.reply(
            replyMsg2Year[Math.floor(Math.random() * replyMsg2Year.length)]
          )
        }

      }

    } catch (err) { }

  }
}