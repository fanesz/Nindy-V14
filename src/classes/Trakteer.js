const axios = require("axios");
const cheerio = require("cheerio");

const baseURL = "https://trakteer.id/"

class Trakteer {
  constructor(validation = {}) {
    this.validation = validation;
  }

  get() {
    const res = axios.get(baseURL, this.validation);
    const $ = cheerio.load(res.data);
    console.log($('body').html());
  }
}

module.exports = Trakteer;