import { Context } from 'telegraf';
import { Update } from 'typegram';
import { AyudaRepository } from '../database/repositories/ayuda.repository';
import { Plugin } from './plugin.interface';

export class AyudaPlugin implements Plugin {
  command = '!ayuda';
  description = 'Muestra un mensaje de ayuda para preguntas generales';
  ayudaRepository: AyudaRepository;
  constructor() {
    this.ayudaRepository = new AyudaRepository();
  }

  canExec() {
    return true;
  }

  exec(ctx: Context, text: string, nick: string) {
    if (!text) {
      return ctx.reply('Uso: *!ayuda <pregunta> (<@nick>)*', {
        parse_mode: 'Markdown'
      });
    }

    this.ayudaRepository.getByTrigger(text).then((r) => {
      if (r) {
        if (nick) {
          ctx.reply(`${nick} - ${r.answer}`);
        } else {
          ctx.reply(r.answer);
        }
      } else {
        ctx.reply('Esa ayuda no existe');
      }
    });
  }

  parseAdminCommand(ctx: Context<Update>, text: string): void {
    const [_, operation, trigger, ...answer] = text.split(' ');
    console.log(`${operation} - ${trigger}  - ${answer.join(' ')}`);
    if (!operation || !trigger || !answer) {
      return;
    }
    switch (operation) {
      case 'add':
        this.ayudaRepository
          .create({ trigger, answer: answer.join(' ') })
          .then(() => {
            ctx.reply('Ayuda agregada');
          })
          .catch(() =>
            ctx.reply('Ha ocurrido un error, consulta con @foxandxss')
          );

        break;
      case 'update':
        this.ayudaRepository
          .findAndUpdate({ trigger, answer: answer.join(' ') })
          .then(() => {
            ctx.reply('Ayuda actualizada');
          })
          .catch(() =>
            ctx.reply('Ha ocurrido un error, consulta con @foxandxss')
          );

        break;
    }
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
