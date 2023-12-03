const { ChannelType, Collection, Events, PermissionsBitField, EmbedBuilder, WebhookClient } = require("discord.js")
require("dotenv").config();
const config = require("../config.js")
const ms = require("ms");
const _serverBoost = require("../sharedCode/server-related/_serverBoost.js");
const _donate = require("../sharedCode/server-related/_donate.js");
const { getDateDiff, replyMessage } = require("../utils/utils.js");
const Canvas = require('canvas');
const { registerFont } = require('canvas');
registerFont('./font/Butler_Bold.ttf', { family: 'ButlerBold' });
const path = require('path');
const cooldown = new Collection();

const usersetimg = new Set();
const spamsetimg = new Set();
const usersetsticker = new Set();
const spamsetsticker = new Set();
const userset = new Set();
const spamset = new Set();
const userautomod = new Set();
const serverboost = new Set();

module.exports = {
  name: Events.MessageCreate,
  once: false,
  execute: async (message) => {
    if (message.author.bot && !message.webhookId) return;
    if (message.channel.type === ChannelType.DM) return;

    const client = message.client;
    const prefix = config.prefix;
    const userID = message.author.id;
    const username = message.author.username;

    registerCommands();
    autoDeleteAmariBotMessage();
    antiSpam();
    automodWarn();
    autoDetectBooster();
    autoDetectDonatur();
    folksRole();
    yearOfServiceRole();

    if (process.env.DEPLOY_CONTEXT == "dev") {
      trakteerWebhookTest();
    }

    function registerCommands() {
      if (!message.content.startsWith(prefix)) return;
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();
      if (cmd.length == 0) return;
      let command = client.commands.get(cmd)
      if (!command) command = client.commands.get(client.commandaliases.get(cmd));
      if (command) {
        if (command.cooldown) {
          if (cooldown.has(`${command.name}${userID}`)) {
            message.reply({
              content: `Command on Cooldown \`${ms(cooldown.get(`${command.name}${userID}`) - Date.now(), { long: true }).replace("minutes", `menit`).replace("seconds", `detik`).replace("second", `detik`).replace("ms", `ms`)}\` coba lagi nanti OwO`,
              allowedMentions: { repliedUser: false }
            }).then(msg => {
              setTimeout(() => {
                msg.delete();
              }, cooldown.get(`${command.name}${userID}`) - Date.now())
            })
            return
          }
          command.run(client, message, args)
          cooldown.set(`${command.name}${userID}`, Date.now() + command.cooldown)
          setTimeout(() => {
            cooldown.delete(`${command.name}${userID}`)
          }, command.cooldown);
        } else {
          command.run(client, message, args)
        }
      }
    }

    function autoDeleteAmariBotMessage() {
      if (message.guildId !== config.guildID || userID != '339254240012664832') return;
      const ignoreChannel = [
        '802865004239126541',  // #admin-chat
        '802877962575806484',  // #admin-commands
        '981498267948941342',  // #staff-chat
        '1077907820973928459', // #staff-commands
        '827113811647004713',  // #bot-commands
      ]
      if (ignoreChannel.indexOf(message.channelId)) {
        setTimeout(() => {
          message.delete();
        }, 3000)
      }
    }

    async function antiSpam() {
      if (message.guildId !== config.guildID) return;
      const ignoreChannel = [
        '802920713710600262',  // #bot-mudae
        '930025413391032350',  // #temvur-istri
        '827113811647004713',  // #bot-commands
        '802865004239126543',  // #bot-music
        '802877962575806484',  // #mudae
        '802865004239126541',  // #admin-chat
        '802877962575806484',  // #admin-commands
        '981498267948941342',  // #staff-chat
        '1077907820973928459', // #staff-commands
      ];
      const ignoreRole = [
        '1033942560814678026', // CEO
        '802874936749588550',  // CEO
        '1101680918214746143', // COO
        '992790117460738139',  // Administrator
        '802874710693773352',  // ModBot
        '802865745238294528',  // Staff
        '1101681245840228402', // Fesbuk Staff
        '802866779516960778',  // Bots
        '1100630419659038751', // Playground Bots
        // '803908099629907990',  // debug
      ]

      if (ignoreChannel.indexOf(message.channel.id) !== -1) return;
      if (message.member.roles.cache.find(r => ignoreRole.indexOf(r.id) !== -1)) return;
      if (message.member.permissionsIn(message.channel.id).has(PermissionsBitField.Flags.Administrator)) return;

      const spamDetected = async (user, channel, msg = '') => {
        const guild = client.guilds.cache.get(config.guildID);
        const role = guild.roles.cache.get(config.mute_RoleID)
        const member = await guild.members.fetch(user)

        if (userautomod.has(user)) {
          await member.send("We kick you from NTC Department because we detected you spamming a forbidden message. If this is a mistakes, please rejoin (discord.gg/neoteric) or dm <@278169600728760320>!")
          await member.kick("Spamming a forbidden message")
          userautomod.delete(user);
          client.kickLog(user, `detected spamming a forbidden word and i kick him (●'◡'●) tehe//`);
          message.channel.send(`<@${user}>, kicked! ~(=^‥^)ノ`);
          return;
        } else {
          userautomod.add(user);
          setTimeout(() => {
            userautomod.delete(user);
          }, 30000)
        };

        await member.roles.add(role);
        setTimeout(async () => {
          await member.roles.remove(role);
        }, 10000);

        message.channel.send(`<@${user}>, muted 10s! no spam ngab <:nindy_ho:977817574500859944>`);
        client.spamlog(user, channel, msg);
      }

      // Image
      if (message.attachments.size !== 0) {
        // sekaligus dikirim lebih dari 3 image
        if (message.attachments.size >= 3) {
          let imgName = []; let imgSize = []; let imgWidth = []; let imgHeight = [];
          Object.values(Object.fromEntries(message.attachments)).map((img) => {
            imgName.push(img.attachment.split('/')[6]);
            imgSize.push(img.size);
            imgWidth.push(img.width);
            imgHeight.push(img.height);
          });

          if (!(new Set(imgSize).size !== 1 || new Set(imgWidth).size !== 1 || new Set(imgHeight).size !== 1)) {
            spamDetected(userID, message.channelId);
          }
          // di send spam minimal 3x
        } else if (message.attachments.size == 1) {
          let imgSize = (Object.values(Object.fromEntries(message.attachments))[0]).size;
          if (usersetimg.has(userID + imgSize)) {
            if (spamsetimg.has(userID)) {
              spamDetected(userID, message.channelId);
              spamsetimg.delete(userID);
              usersetimg.delete(userID + imgSize);
            } else {
              spamsetimg.add(userID);
            }
          } else {
            usersetimg.add(userID + imgSize);
            setTimeout(() => {
              usersetimg.delete(userID + imgSize);
            }, 4000)
          }
        }
      }

      // Sticker
      if (message.stickers.size !== 0) {
        let stickerID = Object.values(Object.fromEntries(message.stickers))[0].id;
        if (usersetsticker.has(userID + stickerID)) {
          if (spamsetsticker.has(userID)) {
            spamDetected(userID, message.channelId);
          } else {
            spamsetsticker.add(userID);
          }
        } else {
          usersetsticker.add(userID + message.content);
          setTimeout(() => {
            usersetsticker.delete(userID + message.content);
            spamsetsticker.delete(userID);
          }, 10000)
        }
      }

      // Normal Msg / GIF
      if (userset.has(userID + message.content)) {
        if (spamset.has(userID)) {
          spamDetected(userID, message.channelId, message.content);
          spamset.delete(userID);
          userset.delete(userID + message.content);
        } else {
          spamset.add(userID);
        }
      } else {
        const whitelistedMessage = [
          'm!skip',
          'm!s'
        ]
        if (whitelistedMessage.indexOf(message.content.toLowerCase()) === -1) {
          userset.add(userID + message.content);
          setTimeout(() => {
            userset.delete(userID + message.content);
          }, 5000)
        }
      }
    }

    async function automodWarn() {
      if (message.channelId !== config.automod_LogChannelID) return;
      const guild = client.guilds.cache.get(config.guildID);
      const member = await guild.members.fetch(userID)
      const rule = message.embeds[0].data.fields[0].value;
      const matchMessage = message.embeds[0].data.description;
      await member.send(`Our AutoMod detected you send a message that contains a forbidden word: \`${matchMessage}\`, with a rule: \`${rule}\`. If you keep doing this, you will be kicked from NTC Department.\n If you want to share a discord link, please separated it or contact admin (❁´◡\`❁), Thank you!`)
    }

    async function autoDetectBooster() {
      if (message.channelId !== config.honorable_LogChannelID) return;
      if (![8, 9, 10, 11].includes(message.type)) return;
      if (serverboost.has(userID)) return;
      await _serverBoost.run(client, message, [userID], null, config.staffCommand_LogChannelID);
      serverboost.add(userID)
      setTimeout(() => {
        serverboost.delete(userID)
      }, 60000);
    }

    async function autoDetectDonatur() {
      if (message.channelId !== config.donatur_LogChannelID) return;
      if (message.embeds.length === 0) return;
      await _donate.run(client, message, null, null, message);
    }

    async function trakteerWebhookTest() {
      if (userID !== '278169600728760320') return;
      if (message.content !== config.prefix + 'test trakteer') return;
      const webhookClient = new WebhookClient({ url: process.env.TEST_WEBHOOK_DONATUR });
      const embed = new EmbedBuilder()
        .setAuthor({ name: 'vanezzz', iconURL: 'https://i.imgur.com/AfFp7pu.png' })
        .setTitle('Trakteer 1 File Report')
        .setDescription('trakteer.id/neoteric');

      webhookClient.send({
        username: 'Trakteer-Test',
        embeds: [embed],
      });
    }

    async function folksRole() {
      if (message.author.bot) return;
      const userRoleCache = message.member.roles.cache;
      const bypassRoles = [
        config.folks_RoleID, // Folks
        '940529460820705280', // Low-Level Agent
        '940530272036855838', // High-Level Agent
        '940530271986528256', // Specialist Agent
        '940530271906832404', // Certified Agent
      ]
      if (!userRoleCache.find(r => bypassRoles.includes(r.id))) {
        await message.member.roles.add(config.folks_RoleID);
      }
    }

    async function yearOfServiceRole() {
      if (message.author.bot) return;
      const userYear = getDateDiff(await message.guild.members.cache.get(userID)?.joinedAt);
      const blacklistedChannel = [
        '802919702422355969', // #Introduction
        '802868478683906079', // #game-updates
      ]
      if (blacklistedChannel.includes(message.channelId) || userYear[0] === 0) return;
      const userRoleCache = message.member.roles.cache;

      // const replyMsg1Year = [
      //   `**Thank you for your 1 Year Service** <@${userID}> 🎉 <:nindy_yes:977817511821213757>\n_(Received 1 Year Operation Badge, Check out your profile!)_`,
      //   `**Your hard work and perseverance have paid off. Congratulations** <@${userID}> 🧤\n_(Received 1 Year Operation Badge, Check out your profile!)_`,
      //   `**You did it <@${userID}>! We knew you could!, take this 1 Year Operation Badge as a Token of Appreciation** :identification_card:\n_(Received 1 Year Operation Badge, Check out your profile!)_`,
      // ]
      // const replyMsg2Year = [
      //   `**Thank you sir for your wonderfull 2 Year of Service** <@${userID}> 🎉 <:nindy_yes:977817511821213757>\n_(Received 2 Year Operation Badge, Check out your profile!)_`,
      //   `**Nindy know your hard work in this 2 year of Service. Congratulations** <@${userID}> 🧤\n_(Received 2 Year Operation Badge, Check out your profile!)_`,
      //   `**Well done <@${userID}>! We knew you could!, take this 2 Year Operation Badge as a Token of Appreciation** :identification_card:\n_(Received 2 Year Operation Badge, Check out your profile!)_`,
      // ]
      const replyMsg3Year = [
        `**Thank you sir for your amazing 3 Year of Service** <@${userID}> 🎉 <:nindy_yes:977817511821213757>\n_(Received 3 Year Operation Badge, Check out your profile!)_`,
      ]

      if (userYear[0] === 1) {
        if (await userRoleCache.find(r => r.id === config.oneYearServiceRole)) return;
        await message.member.roles.add(config.oneYearServiceRole)
        // const randomMessage = replyMsg1Year[Math.floor(Math.random() * replyMsg1Year.length)];
        // replyMessage(message, randomMessage, null, false, false);
      } else if (userYear[0] === 2) {
        if (await userRoleCache.find(r => r.id === config.twoYearServiceRole)) return;
        try {
          await message.member.roles.remove(config.oneYearServiceRole)
        } catch (err) { }
        await message.member.roles.add(config.twoYearServiceRole)
        // const randomMessage = replyMsg2Year[Math.floor(Math.random() * replyMsg2Year.length)];
        // replyMessage(message, randomMessage, null, false, false);
      } else if (userYear[0] === 3) {
        if (await userRoleCache.find(r => r.id === config.threeYearServiceRole)) return;
        try {
          await message.member.roles.remove(config.oneYearServiceRole)
          await message.member.roles.remove(config.twoYearServiceRole)
        } catch (err) { }
        await message.member.roles.add(config.twoYearServiceRole)

        const canvas = Canvas.createCanvas(1920, 530)
        const ctx = canvas.getContext('2d')

        const templeteImage = await Canvas.loadImage(
          path.join(__dirname, '../../img/3rd_year_operation.png')
        );

        const updatedUsername = username.length > 16 ? username.slice(0, 16) + '...' : username;
        ctx.drawImage(templeteImage, 0, 0);
        ctx.fillStyle = '#000000';
        ctx.font =
          (username.length <= 8 ? '160px' :
            username.length <= 12 ? '120px' :
              username.length <= 16 ? '100px' : '85px') + ' ButlerBold';
        let text = `${updatedUsername}`;
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 1700, 280);

        await message.channel.send({
          content: replyMsg3Year[0],
          files: [{
            attachment: canvas.toBuffer('image/png'),
            name: message.author.displayAvatarURL({ extension: 'png' })
          }],
        })

      }
    }

  }
};