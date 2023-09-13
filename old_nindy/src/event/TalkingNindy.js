module.exports = {
    name: 'messageCreate',
    once: false,
    execute(msg){


        const nindy = '<@890071421508788314>'

        try{

          if (msg.content.toLowerCase().includes('botnya pinter')){msg.channel.send('Makasih :face_with_hand_over_mouth:')}
          
          if (msg.content.startsWith(nindy)){
            const msgc = msg.content
        
            let username = msg.member.displayName
        
            //multiple detect
            let badword = ['tai', 'ngewe', 'kontol', 'memek', 'sex', 'nigga', 'oi', 'pipis', 'ngentot', 'kocok', 'susu', 'anjing', 'bego', 'goblo', 'dongo', 'colmek', 'ngocok', 'peler']
            let privasi = ['agama kamu', 'umur', 'kelamin', 'ukuran', 'tempat tinggal', 'alamat', 'kelas']
        
        
            //multiple reply
            let onlytag = ['Hadir!!', 'Nindy disini!', 'Iyaa??', 'Knapa manggil manggil?', 'Yes sir?', 'Apasih ngetag ngetag :confused:']
            var onlytags = onlytag[Math.floor(Math.random() * onlytag.length)];
        
            let tes = ['Kenapa tes tes?', 'Iyaa masukk', 'tis :face_with_hand_over_mouth:', 'tes tos tes tos, brisik :unamused:', 'y']
            var tess = tes[Math.floor(Math.random() * tes.length)];
        
            let pagi = [`pagi juga ${username}... udah sarapan blom?`, `pagi juga ${username} :white_sun_rain_cloud:`, `pagi juga ${username}, tumben bangun jam segini...`]
            var pagis = pagi[Math.floor(Math.random() * pagi.length)];
        
            let siang = [`siang juga ${username}... udah makam blom?`, `siang juga ${username} :sunny:`, `siang juga ${username}, kamu lagi apa?`]
            var siangs = siang[Math.floor(Math.random() * siang.length)];
        
            let sore = [`sore juga ${username}... semangat ya puasanya!!`, `sore juga ${username} ^^`, `sore juga ${username}, kamu lagi apa?`]
            var sores = sore[Math.floor(Math.random() * sore.length)];
        
            let malem = [`malem juga ${username}... udah makan malem blom?`, `malem juga ${username}, jangan sering-sering bergadang yah...`, `siang juga ${username}, kamu lagi apa?`]
            var malems = malem[Math.floor(Math.random() * malem.length)];
        
            
        
            //ban natan
          if(msg.author.id == '400673466409418753') return msg.reply('maaf natan aku gasuka kamu...')
        
          
          if(badword.some(e => msg.content.includes(e))){msg.channel.send('Kok kasar sih :cry:')}else
          if(privasi.some(e => msg.content.includes(e))){msg.channel.send('Maaf privasi, hehe :face_with_hand_over_mouth:')}else
          
        
            //mulai
           if(msgc.endsWith(nindy)){msg.reply(onlytags)} else
           if(msgc.startsWith(nindy+' tes')){msg.reply(tess)}  else
           if(['hai', 'halo', 'hy'].some(e => msg.content.includes(e))){msg.channel.send(`hai juga ${username} :blush:`)}else
           if(msgc.includes(' aku puasa')){msg.reply('wahh.. semangat puasanya :blush:')}  else
           if(msgc.includes(' kamu siapa')){msg.reply('Forensic Expert & Certified Agent di NGCK Department, Nindy Luzie is Online !')} else
           if(msgc.includes(' pacar aku')){
             if (msg.author.id == '278169600728760320') {msg.reply('sama Vanezzz mau kok :blush:')} else if(msg.author.id == '390534913310457869') {msg.reply('sama Ghavin temenan aja yah...')} else{msg.reply('gamau, kamu bau :nauseated_face:')}} else
             
           if(msgc.includes(nindy+' pagi')){msg.reply(pagis)} else 
           if(msgc.includes(nindy+' siang')){msg.reply(siangs)}  else
           if(msgc.includes(nindy+' sore')){msg.reply(sores)} else
           if(msgc.includes(nindy+' malem')){msg.reply(malems)} else
           if(msgc.includes(nindy+' malam')){msg.reply(malems)} else
           
           if(msgc.startsWith(nindy+' apa ben')){msg.reply('iya dek')} else
           if(msgc.includes('sekolah')){msg.reply('apa itu sekolah?? yang penting itu sholat')} else
           if(msgc.includes('genshin')){msg.reply('genshin game tidur <:mengtidur:845251508656537631>')} else
           if(msgc.includes('makasih')){msg.reply(`sama-sama ${username}-kun :face_with_hand_over_mouth:`)} else
           if(msgc.includes('nikah')){msg.reply('haaaluuuuuuuuuuuuuuuuu <:lol2:809278081235812363>')} else
          if(msgc.includes('dota')){msg.reply('dota game gaje <:goldenmoyai:932506661590020156>')} else
           // if(msgc.includes('')){msg.reply('')} else
           // if(msgc.includes('')){msg.reply('')} else
           // if(msgc.includes('')){msg.reply('')} else
        
           msg.reply('gatau maksud kamu apaan...<:nindy_ho:977817574500859944>')
        
          }
          

        }catch(err){}

    }
}