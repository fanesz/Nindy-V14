const Discord = require("discord.js");

module.exports = {
  name: 'help',
  description: "help command",
  execute(msg) {

    let fieldData = [
      "`-say (text)`, membuat Nindy send apa yang kamu ketik",
      "`-choose (A) (B) (dst..)`, Nindy akan pilih random diantara itu",
      "`-random (angka)`, generate angka random dari 1-(angka)",
      "`-gacha`, untuk tes kehokian 50:50 kamu di genshin",
      "`-rate`, Nindy akan rate kamu!",
      "`-vote (kalimat)` untuk membuat polling vote",
      "`-t(kode[id,en,jp,de,tl,th]) (kalimat)` untuk translate, contoh: *-tjp ganteng*",
      "`-anime (judul anime)` untuk mencari anime di MyAnimeList",
      "`-art (nama karakter)` untuk menjadi art di AlphaCoders",
      "`-afk (reason)` - untuk set afk dan auto reply reason pas ada yg tag",
      "`-team (number)` - untuk get random user dari voice channel mu!",
      "\nJangan Lupa support Nindy ya.. di <#942406247666311218>",
    ]


    const helpembed = new Discord.MessageEmbed()
      .setColor('#fd46bc')
      .setThumbnail("https://i.imgur.com/pLMI4ZT.png")
      .addField("Yang bisa Nindy lakukan :", "\n" + fieldData.join("\n"))
      .setFooter({ text: "Tag/DM @Vanezzz for request!" });
    msg.channel.send({ embeds: [helpembed] })


  }
}