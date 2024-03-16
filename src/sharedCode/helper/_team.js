const { replyMessage } = require("../../utils/utils");

module.exports = {
  name: "team",
  run: async (client, message, args, interaction) => {
    let member;
    let exclude;
    if (interaction) {
      // slash
      member = interaction.options.getString("member");
      exclude = interaction.options.getString("exclude");
      client.cmdlog(interaction.user.username, interaction.commandName, [
        member,
        exclude,
      ]);
    } else {
      // prefix
      member = args[0];
      args.shift();
      exclude = args.join(" ");
    }
    const commandType = interaction || message;

    // check is member a number
    member = parseInt(member);
    if (isNaN(member)) {
      replyMessage(
        commandType,
        "Field `member` must be in number, sir!",
        null,
        false,
        false
      );
      return;
    }
    if (exclude && exclude.length !== 0) {
      exclude = exclude.replace(/ |,/g, "").replace(/<@/g, "").split(">");
      exclude.pop();
    }

    // check is user in voice channel
    if (commandType.member.voice.channel === null) {
      replyMessage(
        commandType,
        "You must be in a voice channel, sir!",
        null,
        false,
        false
      );
      return;
    }

    // check is users in channel enough
    const usersInChannel = [...commandType.member.voice.channel.members.keys()];
    if (usersInChannel.length < member + (exclude ? exclude.length : 0)) {
      replyMessage(
        commandType,
        `Kocak, mana bisa bikin tim ${member} orang tapi di voice cuma ${
          usersInChannel.length
        } orang${exclude ? ` sama ${exclude.length} di exclude` : ""}（︶^︶）`,
        null,
        false,
        false
      );
      return;
    }

    // logic to randomize team
    const randomSet = new Set();
    while (randomSet.size < member) {
      const randomIndex = Math.floor(Math.random() * usersInChannel.length);
      if (exclude && exclude.includes(usersInChannel[randomIndex])) {
        continue;
      }
      randomSet.add(usersInChannel[randomIndex]);
    }
    const team = Array.from(randomSet)
      .map((user, index) => `${index + 1}. <@${user}>`)
      .join("\n");
    const excludeList = exclude
      ? `\n\nExclude: ${exclude.map((user) => `<@${user}>`).join(", ")}`
      : "";
    // send message
    const embed = {
      color: 0x0099ff,
      title: `Team ${member} orang`,
      description: team + excludeList,
    };
    replyMessage(commandType, null, embed, false, false);
  },
};
