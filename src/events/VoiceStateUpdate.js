const { Events } = require("discord.js");
const config = require("../config");

module.exports = {
  name: Events.VoiceStateUpdate,
  once: false,
  async execute(oldState, newState) {
    const client = oldState.client;

    const user = oldState.member.id;
    const oldChannel = oldState.channel;
    const newChannel = newState.channel;

    // voice log
    if (newState.guild.id !== config.guildID) return;
    if (oldChannel != null && newChannel == null) {
      // left
      client.voicelog(
        user,
        ":outbox_tray:",
        "leaving",
        `from <#${oldState.channelId}>`
      );
    } else if (oldChannel == null && newChannel != null) {
      // join
      client.voicelog(
        user,
        ":inbox_tray:",
        "joining",
        `to <#${newState.channelId}>`
      );
    } else if (
      oldChannel != null &&
      newChannel != null &&
      oldChannel != newChannel
    ) {
      // move
      client.voicelog(
        user,
        ":left_right_arrow:",
        "moving",
        `from <#${oldState.channelId}> to <#${newState.channelId}>`
      );
    }
  },
};
