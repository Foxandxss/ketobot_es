import { Context } from 'telegraf';
import { Update } from 'typegram';
import { GenericRepository } from '../database/repositories/generic.repository';
import { Plugin } from './plugin.interface';

export class GenericPlugin implements Plugin {
  description = 'Foo';
  genericRepository: GenericRepository;

  constructor() {
    this.genericRepository = new GenericRepository();
  }

  async canExec(): Promise<boolean> {
    return Promise.resolve(true);
  }

  exec(ctx: Context, content: string, nick: string) {
    this.genericRepository.getByTrigger(content).then((r) => {
      if (r) {
        if (nick) {
          ctx.reply(`${nick}\n${r.answer}`, { parse_mode: 'Markdown' });
        } else {
          ctx.reply(r.answer);
        }
      } else {
        ctx.reply('Ese comando no existe');
      }
    });
  }

  parseAdminCommand(ctx: Context<Update>, content: string): void {
    const pattern = /(\w+)\s*(\w+)\s*(.*)/s;

    const [, operation, trigger, answer] = pattern.exec(content) || [];

    if (!operation || !trigger) {
      return;
    }
    switch (operation) {
      case 'add':
      case 'update':
        if (!answer) {
          break;
        }
        this.genericRepository
          .findAndUpdate({ trigger, answer })
          .then(() => {
            ctx.reply('Comando agregado o actualizado con éxito');
          })
          .catch(() =>
            ctx.reply('Ha ocurrido un error, consulta con @foxandxss')
          );

        break;
      case 'delete':
        this.genericRepository.findAndDelete(trigger).then(() => {
          ctx.reply('Comando eliminado con éxito');
        });
    }
  }

  async detailedHelp(): Promise<string> {
    const items = await this.genericRepository.getAll();
    let message = `\nAdemás listado de comandos genéricos:\n\n`;

    items.map((i, index) => {
      message += `_${i.trigger}_`;
      if (index !== items.length - 1) {
        message += ', ';
      }
    });

    return message;
  }
}
