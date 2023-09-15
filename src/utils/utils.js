const moment = require("moment");
const date = moment().format("DD-MM-YYYY");
const time = moment().format("HH:mm:ss");


module.exports = {
  run: async (client) => {

    client.log = (message) => console.log(`[${date} ${time}] ${message}`);

    client.cmdlog = (executor, command, args) =>
      client.channels.cache.get(process.env.SLASH_CMD_LOG_CHANNEL_ID)
        .send(`\`[${time}]\` **${executor}** executing \`/${command} ${args.join(' ')}\``);


  }
};