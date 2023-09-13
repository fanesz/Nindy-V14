const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const config = require("../../config.json")

module.exports = {
    name: "ready",
    once: false,
    execute(client, commandsSlash){
      
        console.log(`Logged in as ${client.user.tag}!`);
        client.user.setActivity("[-help] for info!");
      // client.user.setActivity("Growtopia");
      
      
        const CLIENT_ID = client.user.id;
        const rest = new REST({
            version: "9"
        }).setToken(config.token);
        
        (async () => {
            try {
                if (config.token === "production") {
                    await rest.put(Routes.applicationCommand(CLIENT_ID), {
                        body: commandsSlash
                    });
                    console.log("Succesfully registered commands globally.")
                } else {
                    await rest.put(Routes.applicationGuildCommand(CLIENT_ID, config.GUILD_ID), {
                        body: commandsSlash
                    });
                    console.log("Succesfully registered commands locally.")
                }
            } catch (err) {
            if (err) console.log(err);
            }
        })
    }
}