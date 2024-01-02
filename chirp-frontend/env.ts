export const env = {
//auth
  API_URL: "https://localhost/api",
  GIT_TOKEN: "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",

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
