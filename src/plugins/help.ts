import { Context } from 'telegraf';
import { availablePlugins } from '../pluginRegistry';
import { Plugin } from './plugin.interface';

export class HelpPlugin implements Plugin {
  command = '!comandos';
  description = 'Muestra esta ayuda';

  canExec(): boolean {
    return true;
  }

  async exec(ctx: Context, text = ''): Promise<void> {
    if (!text) {
      let message =
        'Comandos disponibles.\nPara más información usar: *!comandos <comando>*\n\n';
      availablePlugins.map(
        (p) => (message += `_${p.command}_ - ${p.description}\n`)
      );
      ctx.reply(message, { parse_mode: 'Markdown' });
    } else {
      ctx.reply(await this.getCommandFunction(text), {
        parse_mode: 'Markdown'
      });
    }
  }

  private async getCommandFunction(text: string) {
    const cmd = availablePlugins.find(
      (p) => p.command === `!${text.toLowerCase()}`
    );

    if (cmd && cmd.detailedHelp) {
      return cmd.detailedHelp();
    } else {
      return 'El comando no existe';
    }
  }
}

export const helpPlugin = new HelpPlugin();
