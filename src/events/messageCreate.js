const { ChannelType, Collection, Events, PermissionsBitField } = require("discord.js")
const config = require("../config.js")
const ms = require("ms")
const cooldown = new Collection();

const usersetimg = new Set();
const spamsetimg = new Set();
const usersetsticker = new Set();
const spamsetsticker = new Set();
const userset = new Set();
const spamset = new Set();


module.exports = {
  name: Events.MessageCreate,
  once: false,
  execute: async (message) => {
    if (message.author.bot) return;
    if (message.channel.type === ChannelType.DM) return;

    const client = message.client;
    const prefix = config.prefix;


    registerCommands();
    autoDeleteAmariBotMessage();
    antiSpam();

    function registerCommands() {
      if (!message.content.startsWith(prefix)) return;
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
      const cmd = args.shift().toLowerCase();
      if (cmd.length == 0) return;
      let command = client.commands.get(cmd)
      if (!command) command = client.commands.get(client.commandaliases.get(cmd));
      if (command) {
        if (command.cooldown) {
          if (cooldown.has(`${command.name}${message.author.id}`)) return message.reply({ content: `Command on Cooldown \`${ms(cooldown.get(`${command.name}${message.author.id}`) - Date.now(), { long: true }).replace("minutes", `menit`).replace("seconds", `detik`).replace("second", `detik`).replace("ms", `ms`)}\` coba lagi nanti.` }).then(message => setTimeout(() => message.delete(), cooldown.get(`${command.name}${message.author.id}`) - Date.now()))
          command.run(client, message, args)
          cooldown.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
          setTimeout(() => {
            cooldown.delete(`${command.name}${message.author.id}`)
          }, command.cooldown);
        } else {
          command.run(client, message, args)
        }
      }
    }

    function autoDeleteAmariBotMessage() {
      if (message.guildId !== config.guildID || message.author.id != '339254240012664832') return;
      const ignoreChannel = [
        '802865004239126541',  // #admin-chat
        '802877962575806484',  // #admin-commands
        '981498267948941342',  // #staff-chat
        '1077907820973928459', // #staff-commands
        '827113811647004713',  // #bot-commands
      ]
      if (ignoreChannel.indexOf(message.channel.id) == -1) {
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

      const spamDetected = async (user, channel) => {
        const guild = client.guilds.cache.get(config.guildID);
        const role = guild.roles.cache.get(config.mute_RoleID)
        const member = await guild.members.fetch(user)
        await member.roles.add(role);
        setTimeout(async () => {
          await member.roles.remove(role);
        }, 10000);

        message.channel.send(`<@${user}>, muted 10s! no spam ngab <:nindy_ho:977817574500859944>`);
        client.spamlog(user, channel);
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
            spamDetected(message.author.id, message.channelId);
          }
          // di send spam minimal 3x
        } else if (message.attachments.size == 1) {
          let imgSize = (Object.values(Object.fromEntries(message.attachments))[0]).size;
          if (usersetimg.has(message.author.id + imgSize)) {
            if (spamsetimg.has(message.author.id)) {
              spamDetected(message.author.id, message.channelId);
              spamsetimg.delete(message.author.id);
              usersetimg.delete(message.author.id + imgSize);
            } else {
              spamsetimg.add(message.author.id);
            }
          } else {
            usersetimg.add(message.author.id + imgSize);
            setTimeout(() => {
              usersetimg.delete(message.author.id + imgSize);
            }, 4000)
          }
        }
      }

      // Sticker
      if (message.stickers.size !== 0) {
        let stickerID = Object.values(Object.fromEntries(message.stickers))[0].id;
        if (usersetsticker.has(message.author.id + stickerID)) {
          if (spamsetsticker.has(message.author.id)) {
            spamDetected(message.author.id, message.channelId);
          } else {
            spamsetsticker.add(message.author.id);
          }
        } else {
          usersetsticker.add(message.author.id + message.content);
          setTimeout(() => {
            usersetsticker.delete(message.author.id + message.content);
            spamsetsticker.delete(message.author.id);
          }, 10000)
        }
      }

      // Normal Msg / GIF
      if (userset.has(message.author.id + message.content)) {
        if (spamset.has(message.author.id)) {
          spamDetected(message.author.id, message.channelId);
          spamset.delete(message.author.id);
          userset.delete(message.author.id + message.content);
        } else {
          spamset.add(message.author.id);
        }
      } else {
        userset.add(message.author.id + message.content);
        setTimeout(() => {
          userset.delete(message.author.id + message.content);
        }, 5000)
      }


    }



  }
};