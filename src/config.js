module.exports = {
  prefix: "-",
  owner: "278169600728760320",
  guildID: process.env.DEPLOY_CONTEXT == "dev" ? "802867983097004034" : "802865003606310953",

  slashCMD_LogChannelID: process.env.DEPLOY_CONTEXT == "dev" ? "1152089543219101769" : "1152642684486430901",
  userUpdate_LogChannelID: process.env.DEPLOY_CONTEXT == "dev" ? "1152089543219101769" : "1152642684486430901",
  voice_LogChannelID: process.env.DEPLOY_CONTEXT == "dev" ? "1152089543219101769" : "962406610523816056",
  muted_LogChannelID: process.env.DEPLOY_CONTEXT == "dev" ? "1152089543219101769" : "1152642684486430901",
  
  mute_RoleID: process.env.DEPLOY_CONTEXT == "dev" ? "1043736567749017620" : "802905885327491114",
  nsfw_RoleID: process.env.DEPLOY_CONTEXT == "dev" ? "1043736549814194196" : "802892741355896842",

  embedColor: "#fd46bc",

  // sessionID: "eyJpdiI6IitkWHRtalhLZU5wcmFsckhGbVFVSXc9PSIsInZhbHVlIjoiMjQ3c3NWR2lYZUZqb3NpNkJQWXY4ZEVjYmN2XC9pQXlodUZKZ2NRZERxR3N3bnNPbHFcL1RVM3d4djJHd0s0bUVOIiwibWFjIjoiMDk4OGRkYTE4ZjE2OTc1Y2JiN2Q2MTE0MDE1YTAwMGI3NWZmMDhmZWMwNmNkZDg0NDI1N2Q1OTE3NzdlMGExNCJ9",
  // XSRFToken: "eyJpdiI6Indtc3ZzZFQyZEd3TUZcLzVleGNGVmFnPT0iLCJ2YWx1ZSI6IlZ2VTFWRSsyTHROVVpOU2s3OTFYRTc2WE90UE0zeWdnS29vSmxVTnlFUEZBcVJYR3lVUlRhS28yMXhVZEI2NFMiLCJtYWMiOiJiZDg0ZjIwOWViODU0YjgxNmM0MTA5NTVlOTY5MjE2YjAyZWFmYzBhZjc0NzVkZmQ3N2M5MGFlNmMyMzJmN2U5In0%3D",

}