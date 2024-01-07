const axios = require('axios');
const fs = require('fs');

module.exports = {
  config: {
    name: 'imgn',
    aliases: ['generate'],
    version: '1.0',
    author: 'OtinXSandip',
    countDown: 0,
    role: 0,
    longDescription: {
      en: 'Text to Image'
    },
    category: 'ai',
    guide: {
      en: `{pn} prompt and here is models u can choose
1 | DreamshaperXL10
2 | DynavisionXL
3 | JuggernautXL
4 | RealismEngineSDXL
5 | Sdxl 1.0`
    }
  },

  onStart: async function ({ message, args, event, api }) {
    try {
      const badWords = ["sex", "hentai", "pussy", "dick", "xxx", "porn", "nude", "sexy", "🍑", "🔞", "👅", "🫦", "💋", "🔥", "🤒", "🥵", "🤭", "puti", "lado", "ass", "fuck", "suck", "puti", "dickless", "kera", "banana", "🍌", "hot", "yuri", "🥒", "🩸", "🤤", "cucumber", "🖕"];
      const lado = "nemobot";
const pussy = "otinxshiva10";
      const text = args.join(" ");

      for (const word of badWords) {
        if (text.includes(word)) {
          const id = event.senderID;
          const img = `https://${lado}.${pussy}.repl.co/gay?uid=${id}`;
          return message.reply({
            body: "sorry I can't generate this because you're gay😯.",
            attachment: await global.utils.getStreamFromURL(img)
          });
        }
      }

      const info = args.join(' ');
      const [prompt, model] = info.split('|').map(item => item.trim());

      if (!text) {
        return message.reply("please provide prompt");
      }

      api.setMessageReaction("⏳", event.messageID, () => {}, true);

      const modelParam = model || '2';
      const apiUrl = `https://sdxl.otinxsandeep.repl.co/sdxl?prompt=${prompt}&model=${modelParam}`;

      message.reply("✅| Creating your Imagination...", async (err, info) => {
        let ui = info.messageID;
        message.reply({
          body: `Here's your imagination ✅`,
          attachment: await global.utils.getStreamFromURL(apiUrl)
        });

        message.unsend(ui);
        api.setMessageReaction("✅", event.messageID, () => {}, true);
      });
    } catch (error) {
      console.error(error);
    }
  }
}