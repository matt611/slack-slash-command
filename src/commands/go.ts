import { getAllLinks, getLinkByKey } from "../links/Links";

export default async function goHandler(command: string, options: string[]) {
  const dest = getLinkByKey(command);
  return {
    blocks: [
      {
        type: "section",
        text: {
          type: "mrkdwn",
          text: `${command} -> ${dest}`
        },
        accessory: {
          type: "button",
          text: {
            type: "plain_text",
            text: "Go!",
            emoji: true
          },
          value: command,
          url: dest,
          action_id: "link-click"
        },
      }
    ]
  }
};