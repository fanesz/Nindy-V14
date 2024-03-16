const moment = require("moment");
const config = require("../config");

module.exports = {
  run: async (client) => {
    const timestamp = `[${moment().format("HH:mm:ss")}]`;

    client.log = (message) => console.log(`[${moment().format("DD-MM-YYYY")} ${moment().format("HH:mm:ss")}] ${message}`);
    client.errlog = (message) => { console.log(`[${moment().format("DD-MM-YYYY")} ${moment().format("HH:mm:ss")}] ERR`); console.log(message); }

    client.cmdlog = (executor, command, args) =>
      client.channels.cache.get(config.slashCMD_LogChannelID)
        .send(`${timestamp} **${executor}** executing \`/${command} ${args?.join(' ')}\``);

    client.userupdatelog = (user, oldData, newData, subject) =>
      client.channels.cache.get(config.userUpdate_LogChannelID)
        .send({
          content: `${timestamp} <@${user}> changed ${subject} from **${oldData}** to **${newData}**`,
          allowedMentions: { repliedUser: false }
        });

    client.voicelog = (user, emoji, action, channel) =>
      client.channels.cache.get(config.voice_LogChannelID)
        .send({
          content:
            `${timestamp} ${emoji} <@${user}> **${action}** ${channel}`,
          allowedMentions: { repliedUser: false }
        });

    client.spamlog = (user, channel, msg = '') =>
      client.channels.cache.get(config.muted_LogChannelID)
        .send({
          content:
            `${timestamp} :exclamation: <@${user}> detected spamming at <#${channel}>${msg && `, spam msg: ${msg}`}`,
          allowedMentions: { repliedUser: false }
        });

    client.errReply = (commandType, content) =>
      commandType.reply(`:warning: ${content}`);

    client.kickLog = (user, reason) =>
      client.channels.cache.get(config.moderation_LogChannelID)
        .send({
          content:
            `${timestamp} :hammer: auto-kick <@${user}>, ${reason}`,
          allowedMentions: { repliedUser: false }
        });

  },
  replyMessage: (commandType, content, embed, ephemeral, repliedUser) => {
    const replyOptions = {
      content: content,
      ephemeral: ephemeral,
      allowedMentions: { repliedUser: repliedUser }
    };
    if (embed) {
      replyOptions.embeds = [embed];
    }
    commandType.reply(replyOptions);
  },
  getDateDiff(timestamp) {
    if (timestamp == undefined) return;
    let date1 = timestamp;
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

};