export interface CommandHandler {
  (command: string, options: string[]): Promise<any>;
}

export type Link = {
  key: string,
  dest: string
}
