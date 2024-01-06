export const env = {
//auth
  API_URL: "https://localhost/api",


  WS_URL: "http://localhost:3003",

//Maping Items
  GIT_LABELS: ["issue", "bug"],
  NotificationSounds: ["default", "winter", "OG"],
  MutePeriod: [
    { key: 0, displayName: "enabled" },
    { key: 999, displayName: "deactivated" },
    { key: 1, displayName: "one Hour" },
    { key: 12, displayName: "12 Hours" },
  ],

//defaults
  defaultConfig: {
    notifications: {
      sound: "default",
      mute: 0,
    },
    chat: {
      theme: "dark",
      details: true,
    },
    privacy: {
      meetInviteLevel: 1,
      friendInviteLEvel: 1,
    },
  },
};
