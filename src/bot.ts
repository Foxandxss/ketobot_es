import dotenv from 'dotenv';
import { Context, Telegraf } from 'telegraf';
import { Update } from 'typegram';

dotenv.config();

export const bot: Telegraf<Context<Update>> = new Telegraf(
  process.env.BOT_TOKEN || ''
);
