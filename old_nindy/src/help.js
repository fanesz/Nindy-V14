const Discord = require("discord.js");

module.exports = {
  name: 'help',
  description: "help command",
  execute(msg) {

    const helpembed = new Discord.MessageEmbed()
      .setColor('#fd46bc')
      .setThumbnail("https://i.imgur.com/pLMI4ZT.png")
      .addField("Yang bisa Nindy lakukan :", "\n`-say (text)`, membuat Nindy send apa yang kamu ketik\n`-choose (A) (B) (dst..)`, Nindy akan pilih random diantara itu\n`-random (angka)`, generate angka random dari 1-(angka)\n`-gacha`, untuk tes kehokian 50:50 kamu di genshin\n`-rate`, Nindy akan rate kamu!\n`-vote (kalimat)` untuk membuat polling vote\n`-t(kode[id,en,jp,de,tl,th]) (kalimat)` untuk translate\n`-anime (judul anime)` untuk mencari anime di MyAnimeList\n`-art (nama karakter)` untuk menjadi art di DeviantArt\n`-afk (reason)` - untuk set afk dan auto reply reason pas ada yg tag\n`-team (number)` - untuk get random user dari voice channel mu!\n\nJangan Lupa support Nindy ya.. di <#942406247666311218>")
      .setFooter({ text: "Tag/DM @Vanezzz for request!" });
    msg.channel.send({ embeds: [helpembed] })


  }
}