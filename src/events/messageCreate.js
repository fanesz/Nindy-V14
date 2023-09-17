const { ChannelType, Collection, Events } = require("discord.js")
const config = require("../config.js")
const ms = require("ms")
const cooldown = new Collection();

const userset = new Set();
const spamset = new Set();
const usersetsticker = new Set();
const spamsetsticker = new Set();
const usersetimg = new Set();
const spamsetimg = new Set();

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
    autoSpam();

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
      if (message.guildId !== config.guildID) return;
      const ignoreChannel = [
        '802865004239126541',  // #admin-chat
        '802877962575806484',  // #admin-commands
        '981498267948941342',  // #staff-chat
        '1077907820973928459', // #staff-commands
        '827113811647004713',  // #bot-commands
      ]
      if (message.author.id == '339254240012664832' && ignoreChannel.indexOf(message.channel.id) == -1) {
        setTimeout(() => {
          message.delete();
        }, 3000)
      }
    }

    async function autoSpam() {

      // to do : filter by role admin (karena error missing perms)

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
      const ignoreUser = [

      ];
      const muteRole = async (userid) => {
        const guild = client.guilds.cache.get(config.guildID);
        const role = guild.roles.cache.get(config.mute_RoleID)
        const member = await guild.members.fetch(userid)
        await member.roles.add(role)
        setTimeout(async () => {
          await member.roles.remove(role)
        }, 10000)
      }

      if (ignoreChannel.indexOf(message.channel.id) == -1 && ignoreUser.indexOf(message.author.id) == -1) {

        // image di send sekaligus, lebih dari 3 
        const imgobj = Object.fromEntries(message.attachments)
        if (message.attachments.size >= 3) {
          let imgName = []
          let imgSize = []
          let imgWidth = []
          let imgHeight = []
          for (i = 0; i <= message.attachments.size - 1; i++) {

            let imgNameraw = (Object.values(imgobj)[i]).attachment.split('/')[6]
            let imgSizeRaw = (Object.values(imgobj)[i]).size
            let imgWidthRaw = (Object.values(imgobj)[i]).width
            let imgHeightRaw = (Object.values(imgobj)[i]).height

            // console.log((Object.values(imgobj)[i]));

            imgName.push(imgNameraw)
            imgSize.push(imgSizeRaw)
            imgWidth.push(imgWidthRaw)
            imgHeight.push(imgHeightRaw)

          }
          console.log(imgSize);
          console.log(imgWidth);
          console.log(imgHeight);
          if (!(new Set(imgSize).size !== 1 || new Set(imgWidth).size !== 1 || new Set(imgHeight).size !== 1)) {
            console.log("SPAMM");
            // await client.guilds.cache.get(guildIDs).channels.cache.get(channelIDs).send('`[' + getData() + ']` :exclamation: ' + `**${message.author.tag}** detected spamming at <#${message.channelId}>`)
            await message.delete()
            message.channel.send(`<@${message.author.id}>, muted! no spam ngab <:nindy_ho:977817574500859944>`).then((m) => {
              setTimeout(() => {
                m.delete()
              }, 5000)
            })
          }
        } else if (message.attachments.size == 1) {
          let imgSize = (Object.values(imgobj)[0]).size
          if (usersetimg.has(message.author.id + imgSize)) {
            if (spamsetimg.has(message.author.id)) {
              // await client.guilds.cache.get(guildIDs).channels.cache.get(channelIDs).send('`[' + getData() + ']` :exclamation: ' + `**${message.author.tag}** detected spamming at <#${message.channelId}>`)
              muteRole(message.author.id)
              await message.delete()
              message.channel.send(`<@${message.author.id}>, chill ngab! no spam <:nindy_ho:977817574500859944>`).then((m) => {
                setTimeout(() => {
                  m.delete()
                }, 20000)
              })
              spamsetimg.delete(message.author.id)
              usersetimg.delete(message.author.id + imgSize)
            } else {
              spamsetimg.add(message.author.id)
            }
          } else {
            usersetimg.add(message.author.id + imgSize)
            setTimeout(() => {
              usersetimg.delete(message.author.id + imgSize)
            }, 2000)
          }
        }

        // sticker
        // const stickerobj = Object.fromEntries(message.stickers)
        // if (message.stickers.size >= 1) {
        //   let stickerID = Object.values(stickerobj)[0].id
        //   if (usersetsticker.has(message.author.id + stickerID)) {
        //     if (spamsetsticker.has(message.author.id)) {
        //       // await client.guilds.cache.get(guildIDs).channels.cache.get(channelIDs).send('`[' + getData() + ']` :exclamation: ' + `**${message.author.tag}** detected spamming at <#${message.channelId}>`)
        //       muteRole(message.author.id)
        //       await message.delete()
        //       message.channel.send(`<@${message.author.id}>, muted! no spam ngab <:nindy_ho:977817574500859944>`).then((m) => {
        //         setTimeout(() => {
        //           m.delete()
        //         }, 20000)
        //       })
        //     } else {
        //       spamsetsticker.add(message.author.id)
        //     }
        //   } else {
        //     usersetsticker.add(message.author.id + message.content)
        //     setTimeout(() => {
        //       usersetsticker.delete(message.author.id + message.content)
        //       spamsetsticker.delete(message.author.id)
        //     }, 10000)
        //   }
        // }

        // gif / normal message
        // if (userset.has(message.author.id + message.content)) {
        //   if (spamset.has(message.author.id)) {
        //     // await client.guilds.cache.get(guildIDs).channels.cache.get(channelIDs).send('`[' + getData() + ']` :exclamation: ' + `**${message.author.tag}** detected spamming at <#${message.channelId}>`)
        //     muteRole(message.author.id)
        //     await message.delete()
        //     message.channel.send(`<@${message.author.id}>, muted! no spam ngab <:nindy_ho:977817574500859944>`).then((m) => {
        //       setTimeout(() => {
        //         m.delete()
        //       }, 20000)
        //     })
        //     spamset.delete(message.author.id)
        //     userset.delete(message.author.id + message.content)
        //   } else {
        //     spamset.add(message.author.id)
        //   }
        // } else {
        //   userset.add(message.author.id + message.content)
        //   setTimeout(() => {
        //     userset.delete(message.author.id + message.content)
        //   }, 2000)
        // }


      }
    }



  }
};