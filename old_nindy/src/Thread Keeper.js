// const Discord = require('discord.js')
// const db = require('quick.db')
// const loopcd = new Set()

// module.exports = {
//   name: 'threadkeeper',
//   description: "thread maker",
//   async execute(msg, client) {

//     // if(msg.content == 'gas'){
//     //     let base = await client.guilds.cache.get("802867983097004034").channels.cache.get("895660381953994783")
//     //     let tesss = await base.messages.fetch('1009497906279096391')
//     //         console.log(tesss)
//     //     }

//     // client.guilds.cache.get(guildIDs).channels.cache.get(thread1chid).messages.fetch('thread1id')
//     if (msg.author.bot) return;
//     try {

//       const guildIDs = '802865003606310953'

//       const thread1chid = '815489497587253289'
//       const thread2chid = '815489518705836052'
//       const thread3chid = '865027666628575262'

//       const thread1id = '1009726079369490492' // #graphic
//       const thread2id = '1009726334261542942' // #artist
//       const thread3id = '1009738186941026364' //video

//       const timestamp = (Math.floor((new Date().getTime()) / 1000))
//       const lastmsg = new db.table('Thread_Keeper')


//       // set kalo null
//       if (lastmsg.get(`${thread1id}.lastmsg`) == null) { lastmsg.set(`${thread1id}.lastmsg`, 0) }
//       if (lastmsg.get(`${thread2id}.lastmsg`) == null) { lastmsg.set(`${thread2id}.lastmsg`, 0) }
//       if (lastmsg.get(`${thread3id}.lastmsg`) == null) { lastmsg.set(`${thread3id}.lastmsg`, 0) }
//       if (await lastmsg.get(`lastscan.lastscan`) == null) { lastmsg.set('lastscan.lastscan', 0) }

//       // scan reset
//       if ((msg.content == '-threadscanreset') && msg.member.permissions.has('ADMINISTRATOR')) {
//         loopcd.delete(1)
//         msg.reply('Successfully reset!, try `-thread` again!')
//       }


//       // loop per 15 menit cek if > 3 day
//       async function loopcheck() {
//         let thread1 = await client.guilds.cache.get(guildIDs).channels.cache.get(thread1chid).threads.fetch(thread1id)
//         let thread2 = await client.guilds.cache.get(guildIDs).channels.cache.get(thread2chid).threads.fetch(thread2id)
//         let thread3 = await client.guilds.cache.get(guildIDs).channels.cache.get(thread3chid).threads.fetch(thread3id)
//         // console.log(thread1);
//         // console.log(thread2);
//         // console.log(thread3);

//         // let threadtes = await client.channels.fetchActive('1010892052428509256')
//         // console.log(threadtes);

//         // let threadtes2 = await client.guilds.cache.get(guildIDs).channels.cache.get('802877962575806484').threads.fetch('1010892052428509256')



//         let thread1check = await lastmsg.get(`${thread1id}.lastmsg`)
//         let thread2check = await lastmsg.get(`${thread2id}.lastmsg`)
//         let thread3check = await lastmsg.get(`${thread3id}.lastmsg`)
//         let looptimestamp = (Math.floor((new Date().getTime()) / 1000))
//         await lastmsg.set(`lastscan.lastscan`, looptimestamp)

//         try {
//           if ((looptimestamp - thread1check) >= 259200) { //259200
//             await thread1.send('! Thread Keeper !').then((m) => {
//               setTimeout(async () => { await m.delete() }, 2000)
//             })
//             await lastmsg.set(`${thread1id}.lastmsg`, looptimestamp)
//           }
//           if ((looptimestamp - thread2check) >= 259200) {
//             await thread2.send('! Thread Keeper !').then((m) => {
//               setTimeout(async () => { await m.delete() }, 2000)
//             })
//             await lastmsg.set(`${thread2id}.lastmsg`, looptimestamp)
//           }
//           if ((looptimestamp - thread3check) >= 259200) {
//             await thread3.send('! Thread Keeper !').then((m) => {
//               setTimeout(async () => { await m.delete() }, 2000)
//             })
//             await lastmsg.set(`${thread3id}.lastmsg`, looptimestamp)
//           }
//         } catch (err) { console.log(err) }
//         setTimeout(() => {
//           //   console.log('looped');
//           loopcheck()
//         }, 900000) //900000

//       }
//       if (!loopcd.has(1)) {
//         loopcd.add(1)
//         console.log('on!!');
//         loopcheck()
//       }





//       // refresh timestamp di db
//       if (msg.channelId == thread1id) {
//         await lastmsg.set(`${thread1id}.lastmsg`, timestamp)
//       } else if (msg.channelId == thread2id) {
//         await lastmsg.set(`${thread2id}.lastmsg`, timestamp)
//       } else if (msg.channelId == thread3id) {
//         await lastmsg.set(`${thread3id}.lastmsg`, timestamp)
//       }


//       // cek db
//       if ((msg.content == '-thread') && msg.member.permissions.has('ADMINISTRATOR')) {

//         let thread1check = '<t:' + await lastmsg.get(`${thread1id}.lastmsg`) + ':R>'
//         let thread2check = '<t:' + await lastmsg.get(`${thread2id}.lastmsg`) + ':R>'
//         let thread3check = '<t:' + await lastmsg.get(`${thread3id}.lastmsg`) + ':R>'
//         let lastscan = '<t:' + await lastmsg.get(`lastscan.lastscan`) + ':R>'

//         let embedsaldo = new Discord.MessageEmbed()
//           .setColor('fd46bc')
//           .setTitle('Thread Keeper')
//           .setDescription(`• <#${thread1id}> → ${thread1check} \n • <#${thread2id}> → ${thread2check} \n • <#${thread3id}> → ${thread3check} \n\n last scan = ${lastscan}`)
//           .setFooter({ text: '-threadscanreset | kalo last scan > 15 menit' })
//         msg.reply({
//           embeds: [embedsaldo],
//           allowedMentions: {
//             repliedUser: false
//           }
//         })
//       }

//     } catch (err) { console.log(err); }

//   }
// }