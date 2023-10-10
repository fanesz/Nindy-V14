const Discord = require("discord.js");

module.exports = {
    name: 'random',
    description: "random command",
    execute(msg){

        let args = msg.content.slice('8')
        if(isNaN(args) == true){ msg.reply('`-random (angka)` - untuk random generator angka 1-(angka)'); return; }
        if(msg.content == '-random'){ msg.reply('`-random (angka)` - untuk random generator angka 1-(angka)'); return; }
        let result = parseInt(Math.random() * args)
        const helpembed = new Discord.MessageEmbed()
        .setColor('#fd46bc')
        .setDescription(`Random Number 0 - ${args} = **${result}**`)
        msg.reply({embeds: [helpembed]})

               
    }
}