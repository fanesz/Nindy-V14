const { EmbedBuilder } = require("discord.js");
const { replyMessage } = require("../../utils/utils");

module.exports = {
  name: "embed",
  run: async (client, message, args, interaction) => {

    class EmbedMaker {
      constructor(title, description, color, author, authoricon, authorurl, thumnail, image, footer, footericon) {
        this.title = title;
        this.description = description;
        this.color = color;
        this.author = author;
        this.authoricon = authoricon;
        this.authorurl = authorurl;
        this.thumnail = thumnail;
        this.image = image;
        this.footer = footer;
        this.footericon = footericon;
      }
      setTitle(title) { this.title = title; }
      setDescription(description) { this.description = description; }
      setColor(color) { this.color = color; }
      setAuthor(author) { this.author = author; }
      setAuthorIcon(authoricon) { this.authoricon = authoricon; }
      setAuthorUrl(authorurl) { this.authorurl = authorurl; }
      setThumbnail(thumnail) { this.thumnail = thumnail; }
      setImage(image) { this.image = image; }
      setFooter(footer) { this.footer = footer; }
      setFooterIcon(footericon) { this.footericon = footericon; }
    }

    const inputEmbed = new EmbedMaker();
    let channelTarget;
    if (interaction) { // slash
      channelTarget = interaction.options.getChannel("channel");
      inputEmbed.setTitle(interaction.options.getString("title"));
      inputEmbed.setDescription(interaction.options.getString("description"));
      inputEmbed.setColor(interaction.options.getString("color"));
      inputEmbed.setAuthor(interaction.options.getString("author"));
      inputEmbed.setAuthorIcon(interaction.options.getString("authoricon"));
      inputEmbed.setAuthorUrl(interaction.options.getString("authorurl"));
      inputEmbed.setThumbnail(interaction.options.getString("thumbnail"));
      inputEmbed.setImage(interaction.options.getString("image"));
      inputEmbed.setFooter(interaction.options.getString("footer"));
      inputEmbed.setFooterIcon(interaction.options.getString("footericon"));

    } else { // prefix
      return await message.reply({
        content: "Use slash command instead!, /embed",
        allowedMentions: {
          repliedUser: false
        },
      })
    };


    const embed = new EmbedBuilder();

    if (inputEmbed.title) embed.setTitle(inputEmbed.title);
    if (inputEmbed.description) embed.setDescription(inputEmbed.description.replace(/\\n/g, "\n"));
    if (inputEmbed.color) embed.setColor(inputEmbed.color);
    if (inputEmbed.author) embed.setAuthor({ name: inputEmbed.author, iconURL: inputEmbed.authoricon, url: inputEmbed.authorurl });
    if (inputEmbed.thumnail) embed.setThumbnail(inputEmbed.thumnail);
    if (inputEmbed.image) embed.setImage(inputEmbed.image);
    if (inputEmbed.footer) embed.setFooter({ text: inputEmbed.footer, iconURL: inputEmbed.footericon });

    channelTarget = channelTarget || interaction.channel;
    try {
      await channelTarget.send({ embeds: [embed] })
      await interaction.reply({ content: `Embed sent to <#${channelTarget.id}>!`, ephemeral: false });
    } catch (err) {
      console.log(err);
      await interaction.reply({ content: `Failed sending embed...`, ephemeral: false });
    }


  }
};