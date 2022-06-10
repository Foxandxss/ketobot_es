import { Context } from 'telegraf';
import { Update } from 'typegram';

export interface Plugin {
  command: string;
  description: string;

  detailedHelp?(): Promise<string>;
  parseAdminCommand?(ctx: Context<Update>, text: string): Promise<void>;

  canExec(ctx: Context<Update>): boolean | Promise<boolean>;
  exec(ctx: Context<Update>, textWithoutCommand?: string, nick?: string): void;
}
