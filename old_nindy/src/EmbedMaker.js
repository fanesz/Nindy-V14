const Discord = require('discord.js');

module.exports = {
  name: 'EmbedMaker',
  description: "EmbedMaker command",
  async execute(msg, client) {
    try {

      class EmbedMaker {
        constructor(color, title, url, author, description, thumbnail, fields, image, timestamp, footer) {
          this.color = color; this.title = title; this.url = url; this.author = author; this.description = description; this.thumbnail = thumbnail; this.fields = fields; this.image = image; this.timestamp = timestamp; this.footer = footer;
        }
        setColor(color) { this.color = color; }
        setTitle(title) { this.title = title; }
        setUrl(url) { this.url = url; }
        setAuthor(author) { this.author = author; }
        setDescription(description) { this.description = description; }
        setThumbnail(thumbnail) { this.thumbnail = thumbnail; }
        setFields(fields) { this.fields = fields; }
        setImage(image) { this.image = image; }
        setTimestamp(timestamp) { this.timestamp = timestamp; }
        setFooter(footer) { this.footer = footer; }
      }

      const defaultEmbed = new EmbedMaker(
        'fd46bc',
        'Some title',
        'http://ngck.eu.org/',
        'name:Some name,iconURL:https://i.imgur.com/AeEARml.png,url:http://ngck.eu.org/',
        'Some description here',
        'https://i.imgur.com/3R71n73.png',
        'name:Regular field title,value:Some value here,inline:false ++ name:Inline field title,value:Some value here,inline:true ++ name:Inline field title,value:Some value here,inline:true',
        'https://i.imgur.com/3R71n73.png',
        'true',
        'text:Some footer text here,iconURL:https://i.imgur.com/3R71n73.png'
      )

      let inputEmbedRaw = msg.content.split("\n");
      const inputEmbed = new EmbedMaker();
      let descriptionData = []; let fieldData = [];
      for (let i = 1; i < inputEmbedRaw.length; i++) {
        let data = inputEmbedRaw[i];
        if (data.startsWith(">color = ")) inputEmbed.setColor(data.slice(9).length == 0 ? "0x0099FF" : data.slice(9))
        else if (data.startsWith(">title = ")) inputEmbed.setTitle(data.slice(9))
        else if (data.startsWith(">url = ")) inputEmbed.setUrl(data.slice(7))
        else if (data.startsWith(">author = ")) inputEmbed.setAuthor(data.slice(10))
        else if (data.startsWith(">description = ")) continue
        else if (data.startsWith("d)")) descriptionData.push(data.slice(2).length == 0 ? " " : data.slice(2))
        else if (data.startsWith(">thumbnail = ")) inputEmbed.setThumbnail(data.slice(13))
        else if (data.startsWith(">fields = ")) continue
        else if (data.startsWith("f)")) fieldData.push(data.slice(2))
        else if (data.startsWith(">image = ")) inputEmbed.setImage(data.slice(9))
        else if (data.startsWith(">timestamp = ")) inputEmbed.setTimestamp(data.slice(13))
        else if (data.startsWith(">footer = ")) inputEmbed.setFooter(data.slice(10))
      }
      inputEmbed.setDescription(descriptionData.join("\n"))
      inputEmbed.setFields(fieldData.join(" ++ "))


      async function createEmbed() {
        EmbedClass = msg.content == "-embed" ? defaultEmbed : inputEmbed;
        let authorData = null; let footerData = null;

        authorSplit = EmbedClass.author?.split(",");
        if (EmbedClass.author != null) authorData = { name: authorSplit[0].slice(5), iconURL: authorSplit[1].slice(8), url: authorSplit[2].slice(4) }

        footerSplit = EmbedClass.footer?.split(",");
        if (EmbedClass.footer != null) footerData = { text: footerSplit[0].slice(5), iconURL: footerSplit[1].slice(8) };

        let fieldData = [];
        fieldSplitLine = EmbedClass.fields?.split(" ++ ");
        if (fieldSplitLine.length > 1) {
          for (let i = 0; i < fieldSplitLine.length; i++) {
            let fieldSplit = fieldSplitLine[i].split(",");
            let inlines = fieldSplit[2].includes("true") ? true : false;
            fieldData.push({ name: fieldSplit[0].slice(5), value: fieldSplit[1].slice(6), inline: inlines });
          }
        }
        const embed = new Discord.MessageEmbed()
        try {
          embed
            .setColor(EmbedClass.color)
            .setDescription(EmbedClass.description)
            .setThumbnail(EmbedClass.thumbnail)
            .setImage(EmbedClass.image)
        } catch (err) { }
        if (EmbedClass.timestamp) embed.setTimestamp()

        const validUrl = /^(http|https):\/\/.*\..*/i;
        if (EmbedClass.url != undefined && validUrl.test(EmbedClass.url)) {
          if (EmbedClass.title != undefined) {
            try {
              embed.setURL(EmbedClass.url);
            } catch (err) {
              msg.channel.send(":warning: URL should be start with (http/https)");
            }
          } else {
            msg.channel.send(":warning: URL need a title args");
          }

        }

        if (authorData != undefined)
          embed.setAuthor(authorData)
        if (fieldData.length > 1)
          embed.setFields(fieldData)
        if (footerData != undefined) {
          if (fieldData != undefined || authorData != undefined || EmbedClass.title != undefined) {
            embed.setFooter(footerData)
          }
        }
        if (EmbedClass.title != undefined)
          embed.setTitle(EmbedClass.title)

        if (fieldData.length > 1 || authorData != undefined || EmbedClass.title != undefined) {
          msg.channel.send({ embeds: [embed] });
        }

        if (msg.content == "-embed") {
          msg.channel.send("Format : ```" +
            `
-embed
>color = fd46bc
>title = Some title
>url = http://ngck.eu.org/
>author = name:Some name,iconURL:https://i.imgur.com/3R71n73.png,url:http://ngck.eu.org/
>description = 
d)Some description here
d)second line of description here
d)you can empty for new line
d)
d)like this
>thumbnail = https://i.imgur.com/3R71n73.png
>fields = 
f)name:Regular field title,value:Some value here,inline:false
f)name:Inline field title,value:Some value here,inline:true
f)name:Inline field title,value:Some value here,inline:true
>image = https://i.imgur.com/3R71n73.png
>timestamp = true
>footer = text:Some footer text here,iconURL:https://i.imgur.com/3R71n73.png
`
            + "```")
        }
      }

      createEmbed()




    } catch (err) { console.log(err); msg.channel.send(err) }
  }
}