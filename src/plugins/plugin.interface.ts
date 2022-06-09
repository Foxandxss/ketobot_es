import { Context } from 'telegraf';
import { Update } from 'typegram';

export interface Plugin {
  command: string;
  description: string;

  canExec(ctx: Context<Update>): boolean | Promise<boolean>;
  exec(ctx: Context<Update>, textWithoutCommand?: string): void;
}
