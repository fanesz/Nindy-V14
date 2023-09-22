const { default: axios } = require("axios");
const cheerio = require("cheerio");
const { replyMessage } = require("../utils/utils");
const translate = require('@iamtraction/google-translate');
const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require("discord.js");
const config = require("../config");
const { pagination, ButtonTypes, ButtonStyles } = require('@devraelfreeze/discordjs-pagination');

module.exports = {
  name: "anime",
  run: async (client, message, args, interaction) => {
    let animeTitle;
    let ephemeral = false;
    if (interaction !== null) { // slash
      animeTitle = interaction.options.getString("title");
      ephemeral = interaction.options.getString("reply") == "true" ? true : false;
      client.cmdlog(interaction.user.username, interaction.commandName, ['', ephemeral]);
    } else { // prefix
      animeTitle = args[0];
    }

    const commandType = interaction || message;

    const baseURL = 'https://myanimelist.net/search/all?cat=all&q=';
    const res = await axios.get(baseURL + animeTitle);

    const $ = cheerio.load(res.data);

    let mod = -1
    function ifAnime() {
      mod++
      $('body')
        .find('article').eq(mod).each((i, element) => {
          const link = $(element).find("a.btn-search-more").text()
          if (link.includes('in Anime')) {
            return;
          } else {
            ifAnime()
          }
        })
    }
    ifAnime()

    let animearticle = mod
    let resultarray = []
    $('body')
      .find('article').eq(animearticle).each((i, element) => {
        const link = $(element).find("div.picSurround").each((i, element) => {
          const links = $(element).children('a').attr('href')
          resultarray.push(links)
        })
      })
    results = resultarray

    async function sendAll(link) {
      return await axios.get(link).then((res) => {
        const $ = cheerio.load(res.data);

        let getTypemod = -1
        let getEpisodesmod = -1
        let getStatusmod = -1
        let getGenresmod = -1
        let genres = '';
        function getType() {
          getTypemod++
          let content = $('#contentWrapper').find('div.spaceit_pad').eq(getTypemod).find('span').text()
          if (content.includes('Type:')) { return } else { getType() }
        } getType()
        function getEpisodes() {
          getEpisodesmod++
          let content = $('#contentWrapper').find('div.spaceit_pad').eq(getEpisodesmod).find('span').text()
          if (content.includes('Episodes:')) { return } else { getEpisodes() }
        } getEpisodes()
        let splitEpisodes = ($('#contentWrapper').find('div.spaceit_pad').eq(getEpisodesmod).text()).split('\n')
        function getStatus() {
          getStatusmod++
          let content = $('#contentWrapper').find('div.spaceit_pad').eq(getStatusmod).find('span').text()
          if (content.includes('Status:')) { return } else { getStatus() }
        } getStatus()
        let splitStatus = ($('#contentWrapper').find('div.spaceit_pad').eq(getStatusmod).text()).split('\n')
        function getGenres() {
          getGenresmod++
          let content = $('#contentWrapper').find('div.spaceit_pad').eq(getGenresmod).find('span').text()
          if (content.includes('Genre')) { return } else { getGenres() }
        } getGenres()
        let genrelen = $('#contentWrapper').find('div.spaceit_pad').eq(getGenresmod).children('a').length
        for (i = 0; i <= genrelen - 1; i++) {
          let genre = $('#contentWrapper').find('div.spaceit_pad').eq(getGenresmod).children('a').eq(i).text()
          let genrelink = 'https://myanimelist.net' + $('#contentWrapper').find('div.spaceit_pad').eq(getGenresmod).children('a').eq(i).attr('href')
          genres = genres + `[${genre}](${genrelink})` + ', '
        }

        const title = $('#contentWrapper').find('strong').eq(0).text()
        const image = $('#contentWrapper').find('div.leftside').find('a').eq(0).children('img').attr('data-src')
        const score = $('#contentWrapper').find('div.score-label').text()
        const type = `[${$('#contentWrapper').find('div.spaceit_pad').eq(getTypemod).find('a').text()}](${$('#contentWrapper').find('div.spaceit_pad').eq(getTypemod).children('a').attr('href')})`
        const episodes = splitEpisodes[2].replace('  ', '')
        const status = splitStatus[2].replace('  ', '')
        const genre = genres.slice(0, genres.length - 2)
        const studio = ($('#contentWrapper').find('span.information.studio.author').text()).replace('             ', ' ')

        let ifSynopsismod = -1
        function ifSynopsis() {
          ifSynopsismod++
          let synopsischeck = $('#contentWrapper').find('p').eq(ifSynopsismod).text()
          if (synopsischeck.length <= 100) {
            ifSynopsis()
          } else {
            return
          }
        }
        ifSynopsis()
        let synopsis = $('#contentWrapper').find('p').eq(ifSynopsismod).text()

        async function translation(texts) {
          let translated = await translate(texts, { to: 'id' })
          return translated.text
        }

        return translation(synopsis).then(result => {
          synopsisresult = result.substr(0, 600) + '...'

          console.log(title);

          const embed = new EmbedBuilder()
            .setTitle(title)
            .setThumbnail(image)
            .addFields(
              { name: 'Type', value: type, inline: true },
              { name: 'Episodes', value: episodes, inline: true },
              { name: 'Status', value: status, inline: true },
              { name: 'Genres', value: genre },
              { name: 'Synopsis', value: synopsisresult + `[click for more](${results[0]})` },
            )
            .setFooter({ text: `⭐${score} | ${studio}` })
            .setColor(config.embedColor);
            // const embed = new EmbedBuilder().setTitle('test')
            console.log("Embed rendered!");
          return embed;
        })
      })
    }

    const embed1 = await sendAll(results[0]);
    const embed2 = await sendAll(results[1]);
    const embed3 = await sendAll(results[2]);

    // const embed1 = new EmbedBuilder().setTitle('test1');
    // const embed2 = new EmbedBuilder().setTitle('test2');
    // const embed3 = new EmbedBuilder().setTitle('test3');

    const embeds = [embed1, embed2, embed3];


    if (interaction) {
      console.log("Calling pagination!");
      await pagination({
        embeds: embeds,
        author: interaction.member.user,
        interaction: interaction,
        ephemeral: false,
        time: 40000,
        disableButtons: false,
        fastSkip: false,
        pageTravel: false,
        buttons: [
          {
            type: ButtonTypes.previous,
            label: 'Previous Page',
            style: ButtonStyles.Primary
          },
          {
            type: ButtonTypes.next,
            label: 'Next Page',
            style: ButtonStyles.Success
          }
        ]
      });

      // interaction.reply({
      //   embeds: [embed1],
      //   ephemeral: ephemeral,
      //   components: [
      //     new ActionRowBuilder()
      //       .setComponents(
      //         new ButtonBuilder()
      //           .setCustomId('previous')
      //           .setLabel('Previous')
      //           .setStyle(ButtonStyle.Primary),
      //         new ButtonBuilder()
      //           .setCustomId('next')
      //           .setLabel('Next')
      //           .setStyle(ButtonStyle.Primary),
      //         new ButtonBuilder()
      //           .setLabel('MAL')
      //           .setStyle(ButtonStyle.Link)
      //           .setURL(results[currentLink]),
      //       ),
      //   ]
      // });






    } else {
      // replyMessage(commandType, '', embed, ephemeral, true);
    }



  }
};