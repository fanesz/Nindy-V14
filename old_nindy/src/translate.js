const translate = require('@iamtraction/google-translate');
const config = require('../config.json')


module.exports = {
  name: 'translate',
  description: "translate command",
  async execute(msg) {
    try {

      const args = msg.content.slice(config.prefix.length + 1).split(' ');
      const query = args.join(" ");
      if (!query) return;
      let splitcontent = query.split(' ')

      if (msg.content.startsWith(config.prefix + 't ')) {
        let translated = await translate(query, { to: 'id' });
        await msg.reply('<:nindy_hee:977817394074505266> ' + translated.text)

      } else if (splitcontent[0] == 'en') {
        let translated = await translate(query.slice(splitcontent[0].length), { to: 'en' });
        await msg.reply('<:nindy_hee:977817394074505266> ' + translated.text)

      } else if (splitcontent[0] == 'jp') {
        let translated = await translate(query.slice(splitcontent[0].length), { to: 'ja' });
        await msg.reply('<:nindy_hee:977817394074505266> ' + translated.text)

      } else if (splitcontent[0] == 'cn') {
        let translated = await translate(query.slice(splitcontent[0].length), { to: 'zh-CN' });
        await msg.reply('<:nindy_hee:977817394074505266> ' + translated.text)

      } else if (splitcontent[0] == 'id') {
        let translated = await translate(query.slice(splitcontent[0].length), { to: 'id' });
        await msg.reply('<:nindy_hee:977817394074505266> ' + translated.text)

      } else if (splitcontent[0] == 'de') {
        let translated = await translate(query.slice(splitcontent[0].length), { to: 'id' });
        await msg.reply('<:nindy_hee:977817394074505266> ' + translated.text)

      } else if (splitcontent[0] == 'fr') {
        let translated = await translate(query.slice(splitcontent[0].length), { to: 'fr' });
        await msg.reply('<:nindy_hee:977817394074505266> ' + translated.text)

      } else if (splitcontent[0] == 'tl') {
        let translated = await translate(query.slice(splitcontent[0].length), { to: 'tl' });
        await msg.reply('<:nindy_hee:977817394074505266> ' + translated.text)

      } else if (splitcontent[0] == 'th') {
        let translated = await translate(query.slice(splitcontent[0].length), { to: 'th' });
        await msg.reply('<:nindy_hee:977817394074505266> ' + translated.text)

      }






    } catch (err) { }

  }
}