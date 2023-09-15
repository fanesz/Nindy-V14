const { SlashCommandBuilder } = require("@discordjs/builders");
const Database = require("../../../../database.js");
const { EmbedBuilder } = require("discord.js");


module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Cek info user, history nickname, dan history username")
    .addStringOption(option =>
      option.setName("user")
        .setDescription("Berupa username / user ID")
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName("reply")
        .setDescription("Menampilkan/menyembunyikan reply message")
        .setRequired(false)
        .addChoices(
          { name: "Hidden", value: "true" },
          { name: "Show", value: "false" }
        )

    ),
  run: async (client, interaction) => {
    const userID = interaction.options.getString("user");
    const ephemeral = interaction.options.getString("reply") == "true" ? true : false;


    client.cmdlog(interaction.user.username, interaction.commandName, [userID, ephemeral]);


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

    const userdb = new Database('name_tracker');

    let basecache;

    if (isNaN(userID)) {
      await interaction.channel.guild.members
        .fetch({ cache: false }).then(members => members
          .find(member => member.user.username === userID)).then((result) => {
            basecache = result
          })
    } else {
      basecache = await interaction.guild.members.cache.get(userID)
    }

    const useravatar = basecache.displayAvatarURL({ format: 'png' })
    const usertag = basecache.user.tag
    const usernickname = basecache.displayName
    const usercreated = getUserCreated(basecache.user.createdTimestamp)
    const userguildjoin = getUserCreated(basecache.joinedTimestamp)
    const userisbot = basecache.bot ? 'yes' : 'no'
    const userboost = getUserCreated(basecache.premiumSince) == null ? 'none' : getUserCreated(basecache.premiumSince)
    const useractivity = basecache.presence?.activities[0]?.name == undefined ? 'none' : basecache.presence?.activities[0]?.name

    const userboostembed =
      userboost == 'none' ? `**Boost Since**: none \n` :
        `**Boost Since**: ${userboost[0]} \n` + `**-> **||${userboost[1]}||` + '\n'


    const getnickname = (await userdb.get(`${userID}.nickname`) == null) ? [[usernickname, 'abc']] : (await userdb.get(`${userID}.nickname`))
    let nicknamelist = ''
    for (let i = 0; i <= getnickname.length - 1; i++) {
      nicknamelist = nicknamelist + getnickname[i][0] + ' → '
    }

    const embednickname = '```' + nicknamelist.slice(0, -3) + '```'

    const getusername = (await userdb.get(`${userID}.username`) == null) ? [[usertag, 'abc']] : (await userdb.get(`${userID}.username`))

    let usernamelist = ''
    try {
      for (let i = 0; i <= getusername.length - 1; i++) {
        if (getusername[i][0].includes('[AFK]')) {
          i = i + 2
        } else if (getusername[i][0] == null) {
          i = i + 1
        } else {
          usernamelist = usernamelist + getusername[i][0] + ' → '
        }
      }
    } catch (err) { }
    const embedusername = '```' + usernamelist.slice(0, -3) + '```'


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
      .setAuthor({ name: usertag, iconURL: useravatar, url: `https://discord.com/users/${userID}` })
      .setThumbnail(useravatar)
      .setColor('#fd46bc')
      .setDescription(`<@${basecache.user.id}>`)
      .addFields(
        { name: 'Information', value: embedinformation, inline: true },
        { name: 'Joined', value: embedjoined, inline: true },
        { name: `Nickname Tracker (current: ${usernickname})`, value: embednickname },
        { name: `Username Tracker (current: ${usertag})`, value: embedusername },
      )
      .setFooter({ text: '-usernickreset (userID) and -usernamereset (userID) to reset nickname/username' })

    await interaction.reply({ embeds: [embed], ephemeral: ephemeral })
  }
};