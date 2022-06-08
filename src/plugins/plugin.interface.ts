import { Context } from 'telegraf';
import { Update } from 'typegram';

export interface Plugin {
  command: string;
  description: string;

  exec(ctx: Context<Update>, textWithoutCommand: string): void;
}
