const moment = require("moment");
const config = require("../config");

module.exports = {
  run: async (client) => {

    client.log = (message) => console.log(`[${moment().format("DD-MM-YYYY")} ${moment().format("HH:mm:ss")}] ${message}`);
    client.errlog = (message) => { console.log(`[${moment().format("DD-MM-YYYY")} ${moment().format("HH:mm:ss")}] ERR`); console.log(message); }

    client.cmdlog = (executor, command, args) =>
      client.channels.cache.get(config.slashCMD_LogChannelID)
        .send(`\`[${moment().format("HH:mm:ss")}]\` **${executor}** executing \`/${command} ${args.join(' ')}\``);

    client.userupdatelog = (user, oldData, newData, subject) =>
      client.channels.cache.get(config.userUpdate_LogChannelID)
        .send({
          content: `\`[${moment().format("HH:mm:ss")}]\` <@${user}> changed ${subject} from **${oldData}** to **${newData}**`,
          allowedMentions: { repliedUser: false }
        });

    client.voicelog = (user, emoji, action, channel) =>
      client.channels.cache.get(config.voice_LogChannelID)
        .send({
          content:
            `\`[${moment().format("HH:mm:ss")}]\` ${emoji} <@${user}> **${action}** ${channel}`,
          allowedMentions: { repliedUser: false }
        });

    client.spamlog = (user, channel) =>
      client.channels.cache.get(config.muted_LogChannelID)
        .send({
          content:
            `\`[${moment().format("HH:mm:ss")}]\` :exclamation: <@${user}> detected spamming at <#${channel}>`,
          allowedMentions: { repliedUser: false }
        });

  }
};