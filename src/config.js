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
  honorable_LogChannelID: process.env.DEPLOY_CONTEXT == "dev" ? "1177127843537375242" : "942414209453555793",
  staffCommand_LogChannelID: process.env.DEPLOY_CONTEXT == "dev" ? "1177127843537375242" : "981498267948941342",
  donatur_LogChannelID: process.env.DEPLOY_CONTEXT == "dev" ? "962197157174181909" : "962197157174181909",
  
  mute_RoleID: process.env.DEPLOY_CONTEXT == "dev" ? "1043736567749017620" : "802905885327491114",
  nsfw_RoleID: process.env.DEPLOY_CONTEXT == "dev" ? "1043736549814194196" : "802892741355896842",
  folks_RoleID: process.env.DEPLOY_CONTEXT == "dev" ? "1180557782802497546" : "940237965689503774",
  oneYearServiceRole: process.env.DEPLOY_CONTEXT == "dev" ? "1049590864042803220" : "1049592266521583617",
  twoYearServiceRole: process.env.DEPLOY_CONTEXT == "dev" ? "1049590864042803220" : "1050298205952286760",
  threeYearServiceRole: process.env.DEPLOY_CONTEXT == "dev" ? "1049590864042803220" : "1180739320714379414",

  embedColor: "#fd46bc",

}