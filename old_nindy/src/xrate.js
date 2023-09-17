const config = require("../config.json")
module.exports = {
  name: 'rate',
  description: "rate command",
  execute(msg) {

    let fullbintang = '<:full:965501147018305648>'
    let halfbintang = '<:half:965501159584456725>'
    let blankbintang = '<:blank:965502137243140137>'

    let bintang1 = blankbintang + blankbintang + blankbintang + blankbintang + blankbintang
    let bintang2 = halfbintang + blankbintang + blankbintang + blankbintang + blankbintang
    let bintang3 = fullbintang + blankbintang + blankbintang + blankbintang + blankbintang
    let bintang4 = fullbintang + halfbintang + blankbintang + blankbintang + blankbintang
    let bintang5 = fullbintang + fullbintang + blankbintang + blankbintang + blankbintang
    let bintang6 = fullbintang + fullbintang + halfbintang + blankbintang + blankbintang
    let bintang7 = fullbintang + fullbintang + fullbintang + blankbintang + blankbintang
    let bintang8 = fullbintang + fullbintang + fullbintang + halfbintang + blankbintang
    let bintang9 = fullbintang + fullbintang + fullbintang + fullbintang + blankbintang
    let bintang10 = fullbintang + fullbintang + fullbintang + fullbintang + halfbintang
    let bintang11 = fullbintang + fullbintang + fullbintang + fullbintang + fullbintang


    ratebintang = [bintang1, bintang2, bintang3, bintang4, bintang5, bintang6, bintang7, bintang8, bintang9, bintang10, bintang11]
    var ratehasil = ratebintang[Math.floor(Math.random() * ratebintang.length)];
    msg.reply(`:drum:`).then(m => {
      setTimeout(() => {
        m.edit(`:drum: :drum:`)
      }, 800)
      setTimeout(() => {
        m.edit(`:drum: :drum: :drum:`)
      }, 1700)
      setTimeout(() => {
        m.edit(`<:nindy_syap:977817690121076746> Nindy rate kamu  ${ratehasil}`);
      }, 2600)

    })





  }
}