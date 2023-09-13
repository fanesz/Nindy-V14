const axios = require('axios');
const cheerio = require('cheerio');
const Discord = require('discord.js')
const translate = require('@iamtraction/google-translate');

module.exports = {
    name: 'anime',
    description: "web command",
    async execute(msg){
      try{
      let args = msg.content.slice(7)
      if(!msg.content.includes(' ')){msg.reply('-anime (nama anime)');return;}
      if(msg.author.bot)return;

      let searched = args
      searched = searched.replace(' ', '%20')

      let baseURL = 'https://myanimelist.net/search/all?cat=all&q='
      let results = '';
      await axios.get(baseURL+searched).then((res) => {
      const $ = cheerio.load(res.data);
          
      let mod = -1
      function ifAnime(){
        mod++

        $('body')
        .find('article').eq(mod).each((i, element) => {
          const link = $(element).find("a.btn-search-more").text()
          if(link.includes('in Anime')){
            return;
          }else{
            ifAnime()
          }
        })
      }
      ifAnime()

      function getLink(){
        let animearticle = mod
        let resultarray = []
        $('body')
        .find('article').eq(animearticle).each((i, element) => {
          const link = $(element).find("div.picSurround").each((i, element) => {
            const links = $(element).children('a').attr('href')
            resultarray.push(links)
          })
        })
        return resultarray
      }
      results = getLink()
    })

    let animeLink = results[0]


async function sendAll(link){

    await axios.get(link).then((res) => {
      const $ = cheerio.load(res.data);

      let getTypemod = -1
      let getEpisodesmod = -1
      let getStatusmod = -1
      let getGenresmod = -1
      let genres = '';
      function getType(){
        getTypemod++
        let content = $('#contentWrapper').find('div.spaceit_pad').eq(getTypemod).find('span').text()
        if(content.includes('Type:')){ return } else { getType() }
      } getType()
      function getEpisodes(){
        getEpisodesmod++
        let content = $('#contentWrapper').find('div.spaceit_pad').eq(getEpisodesmod).find('span').text()
        if(content.includes('Episodes:')){ return } else { getEpisodes() }
      } getEpisodes()
      let splitEpisodes = ($('#contentWrapper').find('div.spaceit_pad').eq(getEpisodesmod).text()).split('\n')
      function getStatus(){
        getStatusmod++
        let content = $('#contentWrapper').find('div.spaceit_pad').eq(getStatusmod).find('span').text()
        if(content.includes('Status:')){ return } else { getStatus() }
      } getStatus()
      let splitStatus = ($('#contentWrapper').find('div.spaceit_pad').eq(getStatusmod).text()).split('\n')
      function getGenres(){
        getGenresmod++
        let content = $('#contentWrapper').find('div.spaceit_pad').eq(getGenresmod).find('span').text()
        if(content.includes('Genre')){ return } else { getGenres() }
      } getGenres()
      let genrelen = $('#contentWrapper').find('div.spaceit_pad').eq(getGenresmod).children('a').length
      for(i=0;i<=genrelen-1;i++){
        let genre = $('#contentWrapper').find('div.spaceit_pad').eq(getGenresmod).children('a').eq(i).text()
        let genrelink = 'https://myanimelist.net'+$('#contentWrapper').find('div.spaceit_pad').eq(getGenresmod).children('a').eq(i).attr('href')
        genres = genres + `[${genre}](${genrelink})` + ', '
      } 
      
      const title = $('#contentWrapper').find('strong').eq(0).text()
      const image = $('#contentWrapper').find('div.leftside').find('a').eq(0).children('img').attr('data-src')
      const score = $('#contentWrapper').find('div.score-label').text()
      const type = `[${$('#contentWrapper').find('div.spaceit_pad').eq(getTypemod).find('a').text()}](${$('#contentWrapper').find('div.spaceit_pad').eq(getTypemod).children('a').attr('href')})`
      const episodes = splitEpisodes[2].replace('  ', '')
      const status = splitStatus[2].replace('  ', '')
      const genre = genres.slice(0, genres.length-2)
      const studio = ($('#contentWrapper').find('span.information.studio.author').text()).replace('             ', ' ')

      ifSynopsismod = -1
      function ifSynopsis(){
        ifSynopsismod++
        let synopsischeck = $('#contentWrapper').find('p').eq(ifSynopsismod).text()
        if(synopsischeck.length <= 100){
          ifSynopsis()
        }else{
          return
        }
      }
      ifSynopsis()
      let synopsis = $('#contentWrapper').find('p').eq(ifSynopsismod).text()

      async function translation(texts){
          let translated = await translate(texts, {to: 'id'})
          return translated.text
      }

      translation(synopsis).then(result => {
      synopsisresult = result.substr(0, 600) + '...'

        const resultembed = new Discord.MessageEmbed()
      .setTitle(title)
      .setThumbnail(image)
      .addFields(
        { name: 'Type', value: type, inline: true },
        { name: 'Episodes', value: episodes, inline: true },
        { name: 'Status', value: status, inline: true },
        { name: 'Genres', value: genre },
        { name: 'Synopsis', value: synopsisresult+`[click for more](${results[0]})`},
      )
      .setFooter({ text: `⭐${score} | ${studio}` })
      .setColor('0099E1')
    msg.reply({embeds: [resultembed]}) 
      })
    })
  }
  
  if(args.includes('yuru') && args.includes('camp')){
    sendAll('https://myanimelist.net/anime/34798/Yuru_Camp')
  }else if(args.includes('one') && args.includes('piece')){
    sendAll('https://myanimelist.net/anime/21/One_Piece')
    }else if(args.includes('bubble')){
    sendAll('https://myanimelist.net/anime/50549/Bubble')
  }else{
  sendAll(results[0])
  }

  }catch(err){msg.reply('something wrong! or anime not found <:nindy_hump:977817319512367104>');console.log(err)}

}}