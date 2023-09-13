const { Client } = require("discord.js");
const Discord = require("discord.js");
const client = new Client({ intents: 32767 });
const { Collection } = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
configData = JSON.stringify(config, null, 2);
let clients = require('./src/trakteer-method.js');

const commandFiles = fs.readdirSync("./src").filter(file => file.endsWith(".js"));
const commandFilesSlash = fs.readdirSync("./src/slashcommand").filter(files => files.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/event").filter(file => file.endsWith(".js"));

const commandsSlash = [];

client.commands = new Collection();
client.commandsSlash = new Collection();
client.eventFiles = new Collection();


for (const file of commandFiles) {
  const command = require(`./src/${file}`);
  client.commands.set(command.name, command);
}

for (const file of eventFiles) {
  const event = require(`./src/event/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, commandsSlash));
  } else {
    client.on(event.name, (...args) => event.execute(...args, commandsSlash, client));
  }
}

for (const files of commandFilesSlash) {
  const commandSlash = require(`./src/slashcommand/${files}`);
  commandsSlash.push(commandSlash.data.toJSON());
  client.commandsSlash.set(commandSlash.data.name, commandSlash);
}






// ==============================================================================
// ==============================================================================
// ==============================================================================

// client.on('messageCreate', msg => {
//   if (msg.content == 'check start' && msg.guild.id == '802867983097004034') {
//     console.log('check start detect')
//     msg.channel.send('BOT CHECK')
//     setInterval(function() {
//       msg.channel.send('BOT CHECK')
//     }, 60000 * 5)
//   }
//   if (msg.content.includes('Checker') && msg.guild.id == '802867983097004034') {
//     setTimeout(() => {
//       msg.channel.send('<:nindy_huh:977817482683367544>')
//     }, 1000);
//   }
// })

// client.commands.get('trakteertest').execute(client)

client.on('messageCreate', msg => {
  if (msg.channel.id == '827113811647004713') return;
  if (msg.author.id == '339254240012664832' && msg.channel.id != '802877962575806484') {
    try {
      setTimeout(() => {
        msg.delete()
      }, 5000)
    } catch (err) { console.log(err) }
  }
})
client.on('messageCreate', msg => {
  if (msg.content.startsWith('-activity')) {
    if (!msg.member.permissions.has("ADMINISTRATOR")) {
      msg.reply('lu bukan admin lolz  <:hutaosmug:968115349344120872>');
      return;
    }
    let argsac = msg.content.slice(9).trim()
    if (argsac.length <= 0) {
      argsac = '[-help] for info!';
      msg.reply("Nindy's Activity reset to  `[-help] for info!`");
      client.user.setActivity("[-help] for info!");
    } else {
      try {
        client.user.setActivity(argsac);
        msg.reply("Nindy's Activity set to `" + argsac + '`')
      } catch (err) { }
    }

  }
})





client.on('messageCreate', msg => {
  // ====== listener without prefix ======
  if (msg.content.startsWith(':?lb')) {
    if (msg.channel.id == '802877962575806484') return;
    else if (msg.channel.id == '802865004239126541') return;
    else if (msg.channel.id == '827113811647004713') return;
    else { setTimeout(() => { msg.reply("Udah ada <#827113811647004713> masih ae disini !!") }, 500); }
  };
  // if(msg.content.includes(':')){ client.commands.get('EmojiLogs').execute(msg, client) };
  if (msg.content.startsWith('>>>')) { client.commands.get('canvas').execute(msg, client) };
  if (msg.content.includes('has earned the **`Agent`** role!')) { client.commands.get('joinrole').execute(msg, client) };
  if (msg.content) { client.commands.get('afkset').execute(msg) }
  if ([...msg.mentions.users.keys()][0] != undefined) { client.commands.get('afkdetect').execute(msg) }
  if ((msg.content.toLocaleLowerCase()).includes('nsfw')) { client.commands.get('nsfwrole').execute(msg, client) };
  let recapDetect = msg.content.toLocaleLowerCase(); if (recapDetect.includes('recap') || recapDetect.includes('capture')) { client.commands.get('threadmaker').execute(msg, client) };
  if (msg) { client.commands.get('antispam').execute(msg, client) };
  // if (msg) { client.commands.get('threadkeeper').execute(msg, client) };
  if (msg) { client.commands.get('userinfo').execute(msg, client) };

  // start with prefix
  if (!msg.content.startsWith('-') || msg.author.bot) return;


  if (msg.content.startsWith('-debug')) {
    console.log(msg.member.displayName)
  };

  if (msg.content.startsWith('-say')) { client.commands.get('say').execute(msg) };
  if (msg.content.startsWith('-vote')) { client.commands.get('vote').execute(msg) };
  if (msg.content.startsWith('-choose')) { client.commands.get('choose').execute(msg) };
  if (msg.content.startsWith('-gacha')) { client.commands.get('gacha').execute(msg) };
  if (msg.content.startsWith('-help')) { client.commands.get('help').execute(msg) };
  if (msg.content.startsWith('-rate')) { client.commands.get('rate').execute(msg) };
  if (msg.content.startsWith('-timer')) { client.commands.get('timer').execute(msg) };
  // if (msg.content.startsWith('-saldo')) { client.commands.get('saldo').execute(msg) };
  if (msg.content.startsWith('-t')) { client.commands.get('translate').execute(msg) };
  if (msg.content.startsWith('-boost')) { client.commands.get('ServerBoost').execute(msg, client) };
  if (msg.content.startsWith('-kill')) { client.commands.get('kill').execute(msg) };
  if (msg.content.startsWith('-utc')) { client.commands.get('utc').execute(msg) };
  if (msg.content.startsWith('-wib')) { client.commands.get('wib').execute(msg) };
  if (msg.content.startsWith('-anime')) { client.commands.get('anime').execute(msg) };
  if (msg.content.startsWith('-art')) { client.commands.get('art').execute(msg) };
  if (msg.content.startsWith('-coc')) { client.commands.get('coc').execute(msg, client) };
  if (msg.content.startsWith('-random')) { client.commands.get('random').execute(msg) };
  if (msg.content.startsWith('-team')) { client.commands.get('team').execute(msg, client) };


  // if(msg.content.startsWith(config.prefix+'')){ client.commands.get('').execute(msg) };



});






client.on('voiceStateUpdate', (oldState, newState) => {
  try {
    if (oldState.channel != null && newState.channel == null) { //left 
      try {
        const displayName1 = oldState.member.displayName
        const Usertaglogs1 = client.users.cache.get(oldState.id);
        var currentdate = new Date();
        var jamlogsX = currentdate.getHours() + 7
        if (jamlogsX > 23) {
          var jamlogs = jamlogsX - 24
        } else { var jamlogs = jamlogsX }
        var menitlogs = currentdate.getMinutes()
        var detiklogs = currentdate.getSeconds()
        var jamlogs = ("0" + jamlogs).slice(-2);
        var menitlogs = ("0" + menitlogs).slice(-2);
        var detiklogs = ("0" + detiklogs).slice(-2);
        var datetime = jamlogs + ':' + menitlogs + ':' + detiklogs
        client.guilds.cache.get("802865003606310953").channels.cache.get("962406610523816056").send(`:outbox_tray: ${displayName1} | ${Usertaglogs1.tag} **leaving** <#${oldState.channelId}> at ${datetime}`).catch(console.error);
      } catch (err) { console.log('Error Voice Join') }
    }
    else if (oldState.channel == null && newState.channel != null) {
      try {
        const displayName = oldState.member.displayName
        const Usertaglogs = client.users.cache.get(newState.id);
        var currentdate = new Date();
        var jamlogsX = currentdate.getHours() + 7
        if (jamlogsX > 23) {
          var jamlogs = jamlogsX - 24
        } else { var jamlogs = jamlogsX }
        var menitlogs = currentdate.getMinutes()
        var detiklogs = currentdate.getSeconds()
        var jamlogs = ("0" + jamlogs).slice(-2);
        var menitlogs = ("0" + menitlogs).slice(-2);
        var detiklogs = ("0" + detiklogs).slice(-2);
        var datetime = jamlogs + ':' + menitlogs + ':' + detiklogs
        client.guilds.cache.get("802865003606310953").channels.cache.get("962406610523816056").send(`:inbox_tray: ${displayName} | ${Usertaglogs.tag} **joining** <#${newState.channelId}> at ${datetime}  |  userID: ||${newState.id}||`).catch(console.error);
      } catch (err) { console.log('Error Voice Leave') }
    }
  } catch (err) { console.log('Error Voice Logs') }
})




client.on('messageCreate', msg => {
  if (msg.content.startsWith(config.prefix + 'token')) {
    if (msg.author.id != "278169600728760320") {
      return msg.channel.send('Only <@278169600728760320> can do this command!')
    }
    let ilanginawalan = msg.content.split(config.prefix + 'token');
    let newtoken = ilanginawalan[1].trim();
    config.xsrftoken = newtoken
    let configData = JSON.stringify(config, null, 2);
    fs.writeFile('./config.json', configData, err => console.error);
    msg.channel.send(`Token changed!`)
  } else if (msg.content.startsWith(config.prefix + 'session')) {
    if (msg.author.id != "278169600728760320") {
      return msg.channel.send('Only <@278169600728760320> can do this command!')
    }
    let ilanginawalan2 = msg.content.split(config.prefix + 'session');
    let newsession = ilanginawalan2[1].trim();
    config.idsession = newsession
    let configData = JSON.stringify(config, null, 2);
    fs.writeFile('./config.json', configData, err => console.error);
    msg.channel.send(`Session changed!`)
  } else if (msg.content.startsWith(config.prefix + 'webhook')) {
    if (msg.author.id != "278169600728760320") {
      return msg.channel.send('Only <@278169600728760320> can do this command!')
    }
    let ilanginawalan3 = msg.content.split(config.prefix + 'webhook');
    let newwebhook = ilanginawalan3[1].trim();
    config.webhook = newwebhook
    let configData = JSON.stringify(config, null, 2);
    fs.writeFile('./config.json', configData, err => console.error);
    msg.channel.send(`Webhook changed!`)
  }
});


// const Trakteer = new clients({
//   'XSRF-TOKEN': config.xsrftoken,
//   'trakteer-id-session': config.idsession,
//   'webhook': config.webhook
// });

// (async () => {
//   await Trakteer.getNotification(true, 60000);

// })();



//  client.on('messageCreate', async(msg) => {

// })



client.login(config.token)