const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
const tools = require('./trakteer-tool.js');
const Canvas = require('canvas')

class Trakteer {

  constructor(options = {}) {
    this.options = options;
  }

  getSaldo() {
    return new Promise(async (resolve, reject) => {
      try {
        const endpoint = 'manage/dashboard';
        const res = await tools.get(endpoint, this.options);
        const response = res.data;

        const $ = cheerio.load(response);
        const saldo = $('.col-xs-12').eq(0).find('h3').text().trim();
        const current_donation = $('.col-xs-12').eq(1).find('h3').text().trim();
        const cair = $('.col-xs-12').eq(3).find('h3').text().trim();

        return resolve(`${saldo}+${current_donation}+${cair}`);
      } catch (e) {
        return reject(e);
      }
    });
  }

  getData() {
    return new Promise(async (resolve, reject) => {
      try {
        const point = fs.readFileSync(path.join(__dirname, '/endpoint/getData.txt'), 'utf8');
        const res = await tools.get(point, this.options);
        const donet = res.data.data;

        return resolve(donet);
      } catch (e) {
        return reject(e);
      }
    });
  }

  getOrderDetail(orderId) {
    return new Promise(async (resolve, reject) => {
      try {
        const endpoint = `manage/tip-received/${orderId}`;
        const res = await tools.get(endpoint, this.options);
        const $ = cheerio.load(res.data);

        const data = {};

        data.orderId = orderId;
        data.tanggal = $('tbody').find('tr:contains("Tanggal") td').text();
        data.nama = $('tbody').find('tr:contains("Nama") td').text().replace(/\s+|&nbsp;/g, "");
        data.unit = {
          length: $('tbody').find('tr:contains("Unit") td').text().trim(),
          image: $('tbody').find('tr:contains("Unit") td').find('img').attr('src')
        };
        data.nominal = $('tbody').find('tr:contains("Nominal") td').text().trim();
        data.message = $('.block').text().trim();

        return resolve(data);
      } catch (e) {
        return reject(e);
      }
    });
  }

  getHistory() {
    return new Promise(async (resolve, reject) => {
      try {
        const endpoint = fs.readFileSync(path.join(__dirname, '/endpoint/getHistory.txt'), 'utf8');
        const res = await tools.get(endpoint, this.options);
        const data = res.data;

        const list = [];
        for (const history of data.data) {
          const amount = cheerio.load(history.jumlah);
          const balance = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(history.current_balance);
          list.push({
            tanggal: history.created_at,
            balance,
            description: history.description.replace('\n\n', ''),
            amount: amount.text().trim().split('\n').shift()
          });
        }

        return resolve(list);
      } catch (e) {
        return reject(e);
      }
    });
  }

  getNotification(boolean, time) {
    const notify = async () => {
      try {

        const donaturData = await this.getData();
        const order = await this.getOrderDetail(donaturData[0].id);
        const json = {
          'content': `>>>${order.nama}++++${order.nominal}++++${order.message}++++${order.tanggal}`,
        };



        const isAvailable = fs.existsSync(path.join(__dirname, './latestDonatur.json'));
        if (isAvailable) {
          const readDonatur = fs.readFileSync(path.join(__dirname, './latestDonatur.json'), 'utf8');
          const donatur = JSON.parse(readDonatur.toString());

          if (donaturData[0].id === donatur.id) return;
          fs.writeFileSync(path.join(__dirname, './latestDonatur.json'), JSON.stringify(donaturData[0]));
          await tools.post(json, this.options['webhook'])
          console.log('debug1')


        } else {
          fs.writeFileSync(path.join(__dirname, './latestDonatur.json'), JSON.stringify(donaturData[0]));
          await tools.post(json, this.options['webhook']);
          console.log('debug2')

        }
      } catch (err) {
        console.log(err);
      }
    }

    const notification = setInterval(notify, time);
    if (boolean === false) {
      clearInterval(notification);
      console.log('Notifikasi Dinonaktifkan!');
    }
    console.log('Notifikasi diaktifkan!');

  }
}

module.exports = Trakteer;