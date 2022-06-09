import { Context } from 'telegraf';
import { AyudaRepository } from '../database/repositories/ayuda.repository';
import { Plugin } from './plugin.interface';

export class AyudaPlugin implements Plugin {
  command = '!ayuda';
  description = 'Muestra un mensaje de ayuda para preguntas generales';
  ayudaRepository: AyudaRepository;
  constructor() {
    this.ayudaRepository = new AyudaRepository();
  }

  exec(ctx: Context, text: string) {
    if (!text) {
      return ctx.reply('Uso: *!ayuda <pregunta>*', { parse_mode: 'Markdown' });
    }
    this.ayudaRepository.getByTrigger(text).then((r) => {
      if (r) {
        ctx.reply(r.answer);
      } else {
        ctx.reply('Esa ayuda no existe');
      }
    });
  }

  async detailedHelp(): Promise<string> {
    const items = await this.ayudaRepository.getAll();
    let message = `Comandos disponible para ayuda:\n`;

    items.map((i, index) => {
      message += `_${i.trigger}_`;
      if (index !== items.length - 1) {
        message += ', ';
      }
    });

    return message;
  }
}

export const ayudaPlugin = new AyudaPlugin();
