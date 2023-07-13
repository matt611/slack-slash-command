import storage from "../storage/Storage";

export default async function statsHandler(command:string, options: string[]) {
  if (options.length !== 0) return "invalid arguments";

  const stats = await storage.getAllStats();

  const statsBlocks = stats.map(stat => {
    return {
      type: "section",
      text: {
        type: "mrkdwn",
        text: `*${stat.key}*: ${stat.value}`
      }
    }
  });

  return { blocks: statsBlocks };
};