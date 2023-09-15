const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  run: async (client) => {
    client.db_userInfo = db.table('user_info');
    client.db_coc = db.table('ClashofClans');
  }
};