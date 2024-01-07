const axios = require('axios');

module.exports = {
  config: {
    name: "caller",
    aliases: ["truecaller"],
    version: 1.0,
    author: "OtinXSandip",
    longDescription: "Truecaller search utility",
    category: "api",
    guide: {
      en: "{p}{n} <phone_number>",
    },
  },
  onStart: async function ({ message, event, Reply, args, api, usersData }) {
    try {
      const phoneNumber = args[0];

      if (!phoneNumber) {
        return message.reply("Please provide a phone number to search");
      }

      const url = `https://search5-noneu.truecaller.com/v2/search?q=${phoneNumber}&countryCode=BD&type=4&locAddr=&encoding=json`;
      const headers = {
        Authorization: "Bearer a2i0d--k8fWzgVNVpCHYhNEeCJrtTbTcT7D7iiJJdarG0fWflMmoZBDL075kFZg0"
      };

      const response = await axios.get(url, { headers });
      const result = response.data;

      if (result && result.data && result.data.length > 0) {
        const userDetails = result.data[0];

        if (userDetails.image) {
          
          const imageAttachment = await global.utils.getStreamFromURL(userDetails.image);

          const formattedResponse = `Name: ${userDetails.name}\nScore: ${userDetails.score}\nAccess: ${userDetails.access}\nEnhanced: ${userDetails.enhanced}\nPhone Number: ${userDetails.phones[0].nationalFormat}\nCountry Code: ${userDetails.phones[0].countryCode}\nCarrier: ${userDetails.phones[0].carrier}\nAddress: ${userDetails.addresses[0].address}\nTimezone: ${userDetails.addresses[0].timeZone}\nInternet Address: Gmail - ${userDetails.internetAddresses[0]?.id || 'N/A'}`;

      
          message.reply({
            body: `Truecaller search result for ${phoneNumber}:\n${formattedResponse}`,
            attachment: imageAttachment,
          });
        } else {
          const formattedResponseWithoutImage = `Name: ${userDetails.name}\nScore: ${userDetails.score}\nAccess: ${userDetails.access}\nEnhanced: ${userDetails.enhanced}\nPhone Number: ${userDetails.phones[0].nationalFormat}\nCountry Code: ${userDetails.phones[0].countryCode}\nCarrier: ${userDetails.phones[0].carrier}\nAddress: ${userDetails.addresses[0].address}\nTimezone: ${userDetails.addresses[0].timeZone}\nInternet Address: Gmail - ${userDetails.internetAddresses[0]?.id || 'N/A'}`;

              message.reply({
            body: `Truecaller search result for ${phoneNumber}:\n${formattedResponseWithoutImage}`,
          });
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
      message.reply({
        body: "An error occurred while searching on Truecaller. Please try again later.",
      });
    }
  },
};