import { Context } from 'telegraf';
import { Update } from 'typegram';

export interface Plugin {
  command?: string;
  description: string;

  detailedHelp?(): Promise<string> | string;

  canExec(ctx?: Context<Update>): Promise<boolean>;
  exec(ctx: Context<Update>, textWithoutCommand?: string, nick?: string): void;
}
