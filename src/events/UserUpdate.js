const { Events, InteractionType } = require("discord.js");
const config = require("../config");

module.exports = {
  name: Events.UserUpdate,
  execute: async (oldMember, newMember) => {
    const timestamp = Date.now();
    const client = newMember.client;

    const userInfo = true;

    // tracking user's personal username and global display name
    if (userInfo) {
      const userdb = client.db_userInfo;
      const userid = oldMember.id;

      if (oldMember.username !== newMember.username) {
        if (await userdb.get(`${userid}.username`) == null) {
          await userdb.set(`${userid}.username`, [[oldMember.username, timestamp]])
        }
        userdb.push(`${userid}.username`, [newMember.username, timestamp])
        client.userupdatelog(newMember.username, oldMember.username, newMember.username, "username")
      }

      if (oldMember.globalName !== newMember.globalName) {
        console.log("global name changed");
        if (await userdb.get(`${userid}.displayName`) == null) {
          await userdb.set(`${userid}.displayName`, [[oldMember.globalName, timestamp]])
        }
        userdb.push(`${userid}.displayName`, [newMember.globalName, timestamp])
        client.userupdatelog(newMember.username, oldMember.globalName, newMember.globalName, "global display name")
      }


    }







  }
};
