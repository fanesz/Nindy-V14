const clients = require('./trakteer-method.js');
const config = require("../config.json")
const Discord = require("discord.js")

module.exports = {
    name: 'saldo',
    description: "saldo command",
    async execute(msg){

    if(!msg.member.permissions.has("ADMINISTRATOR")) return;
    
     const Trakteer = new clients({
        'XSRF-TOKEN': config.xsrftoken,
        'trakteer-id-session': config.idsession,
        'webhook': config.webhook
     });

     const saldoargs = await Trakteer.getSaldo()+'';
     const pisahargssaldo = saldoargs.split('+');


     var  months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
     var d = new Date();
     var monthName = months[d.getMonth()];
     

     let alltime = pisahargssaldo[0]
     let bulanini = pisahargssaldo[1]
     let totalcair = pisahargssaldo[2]

     // let alltimeToINT = alltime.replace('Rp', '').replace('.', '').trim(' ') * 1
     // let totalcairToINT = totalcair.replace('Rp', '').replace('.', '').trim(' ') * 1
     // console.log(alltimeToINT-totalcairToINT)



     let embedsaldo = new Discord.MessageEmbed()
     .setColor(0x3498DB)
     .setAuthor({name: `Pendapatan Bulan Ini (${monthName}) : ${bulanini}\nTotal Saldo Ter-Cairkan : ${totalcair}\nTotal Saldo Saat ini : ${alltime}`})
     msg.channel.send({embeds: [embedsaldo]})



     

        
    }
}