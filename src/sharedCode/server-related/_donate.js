const Canvas = require("canvas");
const { registerFont } = require("canvas");
registerFont("./font/fake_receipt.ttf", { family: "fake_receipt" });
const path = require("path");
const config = require("../../config");

module.exports = {
  name: "donate",
  run: async (client, message, args, interaction, donateEmbed) => {
    let donateEmbedMessage;
    if (!donateEmbed) {
      let embedID;
      if (interaction) {
        // slash
        embedID = interaction.options.getString("embedid");
        client.cmdlog(interaction.user.username, interaction.commandName, [
          embedID,
        ]);
      } else {
        // prefix
        embedID = args[0];
      }
      donateEmbedMessage = await client.channels.cache
        .get(config.donatur_LogChannelID)
        .messages.fetch(embedID);
    } else {
      donateEmbedMessage = donateEmbed;
    }

    function getEmbedData(embedID) {
      let data = embedID.embeds[0];
      const date = new Date(embedID.createdAt);
      const dateString = date.toLocaleDateString("id-ID", {
        timeZone: "Asia/Jakarta",
      });
      let dateSplit = dateString.split("/");
      const dateTime = date.toLocaleTimeString("id-ID", {
        timeZone: "Asia/Jakarta",
      });
      let timeSplit = dateTime.split(".");
      const tgl = date.toDateString("id-ID", { timeZone: "Asia/Jakarta" });
      let tglSplit = tgl.split(" ");
      let hari =
        tglSplit[0] == "Mon"
          ? "Senin"
          : tglSplit[0] == "Tue"
          ? "Selasa"
          : tglSplit[0] == "Wed"
          ? "Rabu"
          : tglSplit[0] == "Thu"
          ? "Kamis"
          : tglSplit[0] == "Fri"
          ? "Jumat"
          : tglSplit[0] == "Sat"
          ? "Sabtu"
          : tglSplit[0] == "Sun"
          ? "Minggu"
          : "????";
      const Months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
      ];
      let tanggalResult = `${hari}, ${dateSplit[0] - 1} ${
        Months[dateSplit[1]]
      } pukul ${timeSplit[0]}:${timeSplit[1]}`;
      let text = data.description;
      let jumlahFile = text.split("mentraktir **")[1].split("**")[0];
      let pesan = text.split("dengan pesan ***\"")[1].split("\"***")[0];
      let donator = data.author.name;
      return [donator, jumlahFile, pesan, tanggalResult];
    }

    const rawData = getEmbedData(donateEmbedMessage);
    let ordernama = rawData[0];
    let ordernominal = parseInt(rawData[1]);
    let ordermessage = rawData[2] == null ? "-" : rawData[2];
    let ordertanggal = rawData[3];
    let avatar = "./img/nindy.jpeg";
    if (ordernama.length >= 18 && ordernama.length <= 20 && !isNaN(ordernama)) {
      try {
        await client.users.fetch(ordernama).then((m) => {
          avatar =
            "https://cdn.discordapp.com/avatars/" +
            ordernama +
            "/" +
            m.avatar +
            ".jpeg";
          ordernama = m.username;
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      const commandType = interaction || message;
      try {
        await commandType.channel.guild.members
          .fetch({ cache: false })
          .then((members) =>
            members.find((member) => member.user.username === ordernama)
          )
          .then((result) => {
            avatar =
              "https://cdn.discordapp.com/avatars/" +
              result.user.id +
              "/" +
              result.user.avatar +
              ".jpeg";
            ordernama = result.user.username;
          });
      } catch (err) {
        console.log(err);
      }
    }

    const canvas = Canvas.createCanvas(1500, 1500);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(await Canvas.loadImage(avatar), 178, 569, 365, 365);
    ctx.drawImage(
      await Canvas.loadImage(
        path.join(__dirname, "../../../img/donaturv2.1.png")
      ),
      0,
      0
    );
    ctx.fillStyle = "#ffffff";
    const centerreceipt = 1040;

    // total : Rp.
    ctx.fillStyle = "black";
    ctx.font = "30px fake_receipt";
    let text = `TOTAL : Rp.${(ordernominal * 2000).toLocaleString("id")}-,`;
    ctx.textAlign = "center";
    ctx.fillText(text, centerreceipt, 840);

    // file report
    ctx.font = "50px fake_receipt";
    text = `FILE REPORT X${ordernominal}`;
    ctx.textAlign = "center";
    ctx.fillText(text, centerreceipt, 780);

    // date
    ctx.font = "20px fake_receipt";
    text = `-- ${ordertanggal} --`;
    ctx.textAlign = "center";
    ctx.fillText(text, centerreceipt, 981);

    // nama
    let itungnama = ordernama.length;
    let namafontsize =
      itungnama <= 20 ? 30 : itungnama <= 25 ? 26 : itungnama <= 30 ? 22 : 21;

    ctx.font = namafontsize + "px fake_receipt";
    text = `DONATOR : ${ordernama}`;
    ctx.textAlign = "center";
    ctx.fillText(text, centerreceipt, 435);

    // text
    let itungtext = ordermessage.length;
    ordermessage = `"${
      ordermessage.endsWith(" ") ? ordermessage.slice(0, -1) : ordermessage
    }"`;

    let splitmsg = ordermessage.replaceAll("  ", "").split(" ");

    // 20 - 1 line
    let textfontsize = 30;
    if (itungtext <= 20) {
      ctx.font = textfontsize + "px fake_receipt";
      text = `${ordermessage}`;
      ctx.textAlign = "center";
      ctx.fillText(text, centerreceipt, 1180);

      // 40 - 2 line
    } else if (itungtext <= 40) {
      let line1 = "";
      let line1end;
      for (let i = 0; i <= splitmsg.length - 1; i++) {
        if (line1.length <= 20) {
          line1 = line1 + splitmsg[i] + " ";
        } else {
          while (line1.endsWith(" ")) {
            line1 = line1.slice(0, -1);
          }
          line1end = i;
          break;
        }
      }

      let line2 = "";
      for (let i = line1end; i <= splitmsg.length - 1; i++) {
        line2 = line2 + splitmsg[i] + " ";
      }

      ctx.font = textfontsize + "px fake_receipt";
      ctx.textAlign = "center";
      text = `${line1}`;
      ctx.fillText(text, centerreceipt, 1155);
      text = `${line2}`;
      ctx.fillText(text, centerreceipt, 1187);

      // 55 - 2 line
    } else if (itungtext <= 55) {
      textfontsize = 25;
      let line1 = "";
      let line1end;
      for (let i = 0; i <= splitmsg.length - 1; i++) {
        if (line1.length <= 26) {
          line1 = line1 + splitmsg[i] + " ";
        } else {
          while (line1.endsWith(" ")) {
            line1 = line1.slice(0, -1);
          }
          line1end = i;
          break;
        }
      }
      let line2 = "";
      for (let i = line1end; i <= splitmsg.length - 1; i++) {
        line2 = line2 + splitmsg[i] + " ";
      }

      ctx.font = textfontsize + "px fake_receipt";
      ctx.textAlign = "center";
      text = `${line1}`;
      ctx.fillText(text, centerreceipt, 1155);
      text = `${line2}`;
      ctx.fillText(text, centerreceipt, 1187);

      // 80 - 3line
    } else if (itungtext <= 80) {
      textfontsize = 25;
      let line1 = "";
      let line1end;
      for (let i = 0; i <= splitmsg.length - 1; i++) {
        if (line1.length <= 26) {
          line1 = line1 + splitmsg[i] + " ";
        } else {
          while (line1.endsWith(" ")) {
            line1 = line1.slice(0, -1);
          }
          line1end = i;
          break;
        }
      }
      let line2 = "";
      let line2end;
      for (let i = line1end; i <= splitmsg.length - 1; i++) {
        if (line2.length <= 26) {
          line2 = line2 + splitmsg[i] + " ";
        } else {
          while (line2.endsWith(" ")) {
            line2 = line2.slice(0, -1);
          }
          line2end = i;
          break;
        }
      }

      let line3 = "";
      for (let i = line2end; i <= splitmsg.length - 1; i++) {
        line3 = line3 + splitmsg[i] + " ";
      }

      ctx.font = textfontsize + "px fake_receipt";
      ctx.textAlign = "center";
      text = `${line1}`;
      ctx.fillText(text, centerreceipt, 1140);
      text = `${line2}`;
      ctx.fillText(text, centerreceipt, 1172);
      text = `${line3}`;
      ctx.fillText(text, centerreceipt, 1204);
    }
    // 115 4 line
    else if (itungtext <= 115) {
      textfontsize = 25;
      let line1 = "";
      let line1end;
      for (let i = 0; i <= splitmsg.length - 1; i++) {
        if (line1.length <= 26) {
          line1 = line1 + splitmsg[i] + " ";
        } else {
          while (line1.endsWith(" ")) {
            line1 = line1.slice(0, -1);
          }
          line1end = i;
          break;
        }
      }
      let line2 = "";
      let line2end;
      for (let i = line1end; i <= splitmsg.length - 1; i++) {
        if (line2.length <= 26) {
          line2 = line2 + splitmsg[i] + " ";
        } else {
          while (line2.endsWith(" ")) {
            line2 = line2.slice(0, -1);
          }
          line2end = i;
          break;
        }
      }

      let line3 = "";
      let line3end;
      for (let i = line2end; i <= splitmsg.length - 1; i++) {
        if (line3.length <= 26) {
          line3 = line3 + splitmsg[i] + " ";
        } else {
          while (line3.endsWith(" ")) {
            line3 = line3.slice(0, -1);
          }
          line3end = i;
          break;
        }
      }

      let line4 = "";
      for (let i = line3end; i <= splitmsg.length - 1; i++) {
        line4 = line4 + splitmsg[i] + " ";
      }
      ctx.font = textfontsize + "px fake_receipt";
      ctx.textAlign = "center";
      text = `${line1}`;
      ctx.fillText(text, centerreceipt, 1120);
      text = `${line2}`;
      ctx.fillText(text, centerreceipt, 1152);
      text = `${line3}`;
      ctx.fillText(text, centerreceipt, 1184);
      text = `${line4}`;
      ctx.fillText(text, centerreceipt, 1216);
    } else {
      textfontsize = 25;
      let line1 = "";
      let line1end;
      for (let i = 0; i <= splitmsg.length - 1; i++) {
        if (line1.length <= 26) {
          line1 = line1 + splitmsg[i] + " ";
        } else {
          // line1 = line1.replace(splitmsg[i-1], '')
          while (line1.endsWith(" ")) {
            line1 = line1.slice(0, -1);
          }
          line1end = i;
          break;
        }
      }
      let line2 = "";
      let line2end;
      for (let i = line1end; i <= splitmsg.length - 1; i++) {
        if (line2.length <= 26) {
          line2 = line2 + splitmsg[i] + " ";
        } else {
          while (line2.endsWith(" ")) {
            line2 = line2.slice(0, -1);
          }
          line2end = i;
          break;
        }
      }

      let line3 = "";
      let line3end;
      for (let i = line2end; i <= splitmsg.length - 1; i++) {
        if (line3.length <= 26) {
          line3 = line3 + splitmsg[i] + " ";
        } else {
          while (line3.endsWith(" ")) {
            line3 = line3.slice(0, -1);
          }
          line3end = i;
          break;
        }
      }

      let line4 = "";
      for (let i = line3end; i <= splitmsg.length - 1; i++) {
        if (line4.length <= 20) {
          line4 = line4 + splitmsg[i] + " ";
        } else {
          while (line4.endsWith(" ")) {
            line4 = line4.slice(0, -2) + '..."';
          }
          break;
        }
      }
      ctx.font = textfontsize + "px fake_receipt";
      ctx.textAlign = "center";
      text = `${line1}`;
      ctx.fillText(text, centerreceipt, 1120);
      text = `${line2}`;
      ctx.fillText(text, centerreceipt, 1152);
      text = `${line3}`;
      ctx.fillText(text, centerreceipt, 1184);
      text = `${line4}`;
      ctx.fillText(text, centerreceipt, 1216);
    }

    const commandType = interaction || message;
    let canvasnew = "../../../img/donaturv2.1.png";

    if (donateEmbed) {
      await client.channels.cache.get(config.honorable_LogChannelID).send({
        content: `Thankyou ${ordernama} atas donasinya (❁´◡\`❁)\n`,
        files: [
          {
            attachment: canvas.toBuffer("image/png"),
            canvasnew,
            name: `${ordernama}.png`,
          },
        ],
        allowedMentions: { repliedUser: false },
      });
      donateEmbed.reply(
        `Automatically sent to <#${config.honorable_LogChannelID}> ~(=^.^)ノ`
      );
    } else {
      commandType.reply({
        files: [
          {
            attachment: canvas.toBuffer("image/png"),
            canvasnew,
            name: `${ordernama}.png`,
          },
        ],
      });
    }
  },
};
