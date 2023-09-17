const { Events, InteractionType } = require("discord.js");
const config = require("../config");

module.exports = {
  name: Events.GuildMemberUpdate,
  execute: async (oldMember, newMember) => {
    const timestamp = Date.now();
    const client = newMember.client;

    const userInfo = true;


    // tracking user's server nickname
    if (userInfo) {
      const userdb = client.db_userInfo;
      const userid = oldMember.id;
      if (newMember.guild.id !== config.guildID) return;

      const before = oldMember.nickname || oldMember.user.globalName || oldMember.user.username;
      const after = newMember.nickname || newMember.user.globalName || newMember.user.username;
      if (before !== after) {
        console.log("nickname changed");
        if (await userdb.get(`${userid}.nickname`) == null) {
          await userdb.set(`${userid}.nickname`, [[oldMember.nickname, timestamp]])
        }
        userdb.push(`${userid}.nickname`, [newMember.nickname, timestamp])

        client.userupdatelog(newMember.user.id, before, after, "nickname")
      }

    }







  }
};
