import { Context } from 'telegraf';
import { bot } from '../bot';
import { availablePlugins, genericPlugin } from '../pluginRegistry';
import { Plugin } from './plugin.interface';

export class HelpPlugin implements Plugin {
  command = '!ayuda';
  description = 'Muestra esta ayuda';
  showHelp = true;

  canExec(): boolean {
    return true;
  }

  async exec(ctx: Context, content = ''): Promise<void> {
    if (!content) {
      let message =
        // 'Comandos disponibles.\nPara más información usar: *!ayuda <comando>*\n\n';
        'Comandos disponibles\n\n';
      availablePlugins.map((p) => {
        if (p.showHelp) {
          return (message += `_${p.command}_ - ${p.description}\n`);
        }
      });
      message += await genericPlugin.detailedHelp();
      console.log(ctx);
      if (ctx.message?.from?.id) {
        bot.telegram.sendMessage(ctx.message.from.id, message, {
          parse_mode: 'Markdown'
        });
      }
    } else {
      if (ctx.message?.from?.id) {
        bot.telegram.sendMessage(
          ctx.message.from.id,
          await this.getCommandFunction(content),
          {
            parse_mode: 'Markdown'
          }
        );
      }
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
