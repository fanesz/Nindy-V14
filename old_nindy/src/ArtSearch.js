const Discord = require('discord.js')
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = {
  name: 'art',
  description: "art command",
  async execute(msg) {

    let searched = msg.content.slice(5);

    if (searched.length <= 0) { msg.reply('-art (art name)'); return; }
    try {

      let firstEmbed;
      async function getEmbed(arttitle, artauthor, rating, view, favorite, comment, img, linksource, page, maxpage) {
        const resultembed = new Discord.MessageEmbed()
          .setTitle(arttitle)
          .setDescription(`by [${artauthor}](${linksource})`)
          .setImage(img)
          .setFooter({ text: `${page}/${maxpage}  |  ${rating}👍  |  ${view}👁️  |  ${favorite}❤️ | ${comment}💬` })
          .setColor('fd46bc')
        firstEmbed = await msg.reply({ embeds: [resultembed] })
        await firstEmbed.react('◀️')
        await firstEmbed.react('▶️')
        await firstEmbed.react('🔀')
      }

      async function changeEmbed(arttitle, artauthor, rating, view, favorite, comment, img, linksource, page, maxpage) {
        const resultembed2 = new Discord.MessageEmbed()
          .setTitle(arttitle)
          .setDescription(`by [${artauthor}](${linksource})`)
          .setImage(img)
          .setFooter({ text: `${page}/${maxpage}  |  ${rating}👍  |  ${view}👁️  |  ${favorite}❤️ | ${comment}💬` })
          .setColor('fd46bc')
        firstEmbed.edit({ embeds: [resultembed2] })
      }

      let baseURL = 'https://wall.alphacoders.com/search.php?search=';
      let result = [];
      let rating = [];
      let view = [];
      let comment = [];
      let favorite = [];
      let artist = [];
      let linksrc = [];

      await axios.get(baseURL + searched).then((res) => {
        const $ = cheerio.load(res.data);
        pictlength = $('div.page_container').find('picture').length

        for (i = 0; i <= pictlength - 1; i++) {
          result.push($('div.page_container').find('picture').eq(i).children('img').attr('src'))
          rating.push(($('div.page_container').find('div.thumb-stats').eq(i).find('span').eq(0).text()).replaceAll(' ', '').replaceAll('\n', ''))
          view.push(($('div.page_container').find('div.thumb-stats').eq(i).find('span').eq(1).text()).replaceAll(' ', '').replaceAll('\n', ''))
          comment.push(($('div.page_container').find('div.thumb-stats').eq(i).find('span').eq(2).text()).replaceAll(' ', '').replaceAll('\n', ''))
          favorite.push(($('div.page_container').find('div.thumb-stats').eq(i).find('span').eq(3).text()).replaceAll(' ', '').replaceAll('\n', ''))
          artist.push(($('div.page_container').find('span.align-middle').eq(i).text()).replace('Artist: ', ''))
          linksrc.push('https://wall.alphacoders.com' + ($('div.page_container').find('div.boxgrid').eq(i).children('a').attr('href')))
        }
      })

      await getEmbed(searched, artist[0], rating[0], view[0], favorite[0], comment[0], result[0], linksrc[0], 1, result.length)

      const filter = (reaction, user) => { return ['◀️', '▶️', '🔀'].includes(reaction.emoji.name) && !user.bot; }
      const collector = firstEmbed.createReactionCollector({
        filter,
        max: 100, // max 100 times react
        time: 1000 * 180,
      });

      let index = 0

      collector.on('collect', (reaction, user) => {
        if (reaction.emoji.name === '▶️') {
          reaction.users.remove(user.id)
          index++
          if (index > result.length - 1) { index = 0 }
          changeEmbed(searched, artist[index], rating[index], view[index], favorite[index], comment[index], result[index], linksrc[index], index + 1, result.length)

        } else if (reaction.emoji.name === '◀️') {
          reaction.users.remove(user.id)
          index--
          if (index < 0) { index = result.length - 1 }
          changeEmbed(searched, artist[index], rating[index], view[index], favorite[index], comment[index], result[index], linksrc[index], index + 1, result.length)

        } else if (reaction.emoji.name === '🔀') {
          reaction.users.remove(user.id)
          let previndex = index
          while (index == previndex) {
            index = parseInt(Math.random() * result.length)
          }
          changeEmbed(searched, artist[index], rating[index], view[index], favorite[index], comment[index], result[index], linksrc[index], index + 1, result.length)

        }
      });
    } catch (err) { msg.reply('Something error, or ' + '`' + searched + '` not found!') }

  }
}