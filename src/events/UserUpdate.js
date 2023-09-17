const { Events, InteractionType } = require("discord.js");
const config = require("../config");

module.exports = {
  name: Events.UserUpdate,
  execute: async (oldMember, newMember) => {
    const timestamp = Date.now();
    const client = newMember.client;

    const userInfo = true;

    console.log(oldMember);
    console.log(newMember);

    // tracking user's personal username and global display name
    if (userInfo) {
      const userdb = client.db_userInfo;
      const userid = oldMember.id;

      const username_before = oldMember.username;
      const username_after = newMember.username;
      if (username_before != username_after) {
        if (await userdb.get(`${userid}.username`) == null) {
          await userdb.set(`${userid}.username`, [[oldMember.username, timestamp]])
        }
        userdb.push(`${userid}.username`, [newMember.username, timestamp])

        client.userupdatelog(oldMember.id, username_before, username_after, "username")
      }

      const displayName_before = oldMember.globalName || oldMember.username;
      const displayName_after = newMember.globalName || newMember.username;
      if (displayName_before !== displayName_after) {
        console.log("global name changed");
        if (await userdb.get(`${userid}.displayName`) == null) {
          await userdb.set(`${userid}.displayName`, [[oldMember.globalName, timestamp]])
        }
        userdb.push(`${userid}.displayName`, [newMember.globalName, timestamp])

        client.userupdatelog(oldMember.id, displayName_before, displayName_after, "global display name")
      }


    }







  }
};
