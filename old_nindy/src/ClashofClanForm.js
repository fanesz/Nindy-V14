const config = require("../config.json")
const db = require('quick.db')
const Discord = require('discord.js')

module.exports = {
    name: 'coc',
    description: "coc command",
    async execute(msg, client){

      try{

      if(msg.author.bot)return;

      const userid = msg.author.id
      const coc = new db.table('ClashofClans')


        
      async function addRole(id){
        try{
          let guild = await client.guilds.cache.get("802865003606310953"); //debug 802867983097004034 //ngck 802865003606310953
          let role = await guild.roles.cache.get("993118234050043904"); //debug 803908099629907990 //ngck 993118234050043904
          let member = await guild.members.fetch(id)
          await member.roles.add(role)
        } catch(err){}
      }

      async function removeRole(id){
        try{
          let guild = await client.guilds.cache.get("802865003606310953"); //debug 802867983097004034 //ngck 802865003606310953
          let role = await guild.roles.cache.get("993118234050043904"); //debug 803908099629907990 //ngck 993118234050043904
          let member = await guild.members.fetch(id)
          await member.roles.remove(role)
        } catch(err){}
      }


      if(msg.content == config.prefix+'coc?'){ 
        const cocinfo = new Discord.MessageEmbed()
        .setTitle(`About [-coc] command`)
        .setThumbnail('https://i.imgur.com/sMCYy7r.png')
        .setColor('fd46bc')
        .setDescription('Ini adalah list command untuk mendaftarkan akun di clan Metanoia')
        .addFields(
          {name: '-coc?', value: 'untuk menampilkan info ini'},
          {name: '-coc', value: 'untuk menampilkan list akun kamu yang sudah terdaftar'},
          {name: '-cocadd (ign)', value: 'untuk mendaftarkan ign kamu ke database'},
          {name: '-cocdel (ign)', value: 'untuk menghapus ign yang sudah kamu daftarkan'},
          {name: '-cocfind (ign)', value: 'untuk mencari pemilik akun'},
          {name: '-coclist', value: 'untuk melihat semua list pemilik akun dari clan Metanoia'},
          {name: '-cocreset', value: 'untuk reset semua akun *anda* yang telah anda daftarkan'}
          )
        .setFooter({text:'Metanoia adalah clan numpang milik **Adam**, salah satu member NGCK!'})
        msg.reply({embeds: [cocinfo]})
      }


      else if(msg.content == config.prefix+'coc'){
        let userdata = await coc.get(`${userid}.akun`)
        if((userdata == null) || (userdata.length == 0)){ msg.reply("You don't have any account in our database!"); return; }
        let accountlist = '';
        for(i=0;i<=userdata.length-1;i++){
          accountlist = accountlist + '- ' + userdata[i] + '\n'
        }
        const resultembed = new Discord.MessageEmbed()
        .setTitle(`${msg.member.displayName}'s account list :`)
        .setDescription(accountlist)
        .setThumbnail('https://i.imgur.com/sMCYy7r.png')
        .setColor('fd46bc')
        .setFooter({text:'-coc? | -cocadd | -cocdel | -cocfind'})
      msg.reply({embeds: [resultembed]})
      }


      else if(msg.content.startsWith('-cocadd')){
        if(msg.content == '-cocadd'){ msg.reply('`-cocadd (ign)` → untuk menambahkan akun ke database!'); return; }
        if(msg.content.startsWith('-cocadd ')){
          let args = msg.content.slice(8)
          if(await coc.get(`${userid}.akun`) == null){
            await coc.set(`${userid}.akun`, [])
          }
          // if(args.includes(' ')){
          //   if(args.includes('  ')){ msg.reply('Please no double (space)!'); return; }
          //   let addedlist = '';
          //   let argssplit = args.split(' ')
          //   for(i=0;i<=argssplit.length-1;i++){
          //     if(argssplit[i].length >= 3){
          //       coc.push(`${userid}.akun`, argssplit[i])
          //       addedlist = addedlist + ', ' + argssplit[i]
          //     }
          //   }
          //   addedlist = addedlist.slice(2, addedlist.length)
          //   msg.reply('Successfully add `' + addedlist + '` into database!')
          //   addRole(userid)
          // } else {
            coc.push(`${userid}.akun`, args)
            msg.reply('Successfully add `' + args + '` into database!')
            addRole(userid)
        // }
      }


      } else if(msg.content.startsWith('-cocdel')){
        if(msg.content == '-cocdel'){ msg.reply('`-cocdel (ign)` → untuk menghapus akun anda dari database!'); return; }
        if(msg.content.startsWith('-cocdel ')){

          let args = msg.content.slice(8)
          if(args.includes(' del ')){ msg.reply('`-cocdel (ign)`'); return; }
          // if(args.includes(' ')){ msg.reply('you only can remove 1 by 1 account per command!'); return; }
          if((coc.get(`${userid}.akun`) == null) || (coc.get(`${userid}.akun`).length == 0)){ msg.reply("You don't have any account in our database!"); return; }
    
          let userdata = await coc.get(`${userid}.akun`)
          let replymsg = '`' + args + '` is not matched!, your account list : '
          let found = false
          let temp = await coc.get(`${userid}.akun`)
    
          for(i=0;i<=userdata.length-1;i++){
            if(args == temp[i]){
              temp.splice(i, 1)
              coc.delete(`${userid}.akun`)
              if(temp.length == 0){
                coc.delete(`${userid}`)
                removeRole(userid)
              } else {
                await coc.set(`${userid}.akun`, temp)
              }
              msg.reply('Successfully remove `'+ args + '` from our database!')
              found = true
              break
            }
          }
          if (found == false){
            for(j=0;j<=userdata.length-1;j++){
              replymsg = replymsg + '\n' + `- ${userdata[j]}`
            }
            msg.reply(replymsg)
          }
        }

        
        } else if(msg.content.startsWith('-cocfind')){
          if(msg.content == '-cocfind'){ msg.reply('`-cocfind (ign)` → untuk mencari pemilik akun coc!'); return; }
          if(msg.content.startsWith('-cocfind ')){
            let args = msg.content.slice(9)
            // if(args.includes(' ')){ msg.reply('you only can find 1 by 1 account per command!'); return; }
            let alldata = coc.all()
            let userlist = []
            let akunlist = []
            for(i=0;i<=alldata.length-1;i++){
              userlist.push(alldata[i].ID)
              akunlist.push(alldata[i].data.akun)
            }
            let found = false
            for(i=0;i<=userlist.length-1;i++){
              for(j=0;j<=akunlist.length-1;j++){
              if(args == akunlist[i][j]){
                let searchresult = new Discord.MessageEmbed()
                .setDescription('`' + args + '` is ' + '<@' + userlist[i] + ">'s account!" )
                .setColor('fd46bc')
                msg.reply({embeds: [searchresult]})
                found = true
                break
              }
          }
        }
        if(found == false){
          msg.reply('`' + args + "` not found!, try `-coclist` to check all member's account!")
        }  
          }
      } else if(msg.content == '-coclist'){

        let alldata = coc.all()
        let userlist = []
        let akunlist = []
        for(i=0;i<=alldata.length-1;i++){
          userlist.push(alldata[i].ID)
          akunlist.push(alldata[i].data.akun)
        }
        let result = '';
        for(i=0;i<=akunlist.length-1;i++){
          if(akunlist[i].length == 1){
            result = result + '<@' + userlist[i] + '> → ' + akunlist[i][0] + '\n'
          } else {
            let allaccount = '';
            for(j=0;j<=akunlist[i].length-1;j++){
              allaccount = allaccount + akunlist[i][j] + ', '
            }
            let finalallaccount = allaccount.slice(0, allaccount.length-2)
            result = result + '<@' + userlist[i] + '> → ' + finalallaccount + '\n'
          }
        }
        let searchresult = new Discord.MessageEmbed()
        .setTitle("List of Metanoia's member!")
        .setDescription(result)
        .setColor('fd46bc')
        .setThumbnail('https://i.imgur.com/sMCYy7r.png')
        .setFooter({text:'-coc? | -cocadd | -cocdel | -cocfind'})
        msg.reply({embeds: [searchresult]})

        
      } else if(msg.content == '-cocreset') {
        coc.delete(`${userid}`)
        msg.reply('Successfully reset all your listed account in our database!')
      }




     
      }catch(err){console.log(err)}
}}