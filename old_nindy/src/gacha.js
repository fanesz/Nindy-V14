const talkedRecently = new Set();
const config = require("../config.json")
const Discord = require("discord.js");
const db = require('quick.db')

module.exports = {
  name: 'gacha',
  description: "gacha command",
  async execute(msg) {


    const cooldown = new db.table('Command_Cooldown')
    const userid = msg.author.id

    let datenow = (Math.floor((new Date().getTime()) / 1000))
    let datecd = await cooldown.get(`${userid}.gacha`)


    if (((datecd - datenow) * 1000) >= 0) {


      //   const cdgacha = new Discord.MessageEmbed()
      // .setDescription(`Command on cooldown, wait 5s!`)
      // .setColor('0099E1')
      // msg.reply({embeds: [cdgacha]});

      let selisihdate = ((datecd - datenow) * 1000)
      let timestamp = `<t:${datecd}:R>`

      const embed1 = new Discord.MessageEmbed()
        .setDescription(`Command on cooldown!, wait ${timestamp}`).setColor('fd46bc')
      msg.reply({ embeds: [embed1] }).then((m) => {
        setTimeout(() => {
          m.edit({ embeds: [new Discord.MessageEmbed().setDescription('Cooldown end <:nindy_yes:977817511821213757>, you can try `-gacha` again!').setColor('fd46bc')] })
        }, selisihdate)

      })




    } else {
      if (msg.content.includes(config.prefix + 'gacha')) {

        //rate on
        let shogun = "https://i.imgur.com/JerVv5v.png"
        var venti = "https://i.imgur.com/TWNfmfI.png"
        let ayato = "https://i.imgur.com/MVUh2qv.png"
        let ayaka = "https://i.imgur.com/uCs0DVp.jpg"
        let yoimiya = "https://i.imgur.com/nbKX8mt.jpg"
        let ganyu = "https://i.imgur.com/v27baQ5.png"
        let kokomi = "https://i.imgur.com/Pfed70V.png"

        //rate off
        let keqing = "https://i.imgur.com/Xvk63dg.png"
        let qiqi = "https://i.imgur.com/ky0XsNt.png"
        let diluc = "https://i.imgur.com/zc2Rda9.png"
        let mona = "https://i.imgur.com/grKvxHZ.png"
        let jean = "https://i.imgur.com/7foE4Pq.png"

        let charab5 = [
          ganyu, keqing,
          ganyu, qiqi,
          ganyu, diluc,
          ganyu, mona,
          ganyu, jean,
          kokomi, keqing,
          kokomi, qiqi,
          kokomi, diluc,
          kokomi, mona,
          kokomi, jean
        ]
        var result = charab5[Math.floor(Math.random() * charab5.length)];
        if (result == ganyu) { resultdesc = 'WIN' }
        else if (result == kokomi) { resultdesc = 'WIN' }

        else { resultdesc = 'LOSE' }



        const resultembed = new Discord.MessageEmbed()
          .setImage(result)
          .setFooter({ text: `you ${resultdesc} 50:50 chance!` })
          .setColor('fd46bc')
        msg.reply({ embeds: [resultembed] })


        await cooldown.set(`${userid}.gacha`, `${(Math.floor((new Date().getTime() + 6000) / 1000))}`)


        talkedRecently.add(msg.author.id);
        setTimeout(() => {
          talkedRecently.delete(msg.author.id);
          cooldown.delete(`${userid}.gacha`)
        }, 6000);
      }
    }





  }
}