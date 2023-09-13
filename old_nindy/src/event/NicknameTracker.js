const db = require('quick.db')
module.exports = {
  name: "guildMemberUpdate",
  once: false,
  async execute(oldMember, newMember) {
    try {
      const timestamp = (Math.floor((new Date().getTime()) / 1000))
      const userdb = new db.table('name_tracker')
      const userid = oldMember.id

      if ((newMember.nickname && oldMember.nickname !== newMember.nickname) && newMember.guild.id == '802865003606310953') {
        if (await userdb.get(`${userid}.nickname`) == null) {
          await userdb.set(`${userid}.nickname`, [[oldMember.nickname, timestamp]])
        }
        userdb.push(`${userid}.nickname`, [newMember.nickname, timestamp])
      }
      // if(newMember.tag && oldMember.tag !== newMember.tag) {
      //     if(await userdb.get(`${userid}.tag`) == null){
      //         await userdb.set(`${userid}.tag`, [oldMember.tag])
      //     }
      //     userdb.push(`${userid}.tag`, [newMember.tag, timestamp])
      // }







    } catch (err) { console.log(err); }
  }
}