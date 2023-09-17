const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "userInfo",
  run: async (client, message, args, interaction) => {
    let userID;
    let ephemeral;
    if (interaction !== null) {
      userID = interaction.options.getString("user");
      ephemeral = interaction.options.getString("reply") == "true" ? true : false;
      client.cmdlog(interaction.user.username, interaction.commandName, [userID, ephemeral]);
    } else {
      userID = args[0]
    }

    function getUserCreated(unixTimestamp) {
      const currentDate = new Date();
      const userDate = new Date(unixTimestamp);

      const yearsDiff = currentDate.getFullYear() - userDate.getFullYear();
      const monthsDiff = currentDate.getMonth() - userDate.getMonth();

      let ageText = "";

      if (yearsDiff > 0 || (yearsDiff === 0 && monthsDiff > 0)) {
        ageText += yearsDiff > 0 ? `${yearsDiff} ${yearsDiff === 1 ? 'year' : 'years'}` : '';
        if (monthsDiff > 0) {
          if (yearsDiff > 0) {
            ageText += ' ';
          }
          ageText += `${monthsDiff} ${monthsDiff === 1 ? 'month' : 'months'}`;
        }
        ageText += " ago";
      } else {
        ageText = "Less than a month ago";
      }

      const formattedDate = `${userDate.getDate()}/${userDate.getMonth() + 1}/${userDate.getFullYear()}, ${userDate.toLocaleTimeString()}`;

      return [ageText, formattedDate];
    }

    const userdb = client.db_userInfo
    let basecache;

    const msg_interaction = interaction ? interaction : message
    if (isNaN(userID)) {
      await msg_interaction.channel.guild.members
        .fetch({ cache: false }).then(members => members
          .find(member => member.user.username === userID)).then((result) => {
            basecache = result
            userID = basecache.user.id
          })
    } else {
      basecache = await msg_interaction.guild.members.cache.get(userID)
    }

    const useravatar = basecache.displayAvatarURL({ format: 'png' })
    const username = basecache.user.username
    const usernickname = basecache.displayName
    const userdisplayname = basecache.globalName
    const usercreated = getUserCreated(basecache.user.createdTimestamp)
    const userguildjoin = getUserCreated(basecache.joinedTimestamp)
    const userisbot = basecache.bot ? 'yes' : 'no'
    const userboost = basecache.premiumSince == null ? 'none' : getUserCreated(basecache.premiumSince)
    const useractivity = basecache.presence?.activities[0]?.name == undefined ? 'none' : basecache.presence?.activities[0]?.name

    const userboostembed =
      userboost == 'none' ? `**Boost Since**: none \n` :
        `**Boost Since**: ${userboost[0]} \n` + `**-> **||${userboost[1]}||` + '\n'

    const getUserInfo = await userdb.get(`${userID}`);

    function createTrackerEmbed(name, current, data) {
      if (data) {
        const filteredData = data.filter(item => item[0] !== null).map(item => item[0]).join(' → ');
        return {
          name: `${name} Tracker (current: ${current})`,
          value: '```' + filteredData + '```'
        };
      }
      return null;
    }

    const embedusername = getUserInfo && getUserInfo.username && createTrackerEmbed("Username", username, getUserInfo.username);
    const embeddisplayname = getUserInfo && getUserInfo.displayName && createTrackerEmbed("Display Name", userdisplayname, getUserInfo.displayName);
    const embednickname = getUserInfo && getUserInfo.nickname && createTrackerEmbed("Nickname", usernickname, getUserInfo.nickname);

    const embedinformation =
      '**Bot**: ' + userisbot + '\n' +
      '**userID**: `' + basecache.user.id + '`' + '\n' +
      userboostembed +
      '**Activity**: `' + useractivity + '`'

    const embedjoined =
      `**Discord**: ${usercreated[0]}` + '\n' +
      `**-> **||${usercreated[1]}||` + '\n' +
      `**Guild**: ${userguildjoin[0]}` + '\n' +
      `**-> **||${userguildjoin[1]}||` + '\n' //+

    const embed = new EmbedBuilder()
      .setAuthor({ name: username, iconURL: useravatar, url: `https://discord.com/users/${userID}` })
      .setThumbnail(useravatar)
      .setColor('#fd46bc')
      .setDescription(`<@${basecache.user.id}>`)
      .addFields(
        { name: 'Information', value: embedinformation, inline: true },
        { name: 'Joined', value: embedjoined, inline: true },
      )
      .setFooter({ text: '-usernickreset (userID) and -usernamereset (userID) to reset nickname/username' })
    embedusername && embed.addFields(embedusername);
    embeddisplayname && embed.addFields(embeddisplayname);
    embednickname && embed.addFields(embednickname);
    if (interaction !== null) {
      await interaction.reply({ embeds: [embed], ephemeral: ephemeral })
    } else {
      await message.reply({ embeds: [embed] });
    }
  }
};

