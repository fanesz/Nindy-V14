module.exports = {
  prefix: "-",
  owner: "278169600728760320",
  guildID: process.env.DEPLOY_CONTEXT == "dev" ? "802867983097004034" : "802865003606310953",

  slashCMD_LogChannelID: process.env.DEPLOY_CONTEXT == "dev" ? "1152089543219101769" : "1152642684486430901",
  userUpdate_LogChannelID: process.env.DEPLOY_CONTEXT == "dev" ? "1152089543219101769" : "1152642684486430901",
  voice_LogChannelID: process.env.DEPLOY_CONTEXT == "dev" ? "1152089543219101769" : "962406610523816056",
  muted_LogChannelID: process.env.DEPLOY_CONTEXT == "dev" ? "1152089543219101769" : "1152642684486430901",
  moderation_LogChannelID: process.env.DEPLOY_CONTEXT == "dev" ? "1152089543219101769" : "802877437477912576",
  automod_LogChannelID: process.env.DEPLOY_CONTEXT == "dev" ? "1177127843537375242" : "988016439413846066",
  
  mute_RoleID: process.env.DEPLOY_CONTEXT == "dev" ? "1043736567749017620" : "802905885327491114",
  nsfw_RoleID: process.env.DEPLOY_CONTEXT == "dev" ? "1043736549814194196" : "802892741355896842",

  embedColor: "#fd46bc",

}