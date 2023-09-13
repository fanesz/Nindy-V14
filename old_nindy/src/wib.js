module.exports = {
    name: 'wib',
    description: "wib command",
    execute(msg){


      const args = (msg.content.slice(5)).trim()

      if(msg.content == '-wib'){
        msg.reply('-wib (8utc-4) -> untuk convert jam 8am(utc-4) ke WIB <:nindy_yes:977817511821213757>')
      }


      else if(args.includes('utc+')){
        try{ 
          let numsplit = args.split('utc+')
          if(numsplit[0] == null){
            numsplit[0] = (new Date()).getHours()
          }
          let numplus = numsplit[1]*1
          let numawal = numsplit[0]*1

          let result = numawal-numplus+7
          if(result>=24){ result = result-24 } else if(result<=0){ result = result+24 }

          msg.reply(`${numawal}:00 UTC + ${numplus} = ${result}:00 WIB <:nindy_yes:977817511821213757>`)

      }catch(err){}
        
      } else if(args.includes('utc-')){
        try{ 
          let numsplit = args.split('utc-')
          if(numsplit[0] == null){
            numsplit[0] = (new Date()).getHours()
          }
          let numplus = numsplit[1]*1
          let numawal = numsplit[0]*1

          let result = numawal+numplus+7
          if(result>=24){ result = result-24 } else if(result<=0){ result = result+24 }

          msg.reply(`${numawal}:00 UTC - ${numplus} = ${result}:00 WIB <:nindy_yes:977817511821213757>`)

      }catch(err){}

      } else if(args == 'utc') {

        msg.reply(`UTC = WIB+7 <:nindy_yes:977817511821213757>`)

      } else if(args.endsWith('utc')){
        try{

          let numsplit = (args.replace('utc', '').trim()) * 1

          msg.reply(`${numsplit} UTC = ${numsplit+7} WIB <:nindy_yes:977817511821213757>`)

        }catch(err){}
      }

    
}}
