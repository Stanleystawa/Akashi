const axios = require('axios');

module.exports = {
  config: {
    name: "gpt2",
aliases: ["g2"],
    version: 2.0,
    author: "OtinXSandip",
    longDescription: "ai",
    category: "ai",
    guide: {
      en: "{p}{n} questions",
    },
  },
  onStart: async function ({ message, event, Reply, args, api, usersData }) {
    try {
      const id = event.senderID;
      const userData = await usersData.get(id);
      const name = userData.name;
      const ment = [{ id, tag: name }];
      const puti = encodeURIComponent(args.join(" "));
      
      if (!puti) {
        return message.reply("Please provide questions");
      }
      
      const response = await axios.get(`https://sandipapi.onrender.com/gpt?prompt=${puti}`);
      const lado = response.data.answer;

const link = `https://otinxsandip.onrender.com/say?text=${encodeURIComponent(lado)}`;

  message.reply({
        body: `${name} ${lado}`,
        mentions: ment,
attachment: await global.utils.getStreamFromURL(link)
    
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  },
};