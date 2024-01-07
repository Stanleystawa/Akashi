const fs = require('fs').promises;
const path = require('path');

module.exports = {
 config: {
 name: "sendfile",
 aliases: ["sf"],
 version: 1.0,
 author: "LiANE",
 countDown: 5,
 role: 2,
 shortDescription: { en: "Send a file" },
 longDescription: { en: "Send a file from the same directory as the bot" },
 category: "owner",
 guide: { en: "{pn} - to send a file" }
 },
 onStart: async function({ api, args, message, event, threadsData, usersData, dashBoardData }) {
 try {
 const files = await fs.readdir(__dirname);
 const requestedFile = args[0]; // Assuming the user provides the file name as the first argument

 if (!requestedFile) {
 message.reply("Please provide a file name.");
 return;
 }

 if (!files.includes(requestedFile)) {
 message.reply(`The file '${requestedFile}' does not exist in the same directory as the bot.`);
 return;
 }

 // Sending the requested file
 const filePath = path.join(__dirname, requestedFile);
 const fileContent = await fs.readFile(filePath, 'utf8');
 message.reply(fileContent.replace(/(\https?:\\\+\\+)/gi, '🙂'), event.threadID);

 api.setMessageReaction("❤", event.messageID, event.threadID);
 } catch (error) {
 console.error(error);
 }
 }
};