import './utils/env';
import { App, LogLevel } from '@slack/bolt';
import { CommandHandler } from './types/types';
import addHandler from './commands/add';
import deleteHandler from './commands/delete';
import goHandler from './commands/go';
import listHandler from './commands/list';
import statsHandler from './commands/stats';

// commands accessible from the slack slash command '/short'
const COMMAND_HANDLERS: {[key:string]: CommandHandler} = {
  ['-l']: listHandler,
  ['-a']: addHandler,
  ['-d']: deleteHandler,
  ['-s']: statsHandler,
  default: goHandler
}

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  logLevel: LogLevel.DEBUG,
});

app.use(async ({ next }) => {
  await next();
});

/**
 * The /short command is a slash command in slack. 
 * To simply query for a link:
 *    /short goog
 *    This returns the link stored by the key 'goog'
 * To create or update an existing link:
 *    /short -a face https://www.facebook.com
 *    This will create a link 'https://www.facebook.com keyed by 'face'
 * To list all links
 *    /short -l
 *    This will display all link stored in the db in the slack channel
 * To delete a link
 *    /short -d goog
 *    This will delete the link keyed on 'goog'
 * To see click counts for each link
 *    /short -s
 *    This will show a count for each link in storage
 */
app.command('/short', async ({ ...props }) => {
  const [command, ...options] = props.command.text.split(/\s+/);

  // immediately acknowledge slacks request
  props.ack();

  // find the correct handler
  const handler = COMMAND_HANDLERS[command] || COMMAND_HANDLERS.default;
  const result = await handler(command, options);

  // send a response back to the channel
  props.respond(result);
});

app.action('link_click', async ({ body, ack, say }) => {
  // TODO: need to learn how to get the value of the button clicked
  //        then increment the count via storage.incStat()
  await ack();
  await say(`<@${body.user.id}> clicked the link`);
});

(async () => {
  // Start your app
  await app.start(Number(process.env.PORT) || 3000);

  console.log('⚡️ Bolt app is running!');
})();