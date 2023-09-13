
module.exports = {
    name: 'messageCreate',
    once: false,
    execute(msg){
       if (msg.channel.id != '802919702422355969') return;
       try{
        if (msg.content.toLowerCase() == "p") {   
            msg.reply("P juga, Intro yang bener dong kak!")}
         if (msg.content.toLowerCase() == "pp") {   
            msg.reply("P juga, Intro yang bener dong kak!")}
         if (msg.content.toLowerCase() == "test") {   
            msg.reply("masuk, namanya siapa kak?")}
         if (msg.content.toLowerCase() == "tes") {   
            msg.reply("masuk, namanya siapa kak?")}
         if (msg.content.toLowerCase() == "hi") {   
            msg.reply("Hi juga!, namanya siapa?")}
         if (msg.content.toLowerCase() == "hy") {   
            msg.reply("Hy juga!, namanya siapa?")}
         if (msg.content.toLowerCase() == "hai") {   
            msg.reply("Hai juga!, namanya siapa?")}
         if (msg.content.toLowerCase() == "halo") {   
            msg.reply("Halo juga!, intro dong...")}
         if (msg.content.toLowerCase() == "kak") {   
            msg.reply("iya dek, intro dulu!")}
         if (msg.content.toLowerCase() == "bang") {   
            msg.reply("iya bang, intro yang bener!")}
         if (msg.content.toLowerCase() == "#role-claim") {   
            msg.reply("iya <#802874125856014346>, tapi intro dulu!")}
         if (msg.content.toLowerCase() == "kontol") {   
            msg.reply("kasar kali kak..., intro dulu yg bener...")}
         if (msg.content.toLowerCase() == "woe") {   
            msg.reply("woe, intro yg bener!")}
         if (msg.content.toLowerCase() == "p bang") {   
            msg.reply("p juga bang, namanya siapa bang?")}
         if (msg.content.toLowerCase() == "oy") {   
            msg.reply("oy oy, intro dulu kak...")}
         if (msg.content.toLowerCase() == "oi") {   
            msg.reply("oi oi, intro dulu kak...")}
         if (msg.content.toLowerCase() == "yo") {   
            msg.reply("yo wassap, intronya mana?")}
         if (msg.content.toLowerCase() == "assalamualaikum") {  
            msg.reply("waalaikumsalam!, namanya siapa?")}
         if (msg.content.toLowerCase() == "samlekom") {   
            msg.reply("komsalam, namanya siapa?")}
       }catch(err){}
    }
}