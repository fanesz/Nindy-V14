// const Discord = require('discord.js')
// module.exports = {
//     name: 'EmojiLogs',
//     description: "EmojiLogs detection",
//     execute(msg, client){
//     if (msg.author.bot) return;

//     if (msg.content.includes(':')) {
//         if (msg.content.includes('<') && msg.content.includes('>')) return;

//         let words = msg.content
//         let list = []

//         for (let i=0; i < words.length; i++) {
        
//          if (words[i].includes(':')) {
//             list.push(i)
//          }
//         }

//         if(list.length %2 == 0){
//             if (list.length >= 2){
//                 if(list[1]-list[0] == 1)return;
//                 if(list[1]-list[0] >= 15)return;
//                 let nocolon = msg.content.substring(list[0]+1, list[1])
//                 if(nocolon.includes('.') || nocolon.includes('http'))return;
//                 if(!nocolon.includes('\n') && !nocolon.includes(' ')){

//                     let id = msg.author.id
//                     let username = msg.member.displayName
//                     let channel = `<#`+msg.channel.id+`>`
//                     let content = '```'+msg.content+'```'
//                     const emojilogembed = new Discord.MessageEmbed()
//                     .setTitle(`:notepad_spiral: Emoji Detected!`)
//                     .setDescription(`by : ${username} / ${msg.author.tag} | at : ${channel} \ncontent : ${content}\n[Jump to Message!](${msg.url})`)
//                     .setColor('0099E1')
//                     .setFooter({text: `userID : ${id}`})
//                     client.guilds.cache.get("802865003606310953").channels.cache.get("969467509726134272").send({embeds : [emojilogembed]});

//                 } // ngck : 802865003606310953 969467509726134272 | nindy 802867983097004034 802869213290692658
//             } 
//         }


//     }



//     }
// }
