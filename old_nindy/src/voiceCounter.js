const db = require('quick.db')
// start = 19:00 WIB, 23 Januari 2023

module.exports = {
  name: 'voiceCounter',
  description: "userXP command",
  async execute(oldState, newState) {

    if (oldState.guild.id != "802865003606310953") return; //debug 802867983097004034 | ngck 802865003606310953

    try {
      const userXP = new db.table('userVoice')
      const userid = await newState.id
      const userVoice = await userXP.get(`${userid}.second`)

      if (userVoice == null) {
        await userXP.set(`${userid}.second`, 0)
      }

      function start() {
        intervalID = setInterval(() => {
          userXP.add(`${userid}.second`, 1)
        }, 1000)
      }

      function stop() {
        clearInterval(intervalID);
      }

      if (oldState.channel != null && newState.channel == null) { //join 
        if (oldState.member.user.bot == true) return;
        if (oldState.mute == false && oldState.channel.members.size > 1) {
          start()
        }
      } else if (oldState.channel == null && newState.channel != null) { //left
        if (oldState.member.user.bot == true) return;
        try { stop() } catch (err) { }
      } else { //other
        if (oldState.member.user.bot == true) return;
        if (oldState.mute == true) {
          try { stop() } catch (err) { }
        } else if (oldState.mute == false && oldState.channel.members.size > 1) {
          start()
        }
      }


    } catch (err) {
      console.log(err);
    }


  }
}


//reset tabel
//userXP.all().map(m => userXP.delete(m.ID))