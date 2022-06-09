import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Context, Telegraf } from 'telegraf';
import { Update } from 'typegram';
import { availablePlugins } from './pluginRegistry';

dotenv.config();

const bot: Telegraf<Context<Update>> = new Telegraf(
  process.env.BOT_TOKEN || ''
);

bot.on('text', (ctx) => {
  // eslint-disable-next-line prefer-const
  let [command, ...text] = ctx.message.text.split(' ');
  if (!command || command.toLowerCase().indexOf('!') !== 0) return;
  let nick: string;

  if (text.length > 0 && text[text.length - 1].startsWith('@')) {
    nick = text[text.length - 1];
    text = text.slice(0, -1);
  }

  const usablePlugins = availablePlugins.filter(
    (p) => p.command === command.toLowerCase()
  );

  usablePlugins.forEach((p) => p.exec(ctx, text.join(' '), nick));
});

async function main() {
  await mongoose.connect(process.env.MONGO_CONNECTION_STRING || '');
  bot.launch();
}

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

main();
