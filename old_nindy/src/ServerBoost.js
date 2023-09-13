const Discord = require('discord.js')
const Canvas = require('canvas')
const { registerFont } = require('canvas')
registerFont('./font/RedHatDisplay-Bold.ttf', { family: 'RedHatDisplay' })
const path = require('path')


module.exports = {
  name: 'ServerBoost',
  description: "ServerBoost command",
  async execute(msg, client) {
    if (!msg.member.permissions.has("ADMINISTRATOR")) { msg.reply('lu bukan admin lol') };
    try {

      const guildID = '802865003606310953' // nindy 802867983097004034 | ngck 802865003606310953

      const args = msg.content.slice(6).trim();
      const member = msg.guild.members.cache.get(args);

      const canvas = Canvas.createCanvas(1500, 1500)
      const ctx = canvas.getContext('2d')

      const background = await Canvas.loadImage(member.displayAvatarURL({ format: 'png', size: 1024 }))
      const background2 = await Canvas.loadImage(
        path.join(__dirname, '../serverboost3.png'))

      let x = 0
      let y = 0

      ctx.drawImage(background, 405, 279, 720, 720)
      ctx.drawImage(background2, x, y)
      ctx.fillStyle = '#ffffff'


      ctx.fillStyle = 'white';
      ctx.font = '82px RedHatDisplay'
      let text = `${member.user.tag}`
      ctx.textAlign = 'center';
      ctx.fillText(text, 745, 1260)


      let channelsend = msg.channel.id
      let canvasnew = member.displayAvatarURL({ format: 'png', size: 1024 })
      await client.guilds.cache.get(guildID).channels.cache.get(channelsend).send({
        files: [{
          attachment: canvas.toBuffer('image/png'), canvasnew,
          name: member.displayAvatarURL({ format: 'jpg' })
        }]
      });







    } catch (err) { msg.reply('Invalid userid'); console.log(err) }


  }
}