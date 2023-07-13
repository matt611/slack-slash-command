import storage from "../storage/Storage";

export default async function addHandler(command:string, options: string[]) {
  if (options.length !== 2) return "invalid arguments";
  const link = options[0];
  const dest = options[1];

  await storage.set(link, dest);

  return "successfully added link";
};