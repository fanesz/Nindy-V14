
module.exports = {
    name: 'joinrole',
    description: "help command",
    async execute(msg,client){
try{
        
        let onlytag = msg.content.split(' has earned the **`Agent`** role!')
        let onlyid0 = onlytag[0].replace('<', '').replace('>', '').replace('!', '').replace('@', '').replace('**', '')
        let onlyid = onlyid0.replace('**', '')


        const guild = client.guilds.cache.get("802865003606310953");
        const role = guild.roles.cache.get("940237965689503774")
        const member = await guild.members.fetch(onlyid)

        await member.roles.add(role)


} catch(err){console.log(err)}


    }}