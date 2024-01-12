export const env = {
//auth
  API_URL: "https://localhost/api",
  GIT_TOKEN: "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",
//10.8.0.3:3003
  WS_URL: "10.8.0.3:3003",

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
