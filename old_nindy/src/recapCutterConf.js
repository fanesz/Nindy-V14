const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: 'recapcutconf',
  description: "recapcut",
  async execute(msg, client) {
    try {
      const recap = new db.table('recap')
      async function addData(type, uid) {
        try {
          if (type == "gdesign") {
            let currentData = await recap.get("GDesign.submitter");
            currentData.push(uid);
            await recap.set("GDesign.submitter", currentData);
            return true;
          } else if (type == "artwork") {
            let currentData = await recap.get("Artwork.submitter");
            currentData.push(uid);
            await recap.set("Artwork.submitter", currentData);
            return true;
          }
        } catch (err) {
          return false
        }
      }

      async function removeData(type, uid) {
        try {
          if (type == "gdesign") {
            let currentData = await recap.get("GDesign.submitter");
            let newData = [];
            for (i = 0; i < currentData.length; i++) {
              if (currentData[i] != uid) {
                newData.push(currentData[i]);
              }
            }
            await recap.set("GDesign.submitter", newData);
            if (currentData.length == newData.length) { return false; }
            else { return true; }
          } else if (type == "artwork") {
            let currentData = await recap.get("Artwork.submitter");
            let newData = [];
            for (i = 0; i < currentData.length; i++) {
              if (currentData[i] != uid) {
                newData.push(currentData[i]);
              }
            }
            await recap.set("Artwork.submitter", newData);
            if (currentData.length == newData.length) { return false; }
            else { return true; }
          }
        } catch (err) {
          return false
        }
      }

      async function setData(type, uids) {
        let datas;
        uids.replaceAll(", ", ",");
        if (uids.includes(",")) {
          datas = uids.split(",");
        } else {
          datas = [uids]
        }
        try {
          if (type == "gdesign") {
            await recap.set("GDesign.submitter", datas);
            return true;
          } else if (type == "artwork") {
            await recap.set("Artwork.submitter", datas);
            return true;
          }
        } catch (err) {
          return false
        }
      }

      async function resetData(type) {
        try {
          if (type == "gdesign") {
            await recap.set("GDesign.submitter", []);
            return true;
          } else if (type == "artwork") {
            await recap.set("Artwork.submitter", []);
            return true;
          } else if (type == "all") {
            await recap.set("GDesign.submitter", []);
            await recap.set("Artwork.submitter", []);
            return true;
          }
        } catch (err) {
          return false
        }
      }

      async function startRecap(type) {
        const date = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
        try {
          if (type == "gdesign") {
            await recap.set("GDesign.isStart", true);
            await recap.set("GDesign.dateStart", date);
            return true;
          } else if (type == "artwork") {
            await recap.set("Artwork.isStart", true);
            await recap.set("Artwork.dateStart", date);
            return true;
          } else if (type == "all") {
            await recap.set("GDesign.isStart", true);
            await recap.set("GDesign.dateStart", date);
            await recap.set("Artwork.isStart", true);
            await recap.set("Artwork.dateStart", date);
            return true;
          }
        } catch (err) {
          return false
        }
      }

      async function stopRecap(type) {
        try {
          if (type == "gdesign") {
            await recap.set("GDesign.isStart", false);
            await tampilRecapData("gdesign")
            return true;
          } else if (type == "artwork") {
            await recap.set("Artwork.isStart", false);
            await tampilRecapData("artwork")
            return true;
          } else if (type == "all") {
            await recap.set("GDesign.isStart", false);
            await recap.set("Artwork.isStart", false);
            await tampilRecapData("all");
            return true;
          }
        } catch (err) {
          return false
        }
      }

      async function createTable() {
        await recap.set("GDesign.submitter", [])
        await recap.set("GDesign.isStart", false)
        await recap.set("GDesign.dateStart", "Belum pernah start!")
        await recap.set("Artwork.submitter", [])
        await recap.set("Artwork.isStart", false)
        await recap.set("Artwork.dateStart", "Belum pernah start!")
      }

      async function tampilRecapData(type) {
        try {
          let submitterGDesign = await recap.get("GDesign.submitter")
          let submitterArtwork = await recap.get("Artwork.submitter")
          let startGDesign = await recap.get("GDesign.dateStart")
          let startArtwork = await recap.get("Artwork.dateStart")
          let isStartGDesign = await recap.get("GDesign.isStart")
          let isStartArtwork = await recap.get("Artwork.isStart")
          let embed = new Discord.MessageEmbed().setTitle("Data Recap")
          if (submitterArtwork == undefined || submitterGDesign == undefined) {
          }
          if (submitterGDesign == undefined && submitterArtwork == undefined) { msg.reply("⚠️ There is no data recorded!"); return true; }
          // type = submitterArtwork == undefined ? "gdesign" : submitterGDesign == undefined ? "artwork" : "all";

          if (type == "all") {
            embed = embed.addFields(
              { name: "Graphic Design", value: `Total = ${submitterGDesign.length}\nSubmitter = ${submitterGDesign.join(", ")}` },
              { name: "Artwork", value: `Total = ${submitterArtwork.length}\nSubmitter = ${submitterArtwork.join(", ")}` }
            )
              .setFooter({ text: `Start at : ${startGDesign} (${isStartGDesign}) | ${startArtwork} (${isStartArtwork})` })
          } else if (type == "gdesign") {
            embed = embed.addFields(
              { name: "Graphic Design", value: `Total = ${submitterGDesign.length}\nSubmitter = ${submitterGDesign.join(", ")}` }
            ).setFooter({ text: `Start at : ${startGDesign} (${isStartGDesign})` })
          } else if (type == "artwork") {
            embed = embed.addFields(
              { name: "Artwork", value: `Total = ${submitterArtwork.length}\nSubmitter = ${submitterArtwork.join(", ")}` }
            ).setFooter({ text: `Start at : ${startArtwork} (${isStartArtwork})` })
          }
          msg.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
          return true;
        } catch (err) {
          console.log(err);
          return false;
        }
      }


      if (msg.member?.permissions?.has("ADMINISTRATOR") || await msg.member.roles?.cache?.find(r => r.name == "Staff")) {
        if (await recap.get("GDesign.submitter") == null) { await createTable(); }
        if (msg.content == "-recap?" || msg.content == "-recaphelp" || msg.content == "-recap help") {
          const embed = new Discord.MessageEmbed()
            .setTitle("Recap Command")
            .setDescription(`
**-recap** | untuk cek total submitter (orang yang submit, bukan jumlah post), dan siapa saja yang submit
**-recapstart <gdesign/artwork/all>** | untuk start record recap
**-recapstop <gdesign/artwork/all>** | untuk stop record recap
**-recapreset <gdesign/artwork/all>** | untuk reset record recap
**-recapsetdata <gdesign/artwork> <add/remove/set> <uid1,uid2,uid3>** | untuk set data submitter
          `)

          msg.reply({
            embeds: [embed],
            allowedMentions: { repliedUser: false }
          })
        } else if (msg.content == "-recap") {
          let result = await tampilRecapData("all")
          if (!result) {
            msg.reply("⚠️ No Data recorded!, `-recap?`"); return;
          }

        } else if (msg.content.startsWith("-recapstart ")) {
          let args = msg.content.split(" ")
          if (await startRecap(args[1])) {
            msg.reply("✅ Successfully **start** recap for **" + args[1] + "**!"); return;
          } else {
            msg.reply("⚠️ Wrong Args!, `-recap?`"); return;
          }

        } else if (msg.content.startsWith("-recapstop ")) {
          let args = msg.content.split(" ")
          if (await stopRecap(args[1])) {
            msg.reply("✅ Successfully **start** recap for **" + args[1] + "**!"); return;
          } else {
            msg.reply("⚠️ Wrong Args!, `-recap?`"); return;
          }

        } else if (msg.content.startsWith("-recapreset ")) {
          let args = msg.content.split(" ")
          if (await resetData(args[1])) {
            msg.reply("✅ Successfully **reset " + args[1] + "**!"); return;
          } else {
            msg.reply("⚠️ Wrong Args!, `-recap?`"); return;
          }

        } else if (msg.content.startsWith("-recapsetdata ")) {
          let args = msg.content.split(" ")
          if (args.length >= 4) {
            let result;
            if (args[2] == "add") {
              result = await addData(args[1], args[3]);
            } else if (args[2] == "remove") {
              result = await removeData(args[1], args[3]);
            } else if (args[2] == "set") {
              let uids = msg.content.split(" set ")
              args[3] = uids[1]
              result = await setData(args[1], uids[1])
            }
            if (result) {
              msg.reply("✅ Successfully **" + args[2] + " *" + args[3] + "*** into **" + args[1] + "**"); return;
            } else if (args[2] == "remove") {
              msg.reply("⚠️ User not found!, `-recap?`"); return;
            } else {
              msg.reply("⚠️ Wrong Args!, `-recap?`"); return;
            }
          } else {
            msg.reply("⚠️ Wrong Args!, `-recap?`"); return;
          }
        } else if (msg.content == "-recapnuke" && msg.author.id == "278169600728760320") {
          recap.all().map(m => recap.delete(m.ID));
          msg.reply("✅ Successfully NUKE all recap data!")
        } else {
          msg.reply("⚠️ Wrong Args!, `-recap?`");
        }

      }




    } catch (err) {
      console.log(err);
    }


  }
}