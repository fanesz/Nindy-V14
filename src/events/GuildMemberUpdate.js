const { Events } = require("discord.js");
const config = require("../config");

module.exports = {
  name: Events.GuildMemberUpdate,
  once: false,
  execute: async (oldMember, newMember) => {
    const timestamp = Date.now();
    const client = newMember.client;

    const userInfo = true;


    // tracking user's server nickname
    if (userInfo) {
      const userdb = client.db_userInfo;
      const userid = oldMember.id;
      if (newMember.guild.id !== config.guildID) return;

      const nickname_before = oldMember.nickname || oldMember.user.globalName || oldMember.user.username;
      const nickname_after = newMember.nickname || newMember.user.globalName || newMember.user.username;
      if (nickname_before !== nickname_after) {
        if (await userdb.get(`${userid}.nickname`) == null) {
          await userdb.set(`${userid}.nickname`, [[nickname_before, timestamp]])
        }
        userdb.push(`${userid}.nickname`, [nickname_after, timestamp])

        client.userupdatelog(newMember.user.id, nickname_before, nickname_after, "nickname")
      }

    }







  }
};
