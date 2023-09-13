const axios = require('axios')
const cheerio = require('cheerio')

module.exports = {
  name: 'trakteertest',
  description: "trakteertest command",
  async execute() {

    let baseurl = 'https://trakteer.id/';

    await axios.get(baseurl).then((res) => {
      const $ = cheerio.load(res.data)
      console.log(res.data);
    })




  }
}