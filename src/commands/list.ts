import { getAllLinks } from "../links/Links";

export default async function listHandler() {
  const links = getAllLinks();

  const linkBlocks = links.map(link => {
    return {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `${link.key} -> ${link.dest}`
      },
      accessory: {
        type: "button",
        text: {
          type: "plain_text",
          text: "Go!",
          emoji: true
        },
        value: link.key,
        url: link.dest,
        action_id: "link-click"
      }
    }
  });

  return { blocks: linkBlocks };
};