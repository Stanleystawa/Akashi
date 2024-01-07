const axios = require('axios');

module.exports = {
  config: {
    name: "gf",
aliases: ["gfai"],
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
      const encodedquestion = encodeURIComponent(args.join(" "));
      
      if (!encodedquestion) {
        return message.reply("Please provide questions");
      }
     
      const response = await axios.get(`https://chatgpt.apinepdev.workers.dev/?question=${encodedquestion}&state=girlfriend`);
      const lado = response.data.answer;

      message.reply({
        body: `${name} ${lado}`,
        mentions: ment,
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  },
};