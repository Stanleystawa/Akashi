module.exports = {
  config: {
    name: "makeAdmin",
    aliases: ["gcadmin"],
    role: 1,
    // This command can only be used by group administrators.
    shortDescription: ":clipboard: Make a user an admin of the group",
    tl: ":clipboard: Gawin ang isang user na admin ng grupong ito",
  },
  longDescription: {
    en: ":star2: This command allows you to make a specific user an admin of the group.",
    tl: ":star2: Gamit ang command na ito, maaari kang maglagay ng isang user bilang admin ng grupong ito.",
  },
  category: ":family: Group",
  guide: {
    en: "{prefix}makeAdmin <user>",
    tl: "{prefix}makeAdmin <user>",
  },
  onStart: async function ({ event, message, threadsData, usersData, api, commandName }) {
    const threadID = event.threadID;
    const targetUser = event.mentions[0];

    // Check if the command is used in a group
    if (event.isGroup === false) {
      message.reply("This command can only be used in a group.");
      return;
    }

    // Check if the user is a group administrator
    const threadInfo = await api.getThreadInfo(threadID);
    const isAdmin = threadInfo.adminIDs.includes(event.senderID);
    if (!isAdmin) {
      message.reply("You must be a group administrator to use this command.");
      return;
    }

    // Check if a user is mentioned
    if (!targetUser) {
      message.reply("Please mention a user to make them an admin.");
      return;
    }

    // Make the user an admin
    api.changeAdminStatus(threadID, targetUser.id, true, async (err) => {
      if (err) {
        message.reply("Failed to make the user an admin. Please try again.");
        return;
      }

      message.reply(`Successfully made ${targetUser.name} an admin of the group. :star2:`);
    });
  },
};