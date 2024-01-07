const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "anya",
    aliases: [],
    author: "kshitiz",
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "Chat with Anya forger"
    },
    category: "ai",
    guide: {
      en: "{p}{n} [text]"
    }
  },
  onStart: async function ({ api, event, args }) {
    try {
      const getUserInfo = async (api, userID) => {
        try {
          const userInfo = await api.getUserInfo(userID);
          return userInfo[userID].firstName;
        } catch (error) {
          console.error(`Error fetching user info: ${error}`);
          return '';
        }
      };

      const {
        createReadStream,
        unlinkSync
      } = fs;

      const {
        resolve
      } = path;

      const {
        messageID,
        threadID,
        senderID
      } = event;

      const senderName = await getUserInfo(api, senderID); // Changed the variable name to senderName
      const ranGreetVar = [`Konichiwa ${senderName}`, "Konichiwa senpai", "Hora"];

      const ranGreet = ranGreetVar[Math.floor(Math.random() * ranGreetVar.length)];

      const chat = args.join(" ");

      if (!args[0]) return api.sendMessage(`${ranGreet}`, threadID, messageID);

      const resApi = `https://sensui-useless-apis.codersensui.repl.co/api/tools/blackai?question=act%20as%20a%20human,%20your%20name%20is%20Anya,%20I'm%20${senderName},`

      const res = await axios.get(`${resApi}${encodeURIComponent(chat)}`);

      const simRes = res.data.message;

      const tranChat = await axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ja&dt=t&q=${encodeURIComponent(simRes)}`);

      const text = tranChat.data[0][0][0];

      const audioPath = resolve(__dirname, 'cache', `${threadID}_${senderID}.wav`);

      const audioApi = await axios.get(`https://api.tts.quest/v3/voicevox/synthesis?text=${encodeURIComponent(text)}&speaker=3&fbclid=IwAR01Y4UydrYh7kvt0wxmExdzoFTL30VkXsLZZ2HjXjDklJsYy2UR3b9uiHA`);

      const audioUrl = audioApi.data.mp3StreamingUrl;

      await global.utils.downloadFile(audioUrl, audioPath);

      const att = createReadStream(audioPath);

      api.sendMessage({
        body: `${simRes}`,
        attachment: att
      }, threadID, () => unlinkSync(audioPath));
    } catch (error) {
      console.error(error);
      api.sendMessage("error", threadID, messageID);
    }
  }
};
