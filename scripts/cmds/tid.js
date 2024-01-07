module.exports = {
  config: {
    name: "tid",
    version: "1.1",
    author: "LiANE",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "see thread id"
    },
    longDescription: {
      en: "see thread ID of your gc"
    },
    category: "group chat"
  },
  onStart: async function({ message, event }) {
    message.reply(`𝗧𝗵𝗿𝗲𝗮𝗱 𝗜𝗗 💬
${event.threadID.toString()}`);
  }
};