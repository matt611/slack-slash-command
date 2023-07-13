import storage from "../storage/Storage";

export default async function deleteHandler(command:string, options: string[]) {
  if (options.length !== 1) return "invalid arguments";
  const key = options[0];

  await storage.delete(key);

  return "successfully deleted link";
};