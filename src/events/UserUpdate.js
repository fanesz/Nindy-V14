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

      const username_before = oldMember.username;
      const username_after = newMember.username;
      if (username_before != username_after) {
        if (await userdb.get(`${userid}.username`) == null) {
          await userdb.set(`${userid}.username`, [[username_before, timestamp]])
        }
        userdb.push(`${userid}.username`, [username_after, timestamp])

        client.userupdatelog(oldMember.id, username_before, username_after, "username")
      }

      const displayName_before = oldMember.globalName || oldMember.username;
      const displayName_after = newMember.globalName || newMember.username;
      if (displayName_before !== displayName_after) {
        if (await userdb.get(`${userid}.displayName`) == null) {
          await userdb.set(`${userid}.displayName`, [[displayName_before, timestamp]])
        }
        userdb.push(`${userid}.displayName`, [displayName_after, timestamp])

        client.userupdatelog(oldMember.id, displayName_before, displayName_after, "global display name")
      }


    }







  }
};
