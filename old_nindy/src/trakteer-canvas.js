  const config = require('../config.json')
const db = require('quick.db')
const Canvas = require('canvas')
const path = require('path')
const fs = require('fs')
const Discord = require('discord.js')
const attachment = new Discord.MessageAttachment('./background.png');
const { registerFont } = require('canvas')
registerFont('./font/fake_receipt.ttf', { family: 'fake_receipt' })
configData = JSON.stringify(config, null, 2);

module.exports = {
  name: 'canvas',
  description: "canvas trakteer",
  async execute(msg, client) {
    try {


      const channelbotlogs = '962197157174181909'
      const channelmention = '942414209453555793'

      console.log('donation detected')
      const trakteerdb = new db.table('trakteer')

      if (msg.channel.id === channelbotlogs) {
        if (msg.content == trakteerdb.get('LastDonation.LastDonation')) {
          msg.channel.send(`Double Donation Bug DETECTED //ignore this`)
        } else {
          trakteerdb.set('LastDonation', { LastDonation: msg.content })

          const args = msg.content.slice(3)
          let splitargs = args.split('++++')
          let ordernama = splitargs[0]
          let ordernominal = splitargs[1].split("via")
          let ordermessage = splitargs[2]
          let ordertanggal = splitargs[3]

          let avatar = 'https://i.imgur.com/tGO0FJl.png'
          if (ordernama.length == 18) {
            try {
              await client.users.fetch(ordernama).then((m) => {
                avatar = "https://cdn.discordapp.com/avatars/" + ordernama + '/' + m.avatar + ".jpeg"
                ordernama = m.tag
              })
            } catch (err) { }
          } else if (ordernama.includes('#')) {
            console.log('1');
            await msg.channel.guild.members
              .fetch({ cache: false }).then(members => members
                .find(member => member.user.tag === ordernama)).then((result) => {
                  avatar = "https://cdn.discordapp.com/avatars/" + result.user.id + '/' + result.user.avatar + ".jpeg"
                  ordernama = result.user.tag
                })
          }


          const canvas = Canvas.createCanvas(1500, 1500)
          const ctx = canvas.getContext('2d')

          const foto = await Canvas.loadImage(avatar)
          const background = await Canvas.loadImage(
            path.join(__dirname, './img/donaturv2.1.png'))
          let x = 0
          let y = 0
          ctx.drawImage(foto, 178, 569, 365, 365)
          ctx.drawImage(background, x, y)
          ctx.fillStyle = '#ffffff'
          const centerreceipt = 1040

          //total : Rp.
          ctx.fillStyle = 'black';
          ctx.font = '30px fake_receipt'
          if (ordernominal[0].endsWith(' ')) { ordernominal[0] = ordernominal[0].slice(0, -1) }
          let text = `TOTAL : ${ordernominal[0]}-,`
          ctx.textAlign = 'center'
          ctx.fillText(text, centerreceipt, 840)

          //file report
          let filereport = ordernominal[0].replace('Rp ', '').split('.')
          filereport = parseInt(filereport[0]) / 2

          ctx.font = '50px fake_receipt'
          text = `FILE REPORT X${filereport}`
          ctx.textAlign = 'center'
          ctx.fillText(text, centerreceipt, 780)

          //date
          ctx.font = '20px fake_receipt'
          text = `-- ${ordertanggal} --`
          ctx.textAlign = 'center'
          ctx.fillText(text, centerreceipt, 981)


          //nama


          let itungnama = ordernama.length
          let namafontsize = 0

          namafontsize =
            (itungnama <= 20) ? 30 :
              (itungnama <= 25) ? 26 :
                (itungnama <= 30) ? 22 : 21

          ctx.font = namafontsize + 'px fake_receipt'
          text = `DONATOR : ${ordernama}`
          ctx.textAlign = 'center'
          ctx.fillText(text, centerreceipt, 435)


          //text

          let itungtext = ordermessage.length
          ordermessage =
            (ordermessage.endsWith(' ')) ? ordermessage.slice(0, -1) : ordermessage
          ordermessage = '"' + ordermessage + '"'

          let splitmsg = ordermessage.replaceAll('  ', '').split(' ')
          // for (let kata of splitmsg){
          //    if(kata.length >= 15){
          //       kata
          //    }
          // }
          // 20 - 1line
          let textfontsize = 30
          if (itungtext <= 20) {
            ctx.font = textfontsize + 'px fake_receipt'
            text = `${ordermessage}`
            ctx.textAlign = 'center'
            ctx.fillText(text, centerreceipt, 1180)
            // 40 - 2line
          } else if (itungtext <= 40) {
            let line1 = ''
            let line1end;
            for (let i = 0; i <= splitmsg.length - 1; i++) {
              if (line1.length <= 20) {
                line1 = line1 + splitmsg[i] + ' '
              } else {
                while (line1.endsWith(' ')) {
                  line1 = line1.slice(0, -1)
                }
                line1end = i
                break
              }
            }

            let line2 = ''
            for (let i = line1end; i <= splitmsg.length - 1; i++) {
              line2 = line2 + splitmsg[i] + ' '
            }

            ctx.font = textfontsize + 'px fake_receipt'
            ctx.textAlign = 'center'
            text = `${line1}`
            ctx.fillText(text, centerreceipt, 1155)
            text = `${line2}`
            ctx.fillText(text, centerreceipt, 1187)
            // 55 - 2 line
          } else if (itungtext <= 55) {
            textfontsize = 25
            let line1 = ''
            let line1end;
            for (let i = 0; i <= splitmsg.length - 1; i++) {
              if (line1.length <= 26) {
                line1 = line1 + splitmsg[i] + ' '
              } else {
                // line1 = line1.replace(splitmsg[i-1], '')
                while (line1.endsWith(' ')) {
                  line1 = line1.slice(0, -1)
                }
                line1end = i
                break
              }
            }
            let line2 = ''
            for (let i = line1end; i <= splitmsg.length - 1; i++) {
              line2 = line2 + splitmsg[i] + ' '
            }

            ctx.font = textfontsize + 'px fake_receipt'
            ctx.textAlign = 'center'
            text = `${line1}`
            ctx.fillText(text, centerreceipt, 1155)
            text = `${line2}`
            ctx.fillText(text, centerreceipt, 1187)
            // 80 - 3line
          } else if (itungtext <= 80) {
            textfontsize = 25
            let line1 = ''
            let line1end;
            for (let i = 0; i <= splitmsg.length - 1; i++) {
              if (line1.length <= 26) {
                line1 = line1 + splitmsg[i] + ' '
              } else {
                // line1 = line1.replace(splitmsg[i-1], '')
                while (line1.endsWith(' ')) {
                  line1 = line1.slice(0, -1)
                }
                line1end = i
                break
              }
            }
            let line2 = ''
            let line2end;
            for (let i = line1end; i <= splitmsg.length - 1; i++) {
              if (line2.length <= 26) {
                line2 = line2 + splitmsg[i] + ' '
              } else {
                while (line2.endsWith(' ')) {
                  line2 = line2.slice(0, -1)
                }
                line2end = i
                break
              }
            }

            let line3 = ''
            for (let i = line2end; i <= splitmsg.length - 1; i++) {
              line3 = line3 + splitmsg[i] + ' '
            }

            ctx.font = textfontsize + 'px fake_receipt'
            ctx.textAlign = 'center'
            text = `${line1}`
            ctx.fillText(text, centerreceipt, 1140)
            text = `${line2}`
            ctx.fillText(text, centerreceipt, 1172)
            text = `${line3}`
            ctx.fillText(text, centerreceipt, 1204)
          }
          // 115 4 line
          else if (itungtext <= 115) {
            textfontsize = 25
            let line1 = ''
            let line1end;
            for (let i = 0; i <= splitmsg.length - 1; i++) {
              if (line1.length <= 26) {
                line1 = line1 + splitmsg[i] + ' '
              } else {
                // line1 = line1.replace(splitmsg[i-1], '')
                while (line1.endsWith(' ')) {
                  line1 = line1.slice(0, -1)
                }
                line1end = i
                break
              }
            }
            let line2 = ''
            let line2end;
            for (let i = line1end; i <= splitmsg.length - 1; i++) {
              if (line2.length <= 26) {
                line2 = line2 + splitmsg[i] + ' '
              } else {
                while (line2.endsWith(' ')) {
                  line2 = line2.slice(0, -1)
                }
                line2end = i
                break
              }
            }

            let line3 = ''
            let line3end;
            for (let i = line2end; i <= splitmsg.length - 1; i++) {
              if (line3.length <= 26) {
                line3 = line3 + splitmsg[i] + ' '
              } else {
                while (line3.endsWith(' ')) {
                  line3 = line3.slice(0, -1)
                }
                line3end = i
                break
              }
            }

            let line4 = ''
            for (let i = line3end; i <= splitmsg.length - 1; i++) {
              line4 = line4 + splitmsg[i] + ' '
            }
            ctx.font = textfontsize + 'px fake_receipt'
            ctx.textAlign = 'center'
            text = `${line1}`
            ctx.fillText(text, centerreceipt, 1120)
            text = `${line2}`
            ctx.fillText(text, centerreceipt, 1152)
            text = `${line3}`
            ctx.fillText(text, centerreceipt, 1184)
            text = `${line4}`
            ctx.fillText(text, centerreceipt, 1216)
          }

          else {
            textfontsize = 25
            let line1 = ''
            let line1end;
            for (let i = 0; i <= splitmsg.length - 1; i++) {
              if (line1.length <= 26) {
                line1 = line1 + splitmsg[i] + ' '
              } else {
                // line1 = line1.replace(splitmsg[i-1], '')
                while (line1.endsWith(' ')) {
                  line1 = line1.slice(0, -1)
                }
                line1end = i
                break
              }
            }
            let line2 = ''
            let line2end;
            for (let i = line1end; i <= splitmsg.length - 1; i++) {
              if (line2.length <= 26) {
                line2 = line2 + splitmsg[i] + ' '
              } else {
                while (line2.endsWith(' ')) {
                  line2 = line2.slice(0, -1)
                }
                line2end = i
                break
              }
            }

            let line3 = ''
            let line3end;
            for (let i = line2end; i <= splitmsg.length - 1; i++) {
              if (line3.length <= 26) {
                line3 = line3 + splitmsg[i] + ' '
              } else {
                while (line3.endsWith(' ')) {
                  line3 = line3.slice(0, -1)
                }
                line3end = i
                break
              }
            }

            let line4 = ''
            for (let i = line3end; i <= splitmsg.length - 1; i++) {
              if (line4.length <= 20) {
                line4 = line4 + splitmsg[i] + ' '
              } else {
                while (line4.endsWith(' ')) {
                  line4 = line4.slice(0, -2) + '..."'
                }
                break
              }
            }
            ctx.font = textfontsize + 'px fake_receipt'
            ctx.textAlign = 'center'
            text = `${line1}`
            ctx.fillText(text, centerreceipt, 1120)
            text = `${line2}`
            ctx.fillText(text, centerreceipt, 1152)
            text = `${line3}`
            ctx.fillText(text, centerreceipt, 1184)
            text = `${line4}`
            ctx.fillText(text, centerreceipt, 1216)
          }




          let canvasnew = "./img/donaturv2.1.png"
          client.guilds.cache.get("802865003606310953").channels.cache.get(channelmention).send({
            files: [{
              attachment: canvas.toBuffer(), canvasnew,
              name: 'background.png'
            }]
          });
          msg.reply(`sent to -> <#${channelmention}>`)
          // msg.reply({
          //       files: [{
          //       attachment: canvas.toBuffer(), canvasnew,
          //       name: 'donaturv2.1.png'
          //   }]})

        } //else double cek
      }




    } catch (err) { console.log(err) }

  }
}