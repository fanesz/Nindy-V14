class Utils {
  constructor(client) {
    this.client = client;
  }
  
  async getAllMember() {
    return await this.client.guilds.cache.get("802867983097004034").members.cache.map(m => ({ name: m.user.username, value: m.user.id }))
  }
}

module.exports = Utils;