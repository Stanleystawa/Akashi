const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports = {
  config: {
    name: "bin",
    version: "1.0",
    author: "Rehat X OtinXSandip",
    countDown: 5,
    role: 2,
    longDescription: {
      en: "This command allows you to upload files in Sandip-bin"
    },
    category: "owner",
    guide: {en: "To use this command, type !bin <name>"}
  },

  onStart: async function ({ api, event, args, content }) {
    const text = args.slice(1).join(" ");
    const permission = ["2529800","61553745751187"];
    if (!permission.includes(event.senderID)) {
      return api.sendMessage("You don't have enough permission to use this command. Only Hafiz can do it.", event.threadID, event.messageID);
    }
    if (!args[0]) {
      return api.sendMessage('Please learn how to use !bin <name>', event.threadID);
    }
    const fileName = args[0];
    const filePathWithoutExtension = path.join(__dirname, '..', 'cmds', fileName);
    const filePathWithExtension = path.join(__dirname, '..', 'cmds', fileName + '.js');

    if (!fs.existsSync(filePathWithoutExtension) && !fs.existsSync(filePathWithExtension)) {
      return api.sendMessage('File not found!', event.threadID);
    }

    const filePath = fs.existsSync(filePathWithoutExtension) ? filePathWithoutExtension : filePathWithExtension;
    fs.readFile(filePath, 'utf8', async (err, data) => { if (err) throw err;

      const pasteData = {
        name: fileName,
        content: data,
        key: "otinxsandip",
        burn: "false",
        lock: "false",
        encrypt: "false"
      };
      try {
        const response = await axios.post("https://sandip-bin.onrender.com/upload", pasteData);
        const rawPaste = response.data.url.replace("sandip-bin/onrender.com", "sandip-bin.onrender/raw");
        api.sendMessage(`${rawPaste}`, event.threadID , event.messageID);

      } catch (error) {
        console.error(error);
      }
    });
  },
};