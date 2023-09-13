const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

module.exports = {
  name: 'ready',
  once: true,
  execute(client, slashCommands) {

    console.log(`Logged in as ${client.user.tag}!`);

    const CLIENT_ID = client.user.id;
    const rest = new REST({ version: '10' }).setToken(process.env.BOT_TOKEN);
    (async () => {
      try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationCommands(CLIENT_ID), { body: slashCommands });

        console.log('Successfully reloaded application (/) commands.');
      } catch (error) {
        console.error(error);
      }
    })();


  }
}

