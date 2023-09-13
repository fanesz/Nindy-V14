const db = require('quick.db')

module.exports = {
    name: 'afkdetect',
    description: "afk command",
    execute(msg){



        let mentionList = [...msg.mentions.users.keys()]
        const afkList = new db.table('AFK_Users')
        const afkuserList = afkList.all()

        if(msg.author.bot) return;

        for(i=0;i<=afkuserList.length-1;i++){

            for(j=0;j<=mentionList.length-1;j++){

                if(mentionList[j] == afkuserList[i].ID){
                    let reason = afkList.get(`${mentionList[j]}.reason`)
                    msg.reply('orangnya AFK ngab, lagi `' + reason + '` <:nindy_ho:977817574500859944>').then((m) => {
                        setTimeout(() => { try{ m.delete() }catch(err){} }, 5000)
                    })
                       
                    
                    
                }

            }

        }

        
            



    }
}