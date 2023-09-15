const { QuickDB } = require('quick.db');

class Database {
  constructor(table) {
    if (!Database.instance) {
      const db = new QuickDB();
      this[table] = db.table(table);
      Database.instance = this;
    }
    return Database.instance[table];
  }
}

module.exports = Database;