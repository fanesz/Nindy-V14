const db = require('quick.db')

module.exports = {
    name: 'afkset',
    description: "afk command",
    async execute(msg){


        const userid = msg.author.id
        const afkList = new db.table('AFK_Users')

        if(msg.author.bot) return;

        

        if(msg.content == '-afk'){
            msg.reply('-afk (reason)')
        } else 
        
        if(msg.content.startsWith('-afk')){
            const args = msg.content.slice(5)
            
            if(afkList.get(`${userid}.reason`) == null){
                await afkList.set(`${userid}.reason`, args)
                msg.reply('AFK set: sedang `'+args+'`')

                try{
                    let username = msg.member.displayName
                    await msg.member.setNickname(`[AFK] ${username}`)
                } catch(err) { }
                


            } else {
                msg.reply('You already AFK, sir!, just normal chat to remove your afk status <:nindy_yes:977817511821213757>')
            }

        } else {

            if(afkList.get(`${userid}.reason`) != null){
                let alesan = afkList.get(`${userid}.reason`)
                afkList.delete(`${userid}`)
                msg.reply('Dah kelar `' + alesan + '`, you no longer AFK, sir! <:nindy_yes:977817511821213757>').then((m) => {
                    setTimeout(() => { try{ m.delete() }catch(err){} }, 4000)
                })
                    
                

                try{
                    let username = msg.member.displayName
                    let noafkusername = username.replace('[AFK]', '')
                    await msg.member.setNickname(noafkusername)
                } catch(err) { }
            }

        }




    }
}