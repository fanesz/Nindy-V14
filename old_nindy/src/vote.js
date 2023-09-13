const Discord = require("discord.js");


module.exports = {
    name: 'vote',
    description: "vote command",
    execute(msg){
        // const presence = msg.guild.members.cache.filter(member => member.presence?.status === "online");
        // console.log(presence.member.displayName)

        let votecontent = msg.content.slice(5).trim()
        if (votecontent.length <= 0)return;
        let votedraw = new Discord.MessageEmbed()
        .setColor('#fd46bc')
        .setTitle(`"${votecontent}"`)
        .setDescription(`\n\nApakah Rill or Fek??`)
        .setFooter({text:`Voting by : ${msg.member.displayName}`})
        msg.channel.send({embeds: [votedraw]}).then(sentEmbed => {
          sentEmbed.react("<:rill:966430527747919882>")
          sentEmbed.react("<:fek:966430513978023986>")
        })
          

              
          
    }
}