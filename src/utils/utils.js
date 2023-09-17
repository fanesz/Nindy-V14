const moment = require("moment");
const config = require("../config");
const date = moment().format("DD-MM-YYYY");
const time = moment().format("HH:mm:ss");


module.exports = {
  run: async (client) => {

    client.log = (message) => console.log(`[${date} ${time}] ${message}`);
    client.errlog = (message) => { console.log(`[${date} ${time}] ERR`); console.log(message); }

    client.cmdlog = (executor, command, args) =>
      client.channels.cache.get(config.slashCMD_LogChannelID)
        .send(`\`[${time}]\` **${executor}** executing \`/${command} ${args.join(' ')}\``);

    client.userupdatelog = (user, oldData, newData, subject) =>
      client.channels.cache.get(config.userUpdate_LogChannelID)
        .send({
          content: `\`[${time}]\` <@${user}> changed ${subject} from **${oldData}** to **${newData}**`,
          allowedMentions: { repliedUser: false }
        });

    client.voicelog = (user, emoji, action, channel) =>
      client.channels.cache.get(config.voice_LogChannelID)
        .send({
          content:
            `\`[${time}]\` ${emoji} <@${user}> **${action}** ${channel}`,
          allowedMentions: { repliedUser: false }
        });

  }
};