const {readdirSync} = require('fs');

module.exports = (client) => {
  const commandFolders = readdirSync('./commands');
  for (const folder of commandFolders) {
    const commandFiles = readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    const commandsArray = [];
    for (const file of commandFiles) {
      const command = require(`../commands/${folder}/${file}`);
      client.commands.set(command.name, command);
      commandsArray.push(command);

      client.on("ready", () => {
        client.guilds.cache.get("802867983097004034").command.set(commandsArray);
      })
    }
  }
}