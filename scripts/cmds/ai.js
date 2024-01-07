const axios = require('axios');
const fs = require('fs'); 

const Prefixes = [
  'ai'
];

let promptData = []; 

module.exports = {
  config: {
    name: 'ai',
    aliases : ['ai'],
    version: '2.5',
    author: 'Aryan', 
    role: 0,
    countDown: 0,
    category: 'Orochi Ai',
    shortDescription: {
      en: 'Asks an AI for an answer.',
    },
    longDescription: {
      en: 'Asks an AI for an answer based on the user prompt.',
    },
    guide: {
      en: '{pn} [prompt]',
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));

      if (!prefix) {
        return; 
      }

      const prompt = `yo! ask me questions and I'll try answer it to the best of my abilities. ${event.body.substring(prefix.length).trim()}`;

      if (prompt === 'ai') {
        await message.reply(
          "Hello, how can I assist you today?"
        );
        return;
      }

      
      promptData.push({ prompt, uid: event.senderID }); 

      const response = await axios.get(` https://chatgpt.apinepdev.workers.dev/?question=${encodeURIComponent(prompt)}&state=girlfriend`);

      if (response.status !== 200 || !response.data) {
        throw new Error('Invalid or missing response from API');
      }

      const messageText = response.data.content.trim();

      await message.reply(`${messageText}`);

      console.log('Sent answer as a reply to user');

      fs.writeFileSync('prompt.json', JSON.stringify(promptData, null, 2), 'utf8');
    } catch (error) {
      console.error(`Failed to get an answer: ${error.message}`);
      api.sendMessage(
        `${error.message}`,
        event.threadID
      );
    }
  },
};
      