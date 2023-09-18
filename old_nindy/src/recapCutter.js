const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: 'recapcut',
  description: "recapcut",
  async execute(msg, client) {
    try {

      async function createTable() {
        await recap.set("GDesign.submitter", [])
        await recap.set("GDesign.isStart", false)
        await recap.set("GDesign.dateStart", "Belum pernah start!")
        await recap.set("Artwork.submitter", [])
        await recap.set("Artwork.isStart", false)
        await recap.set("Artwork.dateStart", "Belum pernah start!")
      }


      const recap = new db.table('recap')
      if (msg.attachments.size == 0) return;
      const usertag = msg.author.tag;
      const guildID = "802865003606310953" // ngck 802865003606310953 | nindy 802867983097004034
      const GDesign = "1024137206085984367" // ngck 1024137206085984367 | nindy 1071659009293168781
      const Artwork = "1024137472130682922" // ngck 1024137472130682922 | nindy 1077891106819293196

      if (msg.channelId == GDesign) {
        if (await recap.get("GDesign.submitter") == null) {
          await createTable();
        }
        if (await recap.get("GDesign.isStart") == false) return;
        let submitter = await recap.get("GDesign.submitter")
        let alreadySubmit = false;
        for (let i = 0; i < submitter.length; i++) {
          if (submitter[i] == usertag) {
            alreadySubmit = true;
            break;
          }
        }
        if (alreadySubmit == false) {
          submitter.push(usertag)
          await recap.set("GDesign.submitter", submitter)
        }

      } else if (msg.channelId == Artwork) {
        if (await recap.get("Artwork.submitter") == null) {
          await createTable();
        }
        if (await recap.get("Artwork.isStart") == false) return;
        let submitter = await recap.get("Artwork.submitter")
        let alreadySubmit = false;
        for (let i = 0; i < submitter.length; i++) {
          if (submitter[i] == usertag) {
            alreadySubmit = true;
            break;
          }
        }
        if (alreadySubmit == false) {
          submitter.push(usertag)
          await recap.set("Artwork.submitter", submitter)
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}