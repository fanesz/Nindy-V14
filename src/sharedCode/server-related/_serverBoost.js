const Canvas = require('canvas')
const { registerFont } = require('canvas')
registerFont('./font/RedHatDisplay-Bold.ttf', { family: 'RedHatDisplay' })
const path = require('path');
const config = require('../../config');

module.exports = {
  name: "boost",
  run: async (client, message, args, interaction, sendTarget) => {
    let userID;
    let ephemeral = false;
    if (interaction !== null) { // slash
      userID = interaction.options.getString("user");
      ephemeral = interaction.options.getString("reply") == "true" ? true : false;
      client.cmdlog(interaction.user.username, interaction.commandName, [userID, ephemeral]);
    } else { // prefix
      userID = args[0];
    };

    let basecache;
    const commandType = interaction || message;
    try {
      if (isNaN(userID)) {
        await commandType.channel.guild.members
          .fetch({ cache: false }).then(members => members
            .find(member => member.displayName === userID)).then((result) => {
              basecache = result
              userID = basecache.user.id
            });
      } else {
        basecache = await commandType.guild.members.cache.get(userID)
      };
    } catch (err) {
      return client.errReply(commandType, 'UserID / Username not found!');
    };

    const canvas = Canvas.createCanvas(1500, 1500)
    const ctx = canvas.getContext('2d')

    const userProfile = await Canvas.loadImage(
      basecache.displayAvatarURL({ extension: 'png', size: 1024 })
    );
    const templeteImage = await Canvas.loadImage(
      path.join(__dirname, '../../../img/serverboost.png')
    );

    ctx.drawImage(userProfile, 405, 279, 720, 720);
    ctx.drawImage(templeteImage, 0, 0);
    ctx.fillStyle = '#ffffff';
    ctx.font = '82px RedHatDisplay';
    let text = `${basecache.user.username}`;
    ctx.textAlign = 'center';
    ctx.fillText(text, 745, 1260);

    let canvasnew = basecache.displayAvatarURL({ extension: 'png', size: 1024 });

    if (sendTarget) {
      const user = `<@${message.author.id}>`;
      await client.channels.cache.get(sendTarget).send({
        content: [
          `Nindy detect a boost from <#${config.honorable_LogChannelID}>, so Nindy generate it automatically (❁´◡\`❁)\n`,
          'Here some thank you templete that you can use!\n',
          `\`\`\`Thanks to ${user} atas boostnya!, semoga sehat selalu <:nindy_yes:977817511821213757> <:nindy_menggokil:977817690121076746>\`\`\``,
          `\`\`\`Thanks bang ${user} untuk boostnya\`\`\``,
          `\`\`\`thx ${user} atas boostnya\`\`\``,
          `\`\`\`Terima kasih buat ${user} atas boostnya!\`\`\``,
          `\`\`\`thengs ${user} atas boostnya\`\`\``
        ].join(''),
        files: [{
          attachment: canvas.toBuffer('image/png'), canvasnew,
          name: basecache.displayAvatarURL({ extension: 'png' }) + '.png'
        }],
        allowedMentions: { repliedUser: false }
      })
    } else {
      commandType.reply({
        files: [{
          attachment: canvas.toBuffer('image/png'), canvasnew,
          name: basecache.displayAvatarURL({ extension: 'png' }) + '.png'
        }],
        ephemeral: ephemeral
      });
    }


  }
};