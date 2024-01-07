const axios = require("axios");
//not for mirai/botpack
module.exports = {
  config: {
    name: "kambing",
    version: "1.0",
    author: "JV Barcenas && LiANE", // do not change
    credits: "JV Barcenas && LiANE", // do not change
    role: 0,
    usePrefix: true,
    hasPermission: 2,
    category: "owner",
    commandCategory: "owner",
    description: "Make commands with the help of GoatAI",
    usages: "[prompt]",
    vip: false,
    license: `All Rights Reserved\n\nCopyright (c) [year] [author]\n\nAll rights reserved. No part of this software may be reproduced, distributed, or transmitted in any form or by any means, including photocopying, recording, or other electronic or mechanical methods, without the prior written permission of the copyright holder.`,
    shortDescription: {
      en: "Make commands with the help of GoatAI",
    },
    longDescription: {
      en: "Make commands with the help of GoatAI",
    },
    guide: {
      en: "{pn} [prompt]",
    },
  },
  onStart: async function (context) {
    const { api, event } = context;

    try {
      // Split the user input into command and arguments
      const [cmd, ...args] = event.body.split(" ");
      // Join the arguments into a prompt
      const prompt = args.join(" ");
      // Check if the prompt is not empty
      if (prompt) {
        // Use template literals to create the URL for the API request
        const url = `https://school-project-lianefca.bene-edu-ph.repl.co/ask/goatai?query=${encodeURIComponent(
          prompt
        )}`;
        // Use async/await to handle the promise
        const response = await axios.get(url);

        // Check if the response data is not empty
        if (response.data) {
          // Get the message text from the response data
          const messageText = response.data.message;
          // Send the message text as a reply to the user
          await api.sendMessage(messageText, event.threadID, event.messageID);

          console.log("Sent answer as a reply to the user");
        } else {
          // Throw an error if the response data is empty
          throw new Error("Invalid or missing response from API");
        }
      }
    } catch (error) {
      // Use try/catch to handle errors
      console.error(`Failed to get an answer: ${error.message}`);
      api.sendMessage(
        `${error.message}.\n\nYou can try typing your question again or resending it, as there might be a bug from the server that's causing the problem. It might resolve the issue.`,
        event.threadID
      );
    }
  },
  run: async function (context) {
    module.exports.onStart(context);
  },
  execute: async function (context) {
    module.exports.onStart(context);
  },
  onPREFIX: async function (context) {
    module.exports.onStart(context);
  },
};
