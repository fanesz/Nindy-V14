const userset = new Set();
const spamset = new Set();
const usersetsticker = new Set();
const spamsetsticker = new Set();
const usersetimg = new Set();
const spamsetimg = new Set();

module.exports = {
name: 'antispam',
description: "antispam command",
async execute(msg, client){
try{
    

//
if(msg.author.bot) return;
if(msg.channelId == '802920713710600262') return; // mudae
if(msg.channelId == '827113811647004713') return; // command
if(msg.channelId == '930025413391032350') return; // temvur istri
if(msg.channelId == '802865004239126543') return; // music
if(msg.channelId == '802877962575806484') return; // admin command

const guildIDs = '802865003606310953' // ngck 802865003606310953 | nindy 802867983097004034
const channelIDs = '802877437477912576' // ngck 802877437477912576 | nindy 895660381953994783

async function muteRole(userid){
    const guild = client.guilds.cache.get(guildIDs);
    const role = guild.roles.cache.get("802905885327491114")
    const member = await guild.members.fetch(userid)
    await member.roles.add(role)
    setTimeout(async()=>{
        await member.roles.remove(role)
    }, 10000)
}
    

function getData(){
    let jamlogs;
    let menitlogs;
    let detiklogs;
    let currentdate = new Date(); 
    let jamlogsX = currentdate.getHours() + 7 //gmt +7
    if (jamlogsX > 23){
        jamlogs = jamlogsX - 24
    } else{jamlogs = jamlogsX}
    menitlogs = currentdate.getMinutes()
    detiklogs = currentdate.getSeconds()
    jamlogs = ("0" + jamlogs).slice(-2);
    menitlogs = ("0" + menitlogs).slice(-2);
    detiklogs = ("0" + detiklogs).slice(-2);
    let datetime = jamlogs+':'+menitlogs+':'+detiklogs
    return datetime
}

// image di send sekaligus, lebih dari 3 
const imgobj = Object.fromEntries(msg.attachments)
if(msg.attachments.size >= 3){
    let imgName = []
    let imgSize = []
    let imgWidth = []
    let imgHeight = []
    for(i=0;i<=msg.attachments.size-1;i++){

        let imgNameraw = (Object.values(imgobj)[i]).attachment.split('/')[6]
        let imgSizeRaw = (Object.values(imgobj)[i]).size
        let imgWidthRaw = (Object.values(imgobj)[i]).width
        let imgHeightRaw = (Object.values(imgobj)[i]).height

        imgName.push(imgNameraw)
        imgSize.push(imgSizeRaw)
        imgWidth.push(imgWidthRaw)
        imgHeight.push(imgHeightRaw)

    }
    if(imgName.length >= 3){
        
        if((imgSize[0] == imgSize[1]) && (imgSize[0] == imgSize[2]) && (imgWidth[0] == imgWidth[1]) && (imgWidth[0] == imgWidth[2]) && (imgHeight[0] == imgHeight[1]) && (imgHeight[0] == imgHeight[2]) && (imgName[0] == imgName[1]) && (imgName[0] == imgName[2])){

            await client.guilds.cache.get(guildIDs).channels.cache.get(channelIDs).send('`[' + getData() + ']` :exclamation: ' + `**${msg.author.tag}** detected spamming at <#${msg.channelId}>`)
            await msg.delete()
            msg.channel.send(`<@${msg.author.id}>, muted! no spam ngab <:nindy_ho:977817574500859944>`).then((m)=>{
                setTimeout(()=>{
                    m.delete()
                }, 5000)
            })

        }
    }
} else if (msg.attachments.size == 1){
    let imgSize = (Object.values(imgobj)[0]).size
    if(usersetimg.has(msg.author.id+imgSize)){
        if(spamsetimg.has(msg.author.id)) {
            await client.guilds.cache.get(guildIDs).channels.cache.get(channelIDs).send('`[' + getData() + ']` :exclamation: ' + `**${msg.author.tag}** detected spamming at <#${msg.channelId}>`)
            muteRole(msg.author.id)
            await msg.delete()
            msg.channel.send(`<@${msg.author.id}>, chill ngab! no spam <:nindy_ho:977817574500859944>`).then((m)=>{
                setTimeout(()=>{
                    m.delete()
                }, 20000)
            })
            spamsetimg.delete(msg.author.id)
            usersetimg.delete(msg.author.id+imgSize)
        } else {
            spamsetimg.add(msg.author.id)
        }
    } else {
        usersetimg.add(msg.author.id+imgSize)
        setTimeout(() => {
            usersetimg.delete(msg.author.id+imgSize)
        }, 2000)
    }
}

// sticker
const stickerobj = Object.fromEntries(msg.stickers)
if(msg.stickers.size >= 1){
    let stickerID = Object.values(stickerobj)[0].id
    if(usersetsticker.has(msg.author.id+stickerID)){
        if(spamsetsticker.has(msg.author.id)) {
            await client.guilds.cache.get(guildIDs).channels.cache.get(channelIDs).send('`[' + getData() + ']` :exclamation: ' + `**${msg.author.tag}** detected spamming at <#${msg.channelId}>`)
            muteRole(msg.author.id)
            await msg.delete()
            msg.channel.send(`<@${msg.author.id}>, muted! no spam ngab <:nindy_ho:977817574500859944>`).then((m)=>{
                setTimeout(()=>{
                    m.delete()
                }, 20000)
            })
        } else {
            spamsetsticker.add(msg.author.id)
        }
    } else {
        usersetsticker.add(msg.author.id+msg.content)
        setTimeout(() => {
            usersetsticker.delete(msg.author.id+msg.content)
            spamsetsticker.delete(msg.author.id)
        }, 10000)
    }
}

// gif / normal msg
if(userset.has(msg.author.id+msg.content)){
    if(spamset.has(msg.author.id)) {
        await client.guilds.cache.get(guildIDs).channels.cache.get(channelIDs).send('`[' + getData() + ']` :exclamation: ' + `**${msg.author.tag}** detected spamming at <#${msg.channelId}>`)
        muteRole(msg.author.id)
        await msg.delete()
        msg.channel.send(`<@${msg.author.id}>, muted! no spam ngab <:nindy_ho:977817574500859944>`).then((m)=>{
            setTimeout(()=>{
                m.delete()
            }, 20000)
        })
        spamset.delete(msg.author.id)
        userset.delete(msg.author.id+msg.content)
    } else {
        spamset.add(msg.author.id)
    }
} else {
    userset.add(msg.author.id+msg.content)
    setTimeout(() => {
        userset.delete(msg.author.id+msg.content)
    }, 2000)
}


} catch(err) { console.log(err); }


}}