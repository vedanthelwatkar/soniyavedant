export const EMOJI = {
  cry: "\u{1F62D}",
  laugh: "\u{1F923}",
  bubble: "\u{1FAA9}",
  pray: "\u{1F64F}",
  heartEyes: "\u{1F60D}",
  heart: "\u2764\uFE0F",
  chat: "\u{1F4AC}",
  couple: "\u{1F491}",
  kiss: "\u{1F48B}",
  camera: "\u{1F4F8}",
};

import igChats from "../instagram_stats_output.json";
export const CONFIG = {
  myName: "Vedant",
  herName: "Soniya",
  herNickname: "Soniya",
  chatName: "Soniya",
  datingStartDate: new Date("2026-06-16T22:44:00"),
  talkingStartDate: new Date("2026-04-15T03:39:00"),
  myBirthday: new Date("2003-01-22"),
  herBirthday: new Date("2005-01-11"),
  heroQuote: "Soft launch? Bro this is the whole production build.",
  instagramStats: igChats,
  memories: [
    {
      date: "April 15, 2026",
      title: "First 'Heyy'",
      description: "3:39 AM and sleep schedule immediately left the chat",
      imageName: "sv1.JPG",
      icon: EMOJI.chat,
    },
    {
      date: "June 16, 2026",
      title: "Officially Us",
      description: "10:44 PM, relationship status said bet",
      imageName: "sv2.JPG",
      icon: EMOJI.couple,
    },
    {
      date: "First Kiss Night",
      title: "Scooty Ride Kiss",
      description: "Main character moment, no notes",
      imageName: "sv3.JPG",
      icon: EMOJI.kiss,
    },
    {
      date: "Photobooth Day",
      title: "Photobooth Evidence",
      description:
        "Cute pics were taken. Allegations of being obsessed remain true",
      imageName: "sv4.JPG",
      icon: EMOJI.camera,
    },
  ],
};
