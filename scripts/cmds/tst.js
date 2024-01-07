module.exports = {
  config: {
    name: "goatAI",
    aliases: ["goat", "gai"],
    // ... rest of the config properties
  },

  onStart: async function ({ event, message, api }) {
    // Attach the API link to the message
    const imageUrl = "https://api.vyro.ai/v1/imagine/android/generations";

    const form = {
      body: "Here's the link to the text-to-image app: " + imageUrl,
      mentions: [],
      attachment: await api.sendMessage({
        url: imageUrl,
        type: "image/jpeg", // Specify the image type if known
      }),
    };

    // Send the message with the API link and the attached image
    message.reply(form);
  },
};