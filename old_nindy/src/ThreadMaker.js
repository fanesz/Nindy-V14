

module.exports = {
  name: 'threadmaker',
  description: "thread maker",
  async execute(msg, client) {

    if (msg.author.bot) return;

    if (!msg.content.includes('202')) { return; }


    try {

      let recapblock1 = true
      let recapblock2 = true

      let recapAdminRole = [
        'Staff', //802865745238294528
        'Staff - Trial', //981493594013712394
      ]
      let recapChannel = [
        '815489497587253289', // graphic-design
        '815489518705836052', // artist-corner
        // '938296713171574825', // photography
        // '865027666628575262', // movies-tv-show
        // '895660381953994783', //// nindy-dev discord
        // '802877962575806484', // ngck command
      ]

      if (msg.member.permissions.has("ADMINISTRATOR")) { recapblock1 = false; }

      for (i = 0; i <= recapChannel.length - 1; i++) {
        if (await msg.member.roles.cache.find(r => r.name == recapAdminRole[i])) { recapblock1 = false; }
      }

      for (i = 0; i <= recapChannel.length - 1; i++) {
        if (msg.channelId == recapChannel[i]) { recapblock2 = false; }
      }

      if ((recapblock1 == true) || (recapblock2 == true)) { return; }

      let names = (msg.content)
        .replaceAll('815489497587253289', '#graphic-design')
        .replaceAll('815489518705836052', '#artist-corner')
        .replaceAll('938296713171574825', '#photography')
        .replaceAll('865027666628575262', '#video-editing')
        .replaceAll('1024137472130682922', '#Artwork Submission')
        .replaceAll('1024137206085984367', '#Graphic Design Submission')

      await msg.startThread({
        name: names,
        autoArchiveDuration: 4320,
        reason: 'Thread for Recap',
      });


    } catch (err) { console.log(err); }








  }
}