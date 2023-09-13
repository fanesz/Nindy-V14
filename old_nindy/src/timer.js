const config = require("../config.json")
const Discord = require('discord.js')

module.exports = {
  name: 'timer',
  description: "timer command",
  execute(msg) {
    try {
      function sendTimer(time) {
        let timestamp = `<t:${(Math.floor((new Date().getTime() + time) / 1000))}:R>`;
        let embed = new Discord.MessageEmbed()
          .setDescription(`Timer set!, Nindy will tag u ${timestamp} <:nindy_yes:977817511821213757>`)
          .setColor('fd46bc')
        msg.reply({ embeds: [embed] }).then((m) => {
          setTimeout(() => {
            m.delete()
          }, time)
        })
      }
      function timerEnd(args) {
        let embed = new Discord.MessageEmbed()
          .setDescription('`' + args + '` telah berlalu!! <:nindy_huh:977817482683367544>')
          .setColor('fd46bc')
        msg.reply({ embeds: [embed] })
      }

      if (msg.content.endsWith(config.prefix + 'timer')) {
        msg.reply(config.prefix + `timer (angka)m (angka)s  |  ${config.prefix}timer (angka dalam detik) <:nindy_hump:977817319512367104>`)
      }
      else if (msg.content.endsWith(config.prefix + 'timer ')) {
        msg.reply(config.prefix + `timer (angka)m (angka)s  |  ${config.prefix}timer (angka dalam detik) <:nindy_hump:977817319512367104>`)
      }

      else if (msg.content.startsWith(config.prefix + 'timer')) {
        if (msg.author.bot) return;
        const args = msg.content.slice(6).trim();
        if (args.includes('.')) {
          msg.reply('Timer tidak boleh ada titik! <:nindy_hump:977817319512367104>')
        }
        else if (args.includes(',')) {
          msg.reply('Timer tidak boleh ada koma! <:nindy_hump:977817319512367104>')
        }
        else if (args.includes('m')) {
          let menit = args.split('m');
          if (menit[1].includes('s')) {
            let second = menit[1].split('s');
            let minute = menit[0] * 60
            let x = minute * 1
            let y = second[0] * 1
            if (x > 1440) { msg.reply('Timer tidak boleh lebih dari 1440m/24jam <:nindy_hump:977817319512367104>') }
            else if (y > 3600) { msg.reply('Timer tidak boleh lebih dari 3600s/1jam, gunakan -timer (angka)m <:nindy_hump:977817319512367104>') }
            else if (x % 1 != 0) { msg.reply(config.prefix + `timer (angka)m (angka)s  |  ${config.prefix}timer (angka dalam detik) <:nindy_hump:977817319512367104>`) }
            else if (y % 1 != 0) { msg.reply(config.prefix + `timer (angka)m (angka)s  |  ${config.prefix}timer (angka dalam detik) <:nindy_hump:977817319512367104>`) }
            else if (Number.isNaN(+x)) { msg.reply(config.prefix + `timer (angka)m (angka)s  |  ${config.prefix}timer (angka dalam detik) <:nindy_hump:977817319512367104>`) }
            else if (Number.isNaN(+y)) { msg.reply(config.prefix + `timer (angka)m (angka)s  |  ${config.prefix}timer (angka dalam detik) <:nindy_hump:977817319512367104>`) }
            else {
              let hasilakhir = [x, y].reduce((a, b) => a + b);
              // msg.reply(`Timer set to ${args}! <:nindy_yes:977817511821213757>`)
              hasilakhirsend = hasilakhir * 1000
              sendTimer(hasilakhirsend)
              setTimeout(() => {
                timerEnd(args)
              }, hasilakhirsend);
            }
          } else {
            let onlymenit = args.split('m');
            onlymenitdisaray = onlymenit[0] * 1
            hasilonlymenit = onlymenitdisaray * 1000 * 60
            if (Number.isNaN(+onlymenitdisaray)) { msg.reply(config.prefix + `timer (angka)m (angka)s  |  ${config.prefix}timer (angka dalam detik)`) }
            else if (onlymenitdisaray > 1440) { msg.reply('Timer tidak boleh lebih dari 1440m/24jam') }
            else {
              // msg.reply(`Timer set to ${args} <:nindy_yes:977817511821213757>`)
              sendTimer(hasilonlymenit)
              setTimeout(() => {
                timerEnd(args)
              }, hasilonlymenit);
            }
          }
          return;
        } else if (!args.includes('m')) {
          if (args.includes('s')) {
            let onlys = args.split('s');
            let disaray = onlys[0] * 1
            let sending = disaray * 1000
            if (Number.isNaN(+disaray)) { msg.reply(config.prefix + `timer (angka)m (angka)s  |  ${config.prefix}timer (angka dalam detik) <:nindy_hump:977817319512367104>`) }
            else if (disaray > 3600) { msg.reply('Timer tidak boleh lebih dari 3600s/1jam, gunakan -timer (angka)m <:nindy_hump:977817319512367104>') }
            else if (sending % 1 == 0) {
              // msg.reply(`Timer set to ${args}! <:nindy_yes:977817511821213757>`);
              sendTimer(sending)
              setTimeout(() => {
                timerEnd(args)
              }, sending);
              return;
            }

          } else if (!args.includes('s')) {
            let timerA = msg.content.slice(6).trim();
            let sending = timerA * 1000
            if (Number.isNaN(+sending)) { msg.reply(config.prefix + `timer (angka)m (angka)s  |  ${config.prefix}timer (angka dalam detik) <:nindy_hump:977817319512367104>`) }
            else if (sending > 3600000) { msg.reply('Timer tidak boleh lebih dari 3600s/1jam, gunakan -timer (angka)m! <:nindy_hump:977817319512367104>') }
            else if (timerA % 1 == 0) {
              // msg.reply(`Timer set to ${timerA}s! <:nindy_yes:977817511821213757>`);
              sendTimer(sending)
              setTimeout(() => {
                timerEnd(timerA + 's')
              }, sending);
              return;
            }
          }
        } else {
          msg.reply(config.prefix + `timer (angka)m (angka)s  |  ${config.prefix}timer (angka dalam detik) <:nindy_hump:977817319512367104>`)
        }

      }

    } catch (err) { console.log(err); }
  }
}