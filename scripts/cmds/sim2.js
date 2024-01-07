const axios = require("axios");

module.exports = {
  config: {
    name: 'kuba',
    version: '1.2',
    author: 'KENLIEPLAYS',
    countDown: 0,
    role: 0,
    shortDescription: 'Simsimi ChatBot by Simsimi.fun',
    longDescription: {
      en: 'Chat with Simsimi',
    },
    category: 'sim',
    guide: {
      en: '   {pn} <word>: chat with Simsimi' + '\n   Example:{pn} hi',
    },
  },

  langs: {
    en: {
      chatting: 'Already Chatting with Sim...',
      error: 'What?',
    },
  },

  onStart: async function ({ args, message, event, getLang }) {
    if (args[0]) {
      const yourMessage = args.join(" ");
      try {
        const responseMessage = await getMessage(yourMessage);
        return message.reply(`${responseMessage}`);
      } catch (err) {
        console.error(err);
        return message.reply(getLang("error"));
      }
    }
  },

  onChat: async function ({
    args,
    message,
    threadsData,
    event,
    isUserCallCommand,
    getLang,
  }) {
    const Prefixes = ["কুবা","Kuba"];

    const prefix = Prefixes.find(
      (p) => event.body && event.body.toLowerCase().startsWith(p)
    );

    if (!prefix) {
      return;
    }

    await this.onStart({ args, message, event, getLang });
  },
};

async function getMessage(yourMessage) {
  try {
    const res = await axios.get(
      `https://simsimi.fun/api/v2/?mode=talk&lang=en&message=${yourMessage}&filter=true`
    );
    if (!res.data.success) {
      throw new Error("API returned a non-successful message");
    }
    return res.data.success;
  } catch (err) {
    console.error("Error while getting a message:", err);
    throw err;
  }
}